import ReadLine from "readline";

import { BaseConfig, Config } from "../base-config";
import { IPubSub } from "../../infrastructure/pub-sub";
import { Commands, commands } from "./commands";

export class ConsoleClient extends BaseConfig {
    private readline: ReadLine.Interface;
    private pubSub: IPubSub;
    private commands: Commands;

    constructor(config: Config, pubSub: IPubSub, commands: Commands) {
        super(config);
        this.readline = ReadLine.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "",
        });
        this.pubSub = pubSub;
        this.commands = commands;

        this.pubSub.subscribe("config/change", this.changeConfig.bind(this));
    }

    private executeCommandHandler(message: string) {
        if (!message.startsWith("!")) {
            return false;
        }
        
        const command = this.commands[message];

        if (command) {
            command(this);
            this.pubSub.publish("config/change", { ...this.config });
        }

        return true;
    }

    private consoleMessageHandler(message: string) {
        const isCommand = this.executeCommandHandler(message);
        console.log(1)
        if (isCommand) {
        } else if (!this.config.currentStreamer) {
            Object.values(this.config.streamers).forEach((streamer) => {
                this.pubSub.publish("twitch/sendMessage", {
                    channel: streamer.nickName,
                    message,
                });
            });
        } else {
            this.pubSub.publish("twitch/sendMessage", {
                channel: this.config.currentStreamer,
                message,
            });
        }
        this.readline.prompt();
    }

    public onLine() {
        this.readline.on("line", this.consoleMessageHandler.bind(this));
    }
}
