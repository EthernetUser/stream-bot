import { IConfig, IPubSub, ITwitchCommands } from "../../types";
import { BaseConfig } from "../base-config";
import { getRandomSmile } from "../get-random-smile";
import { twitchaCommands } from "./twitch-commands";


export class TwitchCommandsExecuterClient extends BaseConfig {
  private pubSub: IPubSub;
  private getRandomSmile: () => string;
  private twitchCommands: ITwitchCommands;

  constructor({ config, pubSub }: { config: IConfig; pubSub: IPubSub }) {
    super(config);

    this.pubSub = pubSub;
    this.getRandomSmile = getRandomSmile;
    this.twitchCommands = twitchaCommands;

    this.pubSub.subscribe(
      this.getEventName(this.config.events.recieveTwitchCommand),
      this.execute.bind(this),
      this.uuid
    );
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
          .map(([argName, argProp]) => `([${argName}]: ${argProp.description})`)
          .join(
            ", "
          )}. они должны прописываться через пробел без запятых и тд. ${this.getRandomSmile()}`
      );

      return errors;
    }

    for (let i = 0; i < requiredArgs.length; i++) {
      const { type, avalibaleValues } = requiredArgs[i][1];
      if (type === "string") {
        if (avalibaleValues && !avalibaleValues.includes(argsFromCommand[i])) {
          errors.push(
            `неверное значение '${
              argsFromCommand[i]
            }'. доступные значения аргумента: ${avalibaleValues.join(", ")}.`
          );
        }
      }
      if (type === "number") {
        if (Number.isNaN(parseInt(argsFromCommand[i], 10))) {
          errors.push(`значение '${argsFromCommand[i]}' не является числом.`);
        }
        if (avalibaleValues && !avalibaleValues.includes(argsFromCommand[i])) {
          errors.push(
            `неверное значение '${
              argsFromCommand[i]
            }'. доступные значения аргумента: ${avalibaleValues.join(", ")}.`
          );
        }
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
        `@${nickName} ` +
        errors.join(` ${this.getRandomSmile()} `) +
        " " +
        this.getRandomSmile();
      this.pubSub.publish(
        sendMessageEventName,
        { channel, message },
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
}
