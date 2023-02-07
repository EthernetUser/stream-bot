import { IBaseConfigurable, ICommands } from "../../types";

export const commands: ICommands = {
  "!юля": (client: IBaseConfigurable) => {
    client.changeConfig({
      currentStreamer: client.config.streamers["юля"].nickName,
    });
  },
  "!лера": (client: IBaseConfigurable) => {
    client.changeConfig({
      currentStreamer: client.config.streamers["лера"].nickName,
    });
  },
  "!я": (client: IBaseConfigurable) => {
    client.changeConfig({
      currentStreamer: client.config.streamers["я"].nickName,
    });
  },
  "!all": (client: IBaseConfigurable) => {
    client.changeConfig({
      currentStreamer: client.config.streamers["all"].nickName,
    });
  },
  "!карина": (client: IBaseConfigurable) => {
    client.changeConfig({
      currentStreamer: client.config.streamers["карина"].nickName,
    });
  },
  "!автоответы": (client: IBaseConfigurable) => {
    client.changeConfig({
      autoAnswersMode: client.config.autoAnswersMode ? false : true,
    });
    console.log(`Автоответы: ${client.config.autoAnswersMode}`);
  },
};
