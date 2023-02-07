import { v4 as uuid } from "uuid";
import { IBaseConfigurable, IConfig } from "../types";

export class BaseConfig implements IBaseConfigurable {
  public config: IConfig;
  public uuid: string;

  constructor(config: IConfig) {
    this.config = config;
    this.uuid = uuid();
  }

  protected getEventName(event: { exchange: string; routingKey: string }) {
    return `${event.exchange}/${event.routingKey}`;
  }

  public changeConfig(newConfig: Partial<IConfig>) {
    this.config = {
      ...this.config,
      ...newConfig,
    };
  }
}
