import { BaseConfigurable, Commands } from "../../types";

export const commands: Commands = {
    "!юля": (client: BaseConfigurable) => {
        client.changeConfig({
            currentStreamer: client.config.streamers["юля"].nickName,
        });
    },
    "!лера": (client: BaseConfigurable) => {
        client.changeConfig({
            currentStreamer: client.config.streamers["лера"].nickName,
        });
    },
    "!я": (client: BaseConfigurable) => {
        client.changeConfig({
            currentStreamer: client.config.streamers["я"].nickName,
        });
    },
    "!all": (client: BaseConfigurable) => {
        client.changeConfig({
            currentStreamer: client.config.streamers["all"].nickName,
        });
    },
    "!карина": (client: BaseConfigurable) => {
        client.changeConfig({
            currentStreamer: client.config.streamers["карина"].nickName,
        });
    },
    "!автоответы": (client: BaseConfigurable) => {
        client.changeConfig({
            autoAnswersMode: client.config.autoAnswersMode ? false : true,
        });
        console.log(`Автоответы: ${client.config.autoAnswersMode}`);
    },
};
