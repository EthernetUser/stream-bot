import { Options } from "../../types";

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

  if (typeof minimum !== "number" || typeof maximum !== "number") {
    throw new TypeError("Expected all arguments to be numbers");
  }

  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

const randomKolya = () => {
  const names = [
    "лох",
    "насосал на подписку",
    "насосал на модерку",
  ];
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

export const autoAnswers: {
  [k: string]: (opitons: Options) => string | Promise<string>;
} = {
  саня: () => "че",
  "саня ты тут?": () => "неа)",
  "саня го в доту": () => "не",
  "саня го в апекс": () => "эээм, я что похож наа... юлю?",
  "юля лох": (options) => `@${options.tags["display-name"]} согласен`,
  "ира лох": (options) => `@${options.tags["display-name"]} тут не поспоришь`,
  "саня лох": (options) => {
    const answer = answerToLoh[options.tags["display-name"] || ""];

    if (answer) {
      return answer();
    }
    return `@${options.tags["display-name"]} сам лох`;
  },
  "лера лох": (options) => `@${options.tags["display-name"]} соглы`,
  "марк лох": (options) => `@${options.tags["display-name"]} соглы`,
  "коля лох": (options) => `@${options.tags["display-name"]} соглы`,
  "сколько см у карины": (opitons) => `@${opitons.tags["display-name"]} у карины ${randomInteger(3, 40)} см`,
  "сколько см у юли": (opitons) => `@${opitons.tags["display-name"]} у юли ${randomInteger(3, 40)} см`,
  "сколько у меня см": (options) => `@${options.tags["display-name"]} у тебя ${randomInteger(3, 40)} см`,
  "привет саня": () => "прив",
  "саня привет": () => "прив",
  "дота чи не": (opitons) => `@${opitons.tags["display-name"]} ` + (randomInteger(0, 1) == 0 ? "не" : "го"),
  "кто такой марк": (opitons) => `@${opitons.tags["display-name"]} он ${randomMark()}`,
  пи: (opitons) => `@${opitons.tags["display-name"]} door`,
  "кто такой саня": (opitons) => `@${opitons.tags["display-name"]} он красавчик`,
  "кто такая юля": (options) => `@${options.tags["display-name"]} она ${randomJulia()}`,
  "кто такой коля": (options) => `@${options.tags["display-name"]} он ${randomKolya()}`,
  "роль юли": (options) => `@${options.tags["display-name"]} она ${randomRole()}`,
  "кто такой пливетик": (options) => `@${options.tags['display-name']} он гей`, 
  "моя роль": (options) => {
    const role = options.tags["display-name"] === nicknames.me ? "красавчик" : randomRole();
    return `@${options.tags["display-name"]} ты ${role}`;
  },
  "что вершит судьбу человечества": () =>
    `Что вершит судьбу человечества в этом мире? Некое незримое существо или закон, подобно Длани Господней парящей над миром? По крайне мере истинно то, что человек не властен даже над своей волей.`,
  женщины: (opitons) =>
    `@${opitons.tags["display-name"]} Женщины... алчные, корыстные, злобные, согрешившие против самого человечества... Нельзя поддаваться греху, нужно бороться, сражаться! Нельзя предавать метал, сколь не было бы сильно искушение ереси, будь твёрд в вере своей. Знай, огонь святости, что горит вдалеке ближе, и тем он ближе, чем сильнее высекаешь ты. Будь крепок и нулеёбен, металлист.`,
};
