import * as dotenv from "dotenv";

dotenv.config();

const { env } = process;

export default {
  tmiCrendentials: {
    username: env.TMI_USERNAME || "",
    password: env.TMI_PASSWORD || "",
  },
  streamers: {
    лера: { nickName: "valer1ka", delay: 1000 },
    я: { nickName: "iamgastank", delay: 0 },
    карина: { nickName: "samuraisooab", delay: 1000 },
    уточка: { nickName: "yto4ka_xd", delay: 1000 },
    all: { nickName: "", delay: 1000 },
  },
  events: {
    twitchSendMessage: {
      exchange: "twitch",
      routingKey: "sendMessage",
    },
    configChange: {
      exchange: "config",
      routingKey: "change",
    },
    recieveTwitchCommand: {
      exchange: "twitch",
      routingKey: "recieveCommand",
    },
  },
};
