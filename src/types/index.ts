import { Userstate } from "tmi.js";
import { TwitchClient } from "../clients/twitch-client/twitch-client";
import config from "../config";

export interface IAutoAnswers {
  [k: string]: (options: IOptions) => string | Promise<string>;
}

export interface IPubSub {
  publish: (eventName: string, message: any, uuid: string) => void;
  subscribe: (
    eventName: string,
    listener: (message: any) => Promise<any> | any,
    uuid: string
  ) => void;
}

export interface IOptions {
  tags: Userstate;
  channel: string;
  self: boolean;
  message: string;
}

export interface IConsoleCommands {
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
  events: typeof config.events;
}

export interface IBaseConfigurable {
  uuid: string;
  config: IConfig;
  changeConfig: (newConfig: Partial<IConfig>) => void;
}

export interface ITwitchCommandParser {
  parse: (message: string) => string[] | null;
}

export interface ITwitchCommands {
  [k: string]: {
    args?: {
      [k: string]: {
        type: "number" | "string";
        description: string;
        avaliableValues?: string[];
        isNickName?: boolean;
      };
    };
    execute: ({
      pubSub,
      nickName,
      args,
      event,
      channel,
    }: {
      pubSub: IPubSub;
      nickName: string;
      args: string[];
      event: string;
      channel: string;
    }) => void;
  };
}
