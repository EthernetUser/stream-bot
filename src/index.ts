import { commands } from "./clients/console-client/commands";
import { ConsoleClient } from "./clients/console-client/console-client";
import { autoAnswers } from "./clients/twitch-client/auto-answers";
import { TwitchClient } from "./clients/twitch-client/twitch-client";
import jsonCredentionals from "./config";
import { PubSub } from "./infrastructure/pub-sub";
import { Config, StreamerInfo } from "./types";

const streamers: StreamerInfo = {
    юля: { nickName: "l_julinka_l", delay: 0 },
    лера: { nickName: "valer1ka", delay: 1000 },
    я: { nickName: "iamgastank", delay: 0 },
    карина: { nickName: "samuraisooab", delay: 0 },
    all: { nickName: "", delay: 1000 },
};

const baseConfig: Config = {
    autoAnswersMode: true,
    currentStreamer: "",
    streamers,
    tmiConfig: {
        ...jsonCredentionals.tmiCrendentials,
    },
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
    console.log("start twitch client");

    await twitchClient.connect();

    twitchClient.onMessage();

    console.log("start console client");

    consoleClient.onLine();
};

start();
