import { IAutoAnswers } from "../../types";

const nicknames = {
  me: "iamgastank",
  коля: "den_nagany",
  марк: "s_meisik_s",
  пливетик: "pliviitiek",
};

function randomInteger(minimum: number, maximum: number) {
  if (maximum === undefined) {
    maximum = minimum;
    minimum = 0;
  }

  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

const randomKolya = () => {
  const names = ["лох", "насосал на подписку", "насосал на модерку"];
  const randNum = randomInteger(0, names.length - 1);
  return names[randNum];
};

const randomMark = () => {
  const names = [
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
  const randNum = randomInteger(0, names.length - 1);
  return names[randNum];
};

const randomJulia = () => {
  const names = [
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
  ];
  const randNum = randomInteger(0, names.length - 1);
  return names[randNum];
};

const randomRole = () => {
  const roles = ["мидер", "керри", "хардер", "семи-саппорт", "фул-саппорт"];
  const randNum = randomInteger(0, roles.length - 1);
  return roles[randNum];
};

const answerToLoh: { [k: string]: (() => string) | undefined } = {
  [nicknames.коля]: () => `@${nicknames.коля} коляньчик, сам ты лох мелкий)`,
  [nicknames.марк]: () => `@${nicknames.марк} марик) ты ж сам лох)`,
  [nicknames.пливетик]: () => `@${nicknames.пливетик} сама мелкая лохушка`,
};

export const autoAnswers: IAutoAnswers = {
  саня: () => "че",
  "саня ты тут?": () => "неа)",
  "саня го в доту": () => "не",
  "саня го в апекс": () => "эээм, я что похож наа... юлю?",
  "юля лох": ({ tags }) => `@${tags["display-name"]} согласен`,
  "ира лох": ({ tags }) => `@${tags["display-name"]} тут не поспоришь`,
  "саня лох": ({ tags }) => {
    const answer = answerToLoh[tags["display-name"] || ""];

    if (answer) {
      return answer();
    }
    return `@${tags["display-name"]} сам лох`;
  },
  "лера лох": ({ tags }) => `@${tags["display-name"]} соглы`,
  "марк лох": ({ tags }) => `@${tags["display-name"]} соглы`,
  "коля лох": ({ tags }) => `@${tags["display-name"]} соглы`,
  "сколько см у карины": ({ tags }) => `@${tags["display-name"]} у карины ${randomInteger(3, 40)} см`,
  "сколько см у юли": ({ tags }) => `@${tags["display-name"]} у юли ${randomInteger(3, 40)} см`,
  "сколько у меня см": ({ tags }) => `@${tags["display-name"]} у тебя ${randomInteger(3, 40)} см`,
  "привет саня": () => "прив",
  "саня привет": () => "прив",
  "дота чи не": ({ tags }) => `@${tags["display-name"]} ` + (randomInteger(0, 1) == 0 ? "не" : "го"),
  "кто такой марк": ({ tags }) => `@${tags["display-name"]} он ${randomMark()}`,
  пи: ({ tags }) => `@${tags["display-name"]} door`,
  "кто такой саня": ({ tags }) => `@${tags["display-name"]} он красавчик`,
  "кто такая юля": ({ tags }) => `@${tags["display-name"]} она ${randomJulia()}`,
  "кто такой коля": ({ tags }) => `@${tags["display-name"]} он ${randomKolya()}`,
  "роль юли": ({ tags }) => `@${tags["display-name"]} она ${randomRole()}`,
  "кто такой пливетик": ({ tags }) => `@${tags["display-name"]} он гей`,
  "моя роль": ({ tags }) => {
    const role = tags["display-name"] === nicknames.me ? "красавчик" : randomRole();
    return `@${tags["display-name"]} ты ${role}`;
  },
  "что вершит судьбу человечества": () =>
    `Что вершит судьбу человечества в этом мире? Некое незримое существо или закон, подобно Длани Господней парящей над миром? По крайне мере истинно то, что человек не властен даже над своей волей.`,
  женщины: ({ tags }) =>
    `@${tags["display-name"]} Женщины... алчные, корыстные, злобные, согрешившие против самого человечества... Нельзя поддаваться греху, нужно бороться, сражаться! Нельзя предавать метал, сколь не было бы сильно искушение ереси, будь твёрд в вере своей. Знай, огонь святости, что горит вдалеке ближе, и тем он ближе, чем сильнее высекаешь ты. Будь крепок и нулеёбен, металлист.`,
};
