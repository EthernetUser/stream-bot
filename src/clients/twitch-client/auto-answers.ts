import { IAutoAnswers, IOptions } from "../../types";
import { getRandomInteger } from "../get-random-integer";

const nicknames = {
  me: "iamgastank",
  марк: "s_meisik_s",
};

const getRandomElementFromArray = (arr: string[]) => {
  const randNum = getRandomInteger(0, arr.length - 1);
  return arr[randNum];
};

const markNames = [
  "лох",
  "дотер",
  "дотер лох, который пытаеться в апекс",
  "врунишка",
  "топ инвок",
  "дно инвок",
  "мягкий пельмень",
  "полу карк полу кук",
  "главный по телкам",
  "маленькая бэйба",
  "знает кунг-фу",
  "нереальный типок, написал нейронку на ифах",
  "гей",
];

const roles = ["мидер", "керри", "хардер", "семи-саппорт", "фул-саппорт"];

const answersToLoh: { [k: string]: (() => string) | undefined } = {
  [nicknames.марк]: () => `@${nicknames.марк} марик) ты ж сам лох)`,
};

const answerToLoh = ({ tags }: IOptions) => {
  const answer = answersToLoh[tags["display-name"] || ""];

  if (answer) {
    return answer();
  }
  return `@${tags["display-name"]} сам лох`;
};

const autoAnswersForMe: IAutoAnswers = {
  саня: () => "че",
  "саня ты тут?": () => "неа)",
  "саня го в доту": () => "не",
  "саня го в апекс": () => "эээм, я что похож наа... юлю?",
  "саня лох": answerToLoh,
  санялох: answerToLoh,
  "лох саня": answerToLoh,
  лохсаня: answerToLoh,
  "саня ты лох": answerToLoh,
  санятылох: answerToLoh,
  "саня тылох": answerToLoh,
  "саняты лох": answerToLoh,
  "кто такой саня": ({ tags }) => `@${tags["display-name"]} он красавчик`,
  "привет саня": () => "прив",
  "саня привет": () => "прив",
};

const autoAnswersForMark: IAutoAnswers = {
  "марк лох": ({ tags }) => `@${tags["display-name"]} соглы`,
  "кто такой марк": ({ tags }) =>
    `@${tags["display-name"]} он ${getRandomElementFromArray(markNames)}`,
};

const autoAnswersForLerka: IAutoAnswers = {
  "лера лох": ({ tags }) => `@${tags["display-name"]} соглы`,
  "сколько см у леры": ({ tags }) =>
    `@${tags["display-name"]} у леры ${getRandomInteger(3, 40)} см`,
  "насколько я люблю лерку": ({ tags }) => {
    return `@${tags["display-name"]} ты любишь лерку на ${getRandomInteger(
      0,
      100
    )}%`;
  },
};

const autoAnswersGeneral: IAutoAnswers = {
  "сколько у меня см": ({ tags }) =>
    `@${tags["display-name"]} у тебя ${getRandomInteger(3, 40)} см`,
  "дота чи не": ({ tags }) =>
    `@${tags["display-name"]} ` + (getRandomInteger(0, 1) == 0 ? "не" : "го"),
  "моя роль": ({ tags }) => {
    const role =
      tags["display-name"] === nicknames.me
        ? "красавчик"
        : getRandomElementFromArray(roles);
    return `@${tags["display-name"]} ты ${role}`;
  },
  "что вершит судьбу человечества": () =>
    `Что вершит судьбу человечества в этом мире? Некое незримое существо или закон, подобно Длани Господней парящей над миром? По крайне мере истинно то, что человек не властен даже над своей волей.`,
  женщины: ({ tags }) =>
    `@${tags["display-name"]} Женщины... алчные, корыстные, злобные, согрешившие против самого человечества... Нельзя поддаваться греху, нужно бороться, сражаться! Нельзя предавать метал, сколь не было бы сильно искушение ереси, будь твёрд в вере своей. Знай, огонь святости, что горит вдалеке ближе, и тем он ближе, чем сильнее высекаешь ты. Будь крепок и нулеёбен, металлист.`,
  пи: ({ tags }) => `@${tags["display-name"]} door`,
};

export const autoAnswers: IAutoAnswers = {
  ...autoAnswersGeneral,
  ...autoAnswersForMe,
  ...autoAnswersForMark,
  ...autoAnswersForLerka,
};
