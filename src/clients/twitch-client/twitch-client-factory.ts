import config from "../../config";
import { IConfig } from "../../types";
import { TwitchClient } from "./twitch-client";
import { PubSub } from "../../infrastructure/pub-sub";
import { autoAnswers } from "./auto-answers";
import { Client } from "tmi.js";
import { getRandomSmile } from "../get-random-smile";
import { TwitchCommandParser } from "./twitch-command-parser";

const baseConfig: IConfig = {
  autoAnswersMode: true,
  currentStreamer: "",
  streamers: config.streamers,
  tmiConfig: {
    ...config.tmiCrendentials,
  },
  events: config.events,
};

const pubSub = new PubSub();

const twitchClientFactory = () => {
  return new TwitchClient({
    tmiClient: new Client({
      connection: {
        reconnect: true,
      },
      identity: {
        ...config.tmiCrendentials,
      },
      channels: Object.values(config.streamers).map(
        (streamer) => streamer.nickName
      ),
    }),
    config: baseConfig,
    pubSub,
    autoAnswers: autoAnswers,
    getRandomSmile,
    commandParser: new TwitchCommandParser({ commandWord: "мяу" }),
  });
};

export default twitchClientFactory;
