import { IAutoAnswers, IOptions } from "../../types";
import { getRandomInteger } from "../get-random-integer";

const nicknames = {
  me: "iamgastank",
  коля: "den_nagany",
  марк: "s_meisik_s",
  пливетик: "pliviitiek",
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

const juliaNames = [
  "логист",
  "продавец",
  "оператор",
  "стример",
  "лох",
  "лохушка",
  "стервочка",
  "гость из арифлейма",
  "прирожденная уборщица",
  "ебырь в апексе",
  "сосун в доте",
  "уважаемая дама",
  "девочка припевочка",
  "старушка",
  "вялый хот-дог",
  "кошкодевочка",
  "две сиськи и жопа",
  "пельмень",
  "легко верит всяким ноунейм фирмам по ремонту пк",
  "юля 20 фпс апекс",
  "фантомка 0 10",
  "дает крест на себя",
  "гном",
  "дворф",
  "не ходит в качалку(",
  "качек наоборот",
  "не выкупает рофлов",
];

const kolyaNames = ["лох", "насосал на подписку", "насосал на модерку"];

const roles = ["мидер", "керри", "хардер", "семи-саппорт", "фул-саппорт"];

const answersToLoh: { [k: string]: (() => string) | undefined } = {
  [nicknames.коля]: () => `@${nicknames.коля} коляньчик, сам ты лох мелкий)`,
  [nicknames.марк]: () => `@${nicknames.марк} марик) ты ж сам лох)`,
  [nicknames.пливетик]: () => `@${nicknames.пливетик} сама мелкая лохушка`,
};

const answerToLoh = ({ tags }: IOptions) => {
  const answer = answersToLoh[tags["display-name"] || ""];

  if (answer) {
    return answer();
  }
  return `@${tags["display-name"]} сам лох`;
};

export const autoAnswers: IAutoAnswers = {
  саня: () => "че",
  "саня ты тут?": () => "неа)",
  "саня го в доту": () => "не",
  "саня го в апекс": () => "эээм, я что похож наа... юлю?",
  "юля лох": ({ tags }) => `@${tags["display-name"]} согласен`,
  "ира лох": ({ tags }) => {
    if (tags["display-name"] === nicknames.марк) {
      return `@${tags["display-name"]} эээ, ты че свою девушку обзываешь`;
    }
    return `@${tags["display-name"]} тут не поспоришь`;
  },
  "саня лох": answerToLoh,
  санялох: answerToLoh,
  "лох саня": answerToLoh,
  лохсаня: answerToLoh,
  "саня ты лох": answerToLoh,
  санятылох: answerToLoh,
  "саня тылох": answerToLoh,
  "саняты лох": answerToLoh,
  "лера лох": ({ tags }) => `@${tags["display-name"]} соглы`,
  "марк лох": ({ tags }) => {
    if (tags["display-name"] === nicknames.пливетик) {
      return `@${tags["display-name"]} какой он лох? ты же его любишь)`;
    }
    return `@${tags["display-name"]} соглы`;
  },
  "коля лох": ({ tags }) => `@${tags["display-name"]} соглы`,
  "сколько см у карины": ({ tags }) =>
    `@${tags["display-name"]} у карины ${getRandomInteger(3, 40)} см`,
  "сколько см у леры": ({ tags }) =>
    `@${tags["display-name"]} у леры ${getRandomInteger(3, 40)} см`,
  "сколько см у юли": ({ tags }) =>
    `@${tags["display-name"]} у юли ${getRandomInteger(3, 40)} см`,
  "насколько я люблю юлю": ({ tags }) => {
    return `@${tags["display-name"]} ты любишь юлю на ${getRandomInteger(
      0,
      100
    )}%`;
  },
  "насколько я люблю лерку": ({ tags }) => {
    return `@${tags["display-name"]} ты любишь лерку на ${getRandomInteger(
      0,
      100
    )}%`;
  },
  "сколько см у коли": ({ tags }) =>
    `@${tags["display-name"]} у коли ${getRandomInteger(-1, -69)} см`,
  "сколько у меня см": ({ tags }) =>
    `@${tags["display-name"]} у тебя ${getRandomInteger(3, 40)} см`,
  "привет саня": () => "прив",
  "саня привет": () => "прив",
  "дота чи не": ({ tags }) =>
    `@${tags["display-name"]} ` + (getRandomInteger(0, 1) == 0 ? "не" : "го"),
  "кто такой марк": ({ tags }) =>
    `@${tags["display-name"]} он ${getRandomElementFromArray(markNames)}`,
  пи: ({ tags }) => `@${tags["display-name"]} door`,
  "кто такой саня": ({ tags }) => `@${tags["display-name"]} он красавчик`,
  "кто такая юля": ({ tags }) =>
    `@${tags["display-name"]} она ${getRandomElementFromArray(juliaNames)}`,
  "кто такой коля": ({ tags }) =>
    `@${tags["display-name"]} он ${getRandomElementFromArray(kolyaNames)}`,
  "роль юли": ({ tags }) =>
    `@${tags["display-name"]} она ${getRandomElementFromArray(roles)}`,
  "кто такой пливетик": ({ tags }) => `@${tags["display-name"]} он гей`,
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
};
