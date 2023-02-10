import { getRandomInteger } from "./get-random-integer";

export const charSmiles = [
  "(* ^ ω ^)",
  "(╯✧▽✧)╯",
  "o(≧▽≦)o",
  "(◕‿◕)",
  "(─‿‿─)♡",
  "(μ‿μ) ❤",
  "( ˘⌣˘)♡(˘⌣˘ )",
  "(ノ*°▽°*)",
  "<(￣ ﹌ ￣)>",
  "(＃￣0￣)",
  "(；￣Д￣)",
  "╮( ˘ ､ ˘ )╭",
  "(←_←)",
  "(¬‿¬ )",
  "( : ౦ ‸ ౦ : )",
  "w(°ｏ°)w",
  "(*・ω・)ﾉ",
  "(づ ◕‿◕ )づ",
  "(▽◕ ᴥ ◕▽)",
  "(￣(00)￣)",
  "(╯°益°)╯彡┻━┻",
  "(◕‿◕✿)",
  "(^ω~)",
  "(ง°ل͜°)ง",
  "(>^_^)> <(^_^<)",
  "(@_@)",
  "(｡❤‿❤｡)",
  "(～o❤‿❤～o)",
  "(⌒_⌒;)",
  "(︶︹︺)",
  "(〇_ｏ)",
  "(⊙_⊙)",
  "(￣▽￣)ノ",
];

export const getRandomSmile = () => {
  const randNum = getRandomInteger(0, charSmiles.length - 1);
  return charSmiles[randNum];
};
