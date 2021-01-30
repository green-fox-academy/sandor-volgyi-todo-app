import * as fs from "fs";
import { MyFileHandler } from "./fileHandler";

class MyDBHandler extends MyFileHandler {
  private stringDB: string[];
  constructor(fileName: string) {
    super(fileName);
  }

  //check if the provided file is one of my todo files (optional, work on it if have time)
  static isDBFile(fileName: string): boolean {
    /*    if (fileName.split(".").pop() === "txt") {
      return true;
    }
    throw "This is not a txt file, cannot work with it.";*/
    return true;
  }

  //return the to-do app text as a string array
  private readToStringArrayDB(): string[] {
    console.log(this.fullPath);
    let content: string[] = fs.readFileSync(this.fullPath, "utf-8").split("\n");
    this.stringDB = content;
  }
}

let myLittleDB = new MyDBHandler("todo1.txt");
