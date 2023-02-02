import { Userstate } from "tmi.js";

export interface IPubSub {
    publish: (channelName: string, message: any) => void;
    subscribe: (
        channelName: string,
        listener: (message: any) => Promise<any> | any
    ) => void;
}

export type Options = {
    tags: Userstate;
    channel: string;
    self: boolean;
    message: string;
};

export interface Commands {
    [k: string]: (client: BaseConfigurable) => void | undefined;
}

export interface StreamerInfo {
    [k: string]: {
        nickName: string;
        delay: number;
    };
}

export interface Config {
    autoAnswersMode: boolean;
    currentStreamer: string;
    streamers: StreamerInfo;
    tmiConfig: {
        username: string;
        password: string;
    };
}

export interface BaseConfigurable {
    config: Config;
    changeConfig: (newConfig: Partial<Config>) => void;
}
