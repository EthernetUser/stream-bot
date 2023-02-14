import tmi from "tmi.js";

import {
  IAutoAnswers,
  IConfig,
  IPubSub,
  ITwitchCommandParser,
} from "../../types";
import { BaseClient } from "../base-client";
import chunk from "lodash.chunk";

export class TwitchClient extends BaseClient {
  public tmi: tmi.Client;
  private readonly autoAnswers: IAutoAnswers;
  private pubSub: IPubSub;
  private getRandomSmile: () => string;
  private commandParser: ITwitchCommandParser;

  constructor({
    tmiClient,
    config,
    autoAnswers,
    pubSub,
    getRandomSmile,
    commandParser,
  }: {
    tmiClient: tmi.Client;
    config: IConfig;
    autoAnswers: IAutoAnswers;
    pubSub: IPubSub;
    getRandomSmile: () => string;
    commandParser: ITwitchCommandParser;
  }) {
    super(config);
    this.tmi = tmiClient;
    this.autoAnswers = autoAnswers;
    this.pubSub = pubSub;
    this.getRandomSmile = getRandomSmile;
    this.commandParser = commandParser;

    this.pubSub.subscribe(
      this.getEventName(this.config.events.configChange),
      this.changeConfig.bind(this),
      this.uuid
    );
    this.pubSub.subscribe(
      this.getEventName(this.config.events.twitchSendMessage),
      this.say.bind(this),
      this.uuid
    );
  }

  private getDelay = (channel: string) => {
    const slicedChannelName = channel[0] === "#" ? channel.slice(1) : channel;
    let delay = Object.values(this.config.streamers).find(
      (streamer) => streamer.nickName === slicedChannelName
    )?.delay;

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

  public async messageHandler(
    channel: string,
    tags: tmi.ChatUserstate,
    message: string,
    self: boolean
  ) {
    const sanitizedMessage = message
      .toLowerCase()
      .trim()
      .split(" ")
      .filter((word) => word !== "")
      .join(" ");

    console.log(`[channel: ${channel}] @${tags["display-name"]}: ${message}`);

    const twitchCommand = this.commandParser.parse(message);

    if (twitchCommand) {
      const recieveTwitchCommandEventName = this.getEventName(
        this.config.events.recieveTwitchCommand
      );

      this.pubSub.publish(
        recieveTwitchCommandEventName,
        { nickName: tags["display-name"], command: twitchCommand, channel },
        this.uuid
      );

      return;
    }

    const answer = this.autoAnswers[sanitizedMessage];
    const options = {
      channel,
      tags,
      message,
      self,
    };

    if (answer && this.config.autoAnswersMode) {
      const currentAnswer = await answer(options);

      await this.say({ channel, message: currentAnswer, emoji: true });

      console.log(
        `[channel: ${channel}] @${tags["display-name"]}: (auto) ${currentAnswer}`
      );
    }
  }

  public async say({
    channel,
    message,
    emoji,
  }: {
    channel: string;
    message: string;
    emoji?: boolean;
  }) {
    const delay = this.getDelay(channel);

    if (emoji) {
      message = message.trim() + " " + this.getRandomSmile();
    }

    if (message.length > 500) {
      const messageChunks = chunk(message.split(""), 500);

      for (const messageChunk of messageChunks) {
        await this.sleep(delay);
        await this.tmi.say(channel, messageChunk.join(""));
      }
      return;
    }

    await this.sleep(delay);
    this.tmi.say(channel, message);
  }

  public onMessage() {
    this.tmi.on("message", this.messageHandler.bind(this));
  }

  public async connect() {
    await this.tmi.connect();
  }
}
