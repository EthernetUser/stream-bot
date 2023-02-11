import { ITwitchCommandParser } from "../../types";

export class TwitchCommandParser implements ITwitchCommandParser {
  private commandWord: string;

  constructor({ commandWord }: { commandWord: string }) {
    this.commandWord = commandWord;
  }

  public parse(message: string) {
    const parsedCommand = message.split(" ");
    if (
      !parsedCommand.length ||
      parsedCommand[0] !== this.commandWord ||
      parsedCommand.length === 1
    ) {
      return null;
    }
    return parsedCommand;
  }
}
