import * as dotenv from "dotenv";

dotenv.config();

const { env } = process;

export default {
  tmiCrendentials: {
    username: env.TMI_USERNAME || "",
    password: env.TMI_PASSWORD || "",
  },
  streamers: {
    юля: { nickName: "l_julinka_l", delay: 0 },
    лера: { nickName: "valer1ka", delay: 1000 },
    я: { nickName: "iamgastank", delay: 0 },
    карина: { nickName: "samuraisooab", delay: 1000 },
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
  },
};
