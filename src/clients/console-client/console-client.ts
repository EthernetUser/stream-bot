import ReadLine from "readline";

import { ICommands, IConfig, IPubSub } from "../../types";
import { BaseConfig } from "../base-config";

export class ConsoleClient extends BaseConfig {
  private readline: ReadLine.Interface;
  private pubSub: IPubSub;
  private commands: ICommands;

  constructor({ config, pubSub, commands }: { commands: ICommands; pubSub: IPubSub; config: IConfig }) {
    super(config);
    this.readline = ReadLine.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "",
    });
    this.pubSub = pubSub;
    this.commands = commands;

    this.pubSub.subscribe(this.getEventName(this.config.events.configChange), this.changeConfig.bind(this), this.uuid);
  }

  private executeCommandHandler(message: string) {
    const changeConfigEventName = this.getEventName(this.config.events.configChange);
    if (message[0] !== "!") {
      return false;
    }

    const command = this.commands[message];

    if (command) {
      command(this);
      this.pubSub.publish(changeConfigEventName, { ...this.config }, this.uuid);
    } else {
      console.log(`Неизвестная команда: '${message}'`);
    }

    return true;
  }

  private consoleMessageHandler(message: string) {
    const sendMessageEventName = this.getEventName(this.config.events.twitchSendMessage);
    const isCommand = this.executeCommandHandler(message);

    if (isCommand) {
    } else if (!this.config.currentStreamer) {
      Object.values(this.config.streamers).forEach((streamer) => {
        this.pubSub.publish(
          sendMessageEventName,
          {
            channel: streamer.nickName,
            message,
          },
          this.uuid
        );
      });
    } else {
      this.pubSub.publish(
        sendMessageEventName,
        {
          channel: this.config.currentStreamer,
          message,
        },
        this.uuid
      );
    }

    this.readline.prompt();
  }

  public onLine() {
    this.readline.on("line", this.consoleMessageHandler.bind(this));
  }
}
