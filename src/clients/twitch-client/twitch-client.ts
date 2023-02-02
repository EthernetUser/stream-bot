import tmi from "tmi.js";

import { Options } from "./auto-answers";
import { BaseConfig, Config } from "../base-config";
import { IPubSub } from "../../infrastructure/pub-sub";

export class TwitchClient extends BaseConfig {
    public tmi: tmi.Client;
    private autoAnswers: {
        [k: string]: (opitons: Options) => string | Promise<string>;
    };
    private pubSub: IPubSub;

    constructor(
        config: Config,
        autoAnswers: {
            [k: string]: (options: Options) => string | Promise<string>;
        },
        pubSub: IPubSub
    ) {
        super(config);
        this.tmi = new tmi.Client({
            connection: {
                reconnect: true,
            },
            identity: {
                ...config.tmiConfig,
            },
            channels: Object.values(config.streamers).map(
                (streamer) => streamer.nickName
            ),
        });
        this.autoAnswers = autoAnswers;
        this.pubSub = pubSub;

        this.pubSub.subscribe("config/change", this.changeConfig.bind(this));
        this.pubSub.subscribe("twitch/sendMessage", this.say.bind(this));
    }

    private sleep(ms: number) {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }

    public async messageHandler(
        channel: string,
        tags: tmi.ChatUserstate,
        message: string,
        self: boolean
    ) {
        const sanitaizedMessage = message.toLowerCase().trim();
        const answer = this.autoAnswers[sanitaizedMessage];
        const options = {
            channel,
            tags,
            message,
            self,
        };

        console.log(
            `[channel: ${channel}] @${tags["display-name"]}: ${message}`
        );

        if (answer && this.config.autoAnswersMode) {
            const currentAnswer = await answer(options);
            await this.sleep(1000);
            await this.tmi.say(channel, currentAnswer);
            console.log(
                `[channel: ${channel}] @${tags["display-name"]}: (auto) ${currentAnswer}`
            );
        }
    }

    public async say({ channel, message }: { channel: string; message: any }) {
        this.tmi.say(channel, message);
    }

    public onMessage() {
        this.tmi.on("message", this.messageHandler.bind(this));
    }

    public async connect() {
        this.tmi.connect();
    }
}
