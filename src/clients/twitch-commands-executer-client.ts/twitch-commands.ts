import config from "../../config";
import { ITwitchCommands } from "../../types";
import { getRandomInteger } from "../get-random-integer";

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
      console.log(
        `[channel: ${channel}] @${config.streamers.я.nickName}: (command) ${messageTimerIsReady}`
      );
      pubSub.publish(
        event || "",
        { channel, message: messageTimerIsReady, emoji: true },
        ""
      );

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, timeInMs(timeToWait));
      });

      const messageDone = `@${nickName} время вышло`;
      console.log(
        `[channel: ${channel}] @${config.streamers.я.nickName}: (command) ${messageDone}`
      );
      pubSub.publish(
        event || "",
        { channel, message: messageDone, emoji: true },
        ""
      );
    },
  },
  ударить: {
    args: {
      target: {
        type: "string",
        description: "ник того, кого хочешь ударить",
        isNickName: true,
      },
    },
    execute({ pubSub, nickName, args, event, channel }) {
      const slicedChannelName = channel[0] === "#" ? channel.slice(1) : channel;
      const punchResults = [
        `@${nickName} смог ударить ${args[0]}`,
        `@${nickName} не смог ударить ${args[0]}`,
        `@${nickName} хотел ударить ${args[0]}, но подскальзнулся и упал`,
        `@${nickName} ударил ${args[0]}, но этот удар не нанес урона`,
        `кулак @${nickName} пролетел мимо ${args[0]} и попал по кирпичной стене... больно наверное...`,
        `@${nickName} ударил так, что ${args[0]} отлетел в соседнее здание`,
        `@${nickName} ударил так, что у ${args[0]} выбило все зубы`,
        `@${nickName} ударил так, что ${args[0]} захотел только почесаться`,
        `@${nickName} наносит критический удар по ${args[0]}.... помянем ${args[0]} минутой молчания...`,
        `@${nickName} достает биту и незамысловатым движением отправляет ${args[0]} на тот свет`,
        `@${nickName} вместо удара жидко пернул`,
        `ужасающий @${nickName} крошит лицо ${args[0]} в мясо`,
        `@${nickName} пытается ударить ${args[0]} но в последний момент ${slicedChannelName} принимает удар на себя`,
        `на канале ${slicedChannelName} начинается лютый файт "@${nickName} vs ${args[0]}"... бац хрях дыыыыыыыщ кия... побеждает @${nickName}, поздравим его!`,
        `на канале ${slicedChannelName} начинается лютый файт "@${nickName} vs ${args[0]}"... бац хрях дыыыыыыыщ кия... побеждает ${args[0]}, поздравим его!`
      ];
      const randNum = getRandomInteger(0, punchResults.length - 1);

      const punchResultText = punchResults[randNum];
      console.log(
        `[channel: ${channel}] @${config.streamers.я.nickName}: (command) ${punchResultText}`
      );
      pubSub.publish(
        event || "",
        { channel, message: punchResultText, emoji: true },
        ""
      );
    },
  },
  ролл: {
    execute({ pubSub, nickName, event, channel }) {
      const randNum = getRandomInteger(0, 100);

      const message = `@${nickName} ${randNum}`;
      console.log(
        `[channel: ${channel}] @${config.streamers.я.nickName}: (command) ${message}`
      );
      pubSub.publish(event || "", { channel, message, emoji: true }, "");
    },
  },
  флип: {
    execute({ pubSub, nickName, event, channel }) {
      const randNum = getRandomInteger(0, 1);

      const message = `@${nickName} ${randNum === 0 ? "орел" : "решка"}`;
      console.log(
        `[channel: ${channel}] @${config.streamers.я.nickName}: (command) ${message}`
      );
      pubSub.publish(event || "", { channel, message, emoji: true }, "");
    },
  },
};
