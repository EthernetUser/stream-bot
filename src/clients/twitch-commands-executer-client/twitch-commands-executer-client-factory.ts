import { PubSub } from "../../infrastructure/pub-sub";
import { baseConfig } from "../base-config";
import { getRandomSmile } from "../get-random-smile";
import { twitchCommands } from "./twitch-commands";
import { TwitchCommandsExecuterClient } from "./twitch-commands-executer-client";

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
