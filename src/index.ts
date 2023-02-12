import { consoleCommands } from "./clients/console-client/console-commands";
import { ConsoleClient } from "./clients/console-client/console-client";
import { autoAnswers } from "./clients/twitch-client/auto-answers";
import { TwitchClient } from "./clients/twitch-client/twitch-client";
import config from "./config";
import { PubSub } from "./infrastructure/pub-sub";
import { IConfig } from "./types";
import { TwitchCommandsExecuterClient } from "./clients/twitch-commands-executer-client.ts/twitch-commands-executer-client";

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

const consoleClient = new ConsoleClient({
  config: baseConfig,
  pubSub,
  commands: consoleCommands,
});

const twitchClient = new TwitchClient({
  config: baseConfig,
  autoAnswers,
  pubSub,
});

new TwitchCommandsExecuterClient({
  config: baseConfig,
  pubSub,
});

const start = async () => {
  await twitchClient.connect();

  twitchClient.onMessage();

  console.log("start twitch client");

  consoleClient.onLine();

  console.log("start console client");
};

start();
