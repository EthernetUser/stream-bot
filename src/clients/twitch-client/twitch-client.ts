import tmi from "tmi.js";

import {
  IAutoAnswers,
  IConfig,
  IPubSub,
  ITwitchCommandParser,
} from "../../types";
import { BaseConfig } from "../base-config";
import { getRandomSmile } from "../get-random-smile";
import { TwitchCommandParser } from "./twitch-command-parser";
import chunk from "lodash.chunk";

export class TwitchClient extends BaseConfig {
  public tmi: tmi.Client;
  private readonly autoAnswers: IAutoAnswers;
  private pubSub: IPubSub;
  private getRandomSmile: () => string;
  private commandParser: ITwitchCommandParser;

  constructor({
    config,
    autoAnswers,
    pubSub,
  }: {
    config: IConfig;
    autoAnswers: IAutoAnswers;
    pubSub: IPubSub;
  }) {
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
    this.getRandomSmile = getRandomSmile;
    this.commandParser = new TwitchCommandParser({ commandWord: "мяу" });

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
      const currentAnswer =
        (await answer(options)) + " " + this.getRandomSmile();
      const delay = this.getDelay(channel);

      await this.say({ channel, message: currentAnswer });

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
        this.tmi.say(channel, messageChunk.join(""));
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
    this.tmi.connect();
  }
}
