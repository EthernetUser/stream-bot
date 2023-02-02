import { BaseConfigurable, Config } from "../types";

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
