import config from "../../config";
import { ITwitchCommands } from "../../types";
import { getRandomInteger } from "../get-random-integer";

export const twitchCommands: ITwitchCommands = {
  таймер: {
    args: {
      timeToWait: {
        type: "number",
        description: "время, на которое ты хочешь завести таймер (целое число)",
      },
      timeType: {
        type: "string",
        description: "секунды или минуты (сек, мин)",
        avaliableValues: ["сек", "мин"],
      },
    },
    async execute({
      pubSub,
      nickName,
      args: [timeToWait, timeType],
      event,
      channel,
    }) {
      const expressionFromTimeType: { [k: string]: (value: number) => number } =
        {
          сек: (value: number) => value * 1000,
          мин: (value: number) => value * 1000 * 60,
        };

      const timeToWaitNum = parseInt(timeToWait, 10);
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
        }, timeInMs(timeToWaitNum));
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
    execute({ pubSub, nickName, args: [target], event, channel }) {
      const slicedChannelName = channel[0] === "#" ? channel.slice(1) : channel;
      const atSignedNickName = "@" + nickName;
      const punchResults = [
        `${atSignedNickName} смог ударить ${target}`,
        `${atSignedNickName} не смог ударить ${target}`,
        `${atSignedNickName} хотел ударить ${target}, но подскальзнулся и упал`,
        `${atSignedNickName} ударил ${target}, но этот удар не нанес урона`,
        `кулак ${atSignedNickName} пролетел мимо ${target} и попал по кирпичной стене... больно наверное...`,
        `${atSignedNickName} ударил так, что ${target} отлетел в соседнее здание`,
        `${atSignedNickName} ударил так, что у ${target} выбило все зубы`,
        `${atSignedNickName} ударил так, что ${target} захотел только почесаться`,
        `${atSignedNickName} наносит критический удар по ${target}.... помянем ${target} минутой молчания...`,
        `${atSignedNickName} достает биту и незамысловатым движением отправляет ${target} на тот свет`,
        `${atSignedNickName} вместо удара жидко пернул`,
        `ужасающий ${atSignedNickName} крошит лицо ${target} в мясо`,
        `${atSignedNickName} пытается ударить ${target} но в последний момент ${slicedChannelName} принимает удар на себя`,
        `на канале ${slicedChannelName} начинается лютый файт "${atSignedNickName} vs ${target}"... бац хрях дыыыыыыыщ кия... побеждает ${
          getRandomInteger(0, 1) === 0 ? atSignedNickName : target
        }, поздравим его!`,
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
