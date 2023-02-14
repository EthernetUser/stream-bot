import { IConfig, IPubSub, ITwitchCommands } from "../../types";
import { BaseClient } from "../base-client";

export class TwitchCommandsExecuterClient extends BaseClient {
  private pubSub: IPubSub;
  private getRandomSmile: () => string;
  private twitchCommands: ITwitchCommands;

  constructor({
    config,
    pubSub,
    getRandomSmile,
    twitchCommands,
  }: {
    config: IConfig;
    pubSub: IPubSub;
    getRandomSmile: () => string;
    twitchCommands: ITwitchCommands;
  }) {
    super(config);
    this.pubSub = pubSub;
    this.getRandomSmile = getRandomSmile;
    this.twitchCommands = twitchCommands;
  }

  private validateCommand(command: string[]) {
    const errors = [];
    const existentCommand = this.twitchCommands[command[1]];

    if (!existentCommand) {
      errors.push(
        `хз че за команда ${this.getRandomSmile()}, доступные команды: ${Object.keys(
          this.twitchCommands
        ).join(", ")}.`
      );
      return errors;
    }

    const argsFromCommand = command.slice(2);

    const requiredArgs = Object.entries(existentCommand.args || {});

    if (requiredArgs.length !== argsFromCommand.length) {
      errors.push(
        `хз че за аргументы ты передал ${this.getRandomSmile()}, у команды '${
          command[1]
        }' следующие обязательные аргументы: ${requiredArgs
          .map(([argName, argProps]) => `[${argName}]: ${argProps.description}`)
          .join(", ")}. они должны прописываться через пробел без запятых и тд.`
      );

      return errors;
    }

    for (let i = 0; i < requiredArgs.length; i++) {
      const {
        type,
        avaliableValues: avalibaleValues,
        isNickName,
      } = requiredArgs[i][1];

      if (type === "string") {
        if (
          isNickName !== undefined &&
          isNickName &&
          argsFromCommand[i][0] !== "@"
        ) {
          errors.push(`добавь @ к '${argsFromCommand[i]}'.`);
        }
      }

      if (type === "number") {
        if (Number.isNaN(parseInt(argsFromCommand[i], 10))) {
          errors.push(`значение '${argsFromCommand[i]}' не является числом.`);
        }
      }

      if (avalibaleValues && !avalibaleValues.includes(argsFromCommand[i])) {
        errors.push(
          `неверное значение '${
            argsFromCommand[i]
          }'. доступные значения аргумента: ${avalibaleValues.join(", ")}.`
        );
      }
    }

    if (errors.length) {
      return errors;
    }

    return [];
  }

  public async execute({
    nickName,
    channel,
    command,
  }: {
    nickName: string;
    channel: string;
    command: string[];
  }) {
    const errors = this.validateCommand(command);

    if (errors.length) {
      const sendMessageEventName = this.getEventName(
        this.config.events.twitchSendMessage
      );

      const message =
        `@${nickName} ` + errors.join(` ${this.getRandomSmile()} `);

      this.pubSub.publish(
        sendMessageEventName,
        { channel, message, emoji: true },
        this.uuid
      );

      return;
    }

    this.twitchCommands[command[1]].execute({
      pubSub: this.pubSub,
      nickName,
      channel,
      args: command.slice(2),
      event: this.getEventName(this.config.events.twitchSendMessage),
    });
  }

  public onCommandReceive() {
    this.pubSub.subscribe(
      this.getEventName(this.config.events.recieveTwitchCommand),
      this.execute.bind(this),
      this.uuid
    );
  }
}
