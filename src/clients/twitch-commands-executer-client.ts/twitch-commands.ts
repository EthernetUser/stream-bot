import { ITwitchCommands } from "../../types";

export const twitchaCommands: ITwitchCommands = {
  таймер: {
    args: {
      timeToWait: {
        type: "number",
        description: "время, на которое ты хочешь завести таймер (целое число)",
      },
      timeType: {
        type: "string",
        description: "секунды или минуты (сек, мин)",
        avalibaleValues: ["сек", "мин"],
      },
    },
    async execute({ pubSub, nickName, args, event, channel }) {
      const expressionFromTimeType: { [k: string]: (value: number) => number } =
        {
          сек: (value: number) => value * 1000,
          мин: (value: number) => value * 1000 * 60,
        };

      const timeToWait = parseInt(args[0], 10);
      const timeType = args[1];

      const timeInMs = expressionFromTimeType[timeType];

      if (!timeInMs) {
        throw new Error(`unknown time type: ${timeType}`);
      }

      const messageTimerIsReady = `@${nickName} таймер поставлен`;
      pubSub.publish(
        event || "",
        { channel, message: messageTimerIsReady },
        ""
      );

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, timeInMs(timeToWait));
      });

      const messageDone = `@${nickName} время вышло`;
      pubSub.publish(event || "", { channel, message: messageDone }, "");
    },
  },
};
