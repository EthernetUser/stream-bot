import { consoleClientFactory } from "./clients/console-client";
import twitchClientFactory from "./clients/twitch-client/twitch-client-factory";
import { twitchCommandsExecuterClientFactory } from "./clients/twitch-commands-executer-client";

const consoleClient = consoleClientFactory();

const twitchClient = twitchClientFactory();

const twitchCommandsExecuterClient = twitchCommandsExecuterClientFactory();

const start = async () => {
  twitchCommandsExecuterClient.onCommandReceive();

  await twitchClient.connect();

  twitchClient.onMessage();

  console.log("start twitch client");

  consoleClient.onLine();

  console.log("start console client");
};

start();
