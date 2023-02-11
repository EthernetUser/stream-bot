import { IPubSub } from "../types";

export class PubSub implements IPubSub {
  private static events: {
    [event: string]: { listener: (message: any) => any; uuid: string }[];
  } = {};

  public subscribe(
    eventName: string,
    listener: (message: any) => Promise<any> | any,
    uuid: string
  ) {
    if (!PubSub.events[eventName]) {
      PubSub.events[eventName] = [];
    } else {
      const eventListenersLength = PubSub.events[eventName].filter(
        (event) => event.listener.name === listener.name && event.uuid === uuid
      ).length;
      if (eventListenersLength !== 0) {
        return;
      }
    }
    PubSub.events[eventName].push({ listener, uuid });
  }

  public publish(eventName: string, message: any, uuid: string) {
    const event = PubSub.events[eventName];
    if (!event || !event.length) {
      return;
    }
    event
      .filter((event) => event.uuid !== uuid)
      .forEach((event) => event.listener(message));
  }
}
