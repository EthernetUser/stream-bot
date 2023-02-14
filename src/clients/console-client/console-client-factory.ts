import { PubSub } from "../../infrastructure/pub-sub";
import { baseConfig } from "../base-config";
import { ConsoleClient } from "./console-client";
import { consoleCommands } from "./console-commands";

const pubSub = new PubSub();

const consoleClientFactory = () => {
  return new ConsoleClient({
    config: baseConfig,
    pubSub,
    commands: consoleCommands,
  });
};

export default consoleClientFactory;
