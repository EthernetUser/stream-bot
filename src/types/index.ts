import { Userstate } from "tmi.js";
import config from "../config";

export interface IAutoAnswers {
  [k: string]: (options: IOptions) => string | Promise<string>;
}

export interface IPubSub {
  publish: (channelName: string, message: any, uuid: string) => void;
  subscribe: (channelName: string, listener: (message: any) => Promise<any> | any, uuid: string) => void;
}

export interface IOptions {
  tags: Userstate;
  channel: string;
  self: boolean;
  message: string;
}

export interface ICommands {
  [k: string]: (client: IBaseConfigurable) => void | undefined;
}

export interface IStreamerInfo {
  [k: string]: {
    nickName: string;
    delay: number;
  };
}

export interface IConfig {
  autoAnswersMode: boolean;
  currentStreamer: string;
  streamers: IStreamerInfo;
  tmiConfig: {
    username: string;
    password: string;
  };
  events: typeof config.events
}

export interface IBaseConfigurable {
  uuid: string;
  config: IConfig;
  changeConfig: (newConfig: Partial<IConfig>) => void;
}
