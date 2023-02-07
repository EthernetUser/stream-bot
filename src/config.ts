import * as dotenv from "dotenv";

dotenv.config();

const { env } = process;



export default {
  tmiCrendentials: {
    username: env.TMI_USERNAME || "",
    password: env.TMI_PASSWORD || "",
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
