import tmi from "tmi.js";

import { IAutoAnswers, IConfig, IPubSub } from "../../types";
import { BaseConfig } from "../base-config";

export class TwitchClient extends BaseConfig {
  public tmi: tmi.Client;
  private autoAnswers: IAutoAnswers;
  private pubSub: IPubSub;

  constructor({ config, autoAnswers, pubSub }: { config: IConfig; autoAnswers: IAutoAnswers; pubSub: IPubSub }) {
    super(config);
    this.tmi = new tmi.Client({
      connection: {
        reconnect: true,
      },
      identity: {
        ...config.tmiConfig,
      },
      channels: Object.values(config.streamers).map((streamer) => streamer.nickName),
    });
    this.autoAnswers = autoAnswers;
    this.pubSub = pubSub;

    this.pubSub.subscribe(this.getEventName(this.config.events.configChange), this.changeConfig.bind(this), this.uuid);
    this.pubSub.subscribe(this.getEventName(this.config.events.twitchSendMessage), this.say.bind(this), this.uuid);
  }

  private getDelay = (channel: string) => {
    const slicedChannelName = channel[0] === "#" ? channel.slice(1) : channel;
    let delay = Object.values(this.config.streamers).find((streamer) => streamer.nickName === slicedChannelName)?.delay;

    if (delay === undefined) {
      delay = 1000;
    }

    return delay;
  };

  private sleep(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  public async messageHandler(channel: string, tags: tmi.ChatUserstate, message: string, self: boolean) {
    const sanitaizedMessage = message.toLowerCase().trim();

    const answer = this.autoAnswers[sanitaizedMessage];
    const options = {
      channel,
      tags,
      message,
      self,
    };

    console.log(`[channel: ${channel}] @${tags["display-name"]}: ${message}`);

    if (answer && this.config.autoAnswersMode) {
      const currentAnswer = await answer(options);
      let delay = this.getDelay(channel);

      await this.sleep(delay);
      await this.tmi.say(channel, currentAnswer);

      console.log(`[channel: ${channel}] @${tags["display-name"]}: (auto) ${currentAnswer}`);
    }
  }

  public async say({ channel, message }: { channel: string; message: any }) {
    const delay = this.getDelay(channel);
    await this.sleep(delay);
    this.tmi.say(channel, message);
  }

  public onMessage() {
    this.tmi.on("message", this.messageHandler.bind(this));
  }

  public async connect() {
    this.tmi.connect();
  }
}
