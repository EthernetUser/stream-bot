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

export class BaseConfig implements BaseConfigurable {
    public config: Config;
    private isChanged: boolean = false;

    constructor(config: Config) {
        this.config = config;
    }

    public changeConfig(newConfig: Partial<Config>) {
        this.config = {
            ...this.config,
            ...newConfig,
        };
    }
}
