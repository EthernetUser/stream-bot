import { commands } from "./clients/console-client/commands";
import { ConsoleClient } from "./clients/console-client/console-client";
import { autoAnswers } from "./clients/twitch-client/auto-answers";
import { TwitchClient } from "./clients/twitch-client/twitch-client";
import config from "./config";
import jsonCredentionals from "./config";
import { PubSub } from "./infrastructure/pub-sub";
import { IConfig } from "./types";

const baseConfig: IConfig = {
  autoAnswersMode: true,
  currentStreamer: "",
  streamers: config.streamers,
  tmiConfig: {
    ...jsonCredentionals.tmiCrendentials,
  },
  events: config.events,
};

const pubSub = new PubSub();

const consoleClient = new ConsoleClient({
  config: baseConfig,
  pubSub,
  commands,
});

const twitchClient = new TwitchClient({
  config: baseConfig,
  autoAnswers,
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
