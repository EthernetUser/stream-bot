import config from "../../config";
import { PubSub } from "../../infrastructure/pub-sub";
import { IConfig } from "../../types";
import { ConsoleClient } from "./console-client";
import { consoleCommands } from "./console-commands";

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

const consoleClientFactory = () => {
  return new ConsoleClient({
    config: baseConfig,
    pubSub,
    commands: consoleCommands,
  });
};

export default consoleClientFactory;
