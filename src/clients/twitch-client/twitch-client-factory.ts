import { Client } from "tmi.js";

import config from "../../config";
import { PubSub } from "../../infrastructure/pub-sub";
import { baseConfig } from "../base-config";
import { getRandomSmile } from "../get-random-smile";
import { autoAnswers } from "./auto-answers";
import { TwitchClient } from "./twitch-client";
import { TwitchCommandParser } from "./twitch-command-parser";

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
