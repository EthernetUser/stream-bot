import { v4 as uuid } from "uuid";

import { commands } from "./clients/console-client/commands";
import { ConsoleClient } from "./clients/console-client/console-client";
import { autoAnswers } from "./clients/twitch-client/auto-answers";
import { TwitchClient } from "./clients/twitch-client/twitch-client";
import config from "./config";
import jsonCredentionals from "./config";
import { PubSub } from "./infrastructure/pub-sub";
import { IConfig, IStreamerInfo } from "./types";

const streamers: IStreamerInfo = {
  юля: { nickName: "l_julinka_l", delay: 0 },
  лера: { nickName: "valer1ka", delay: 1000 },
  я: { nickName: "iamgastank", delay: 0 },
  карина: { nickName: "samuraisooab", delay: 1000 },
  all: { nickName: "", delay: 1000 },
};

const baseConfig: IConfig = {
  autoAnswersMode: true,
  currentStreamer: "",
  streamers,
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
