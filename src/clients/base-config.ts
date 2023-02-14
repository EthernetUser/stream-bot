import config from "../config";
import { IConfig } from "../types";

export const baseConfig: IConfig = {
  autoAnswersMode: true,
  currentStreamer: "",
  streamers: config.streamers,
  tmiConfig: {
    ...config.tmiCrendentials,
  },
  events: config.events,
};
