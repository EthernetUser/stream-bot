export interface IPubSub {
    publish: (channelName: string, message: any) => void,
    subscribe: (channelName: string, listener: (message: any) => Promise<any> | any) => void
};

export class PubSub implements IPubSub {
    private static channels: { [channel: string]: ((message: any) => any)[] } =
        {};

    public subscribe(
        channelName: string,
        listener: (message: any) => Promise<any> | any
    ) {
        if (!PubSub.channels[channelName]) {
            PubSub.channels[channelName] = [];
        }
        PubSub.channels[channelName].push(listener);
    }

    public publish(channelName: string, message: any) {
        const channel = PubSub.channels[channelName];
        if (!channel || !channel.length) {
            return;
        }
        channel.forEach((listener) => listener(message));
    }
}
