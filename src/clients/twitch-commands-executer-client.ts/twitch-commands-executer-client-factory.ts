import config from "../../config";
import { PubSub } from "../../infrastructure/pub-sub";
import { IConfig } from "../../types";
import { getRandomSmile } from "../get-random-smile";
import { twitchCommands } from "./twitch-commands";
import { TwitchCommandsExecuterClient } from "./twitch-commands-executer-client";

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

const twitchCommandsExecuterClientFactory = () => {
  return new TwitchCommandsExecuterClient({
    config: baseConfig,
    pubSub,
    getRandomSmile,
    twitchCommands,
  });
};

export default twitchCommandsExecuterClientFactory;
