import * as fs from "fs";
import { MyFileHandler } from "./fileHandler";

class MyDBModifier extends MyFileHandler {
  private metaStart: string = "<Flat DB of Sanyi's todo app>";
  private dataStart: string = "<TodoData>";
  private stringDB: string[];
  private dbMeta: string[];
  private dbData: string[];

  constructor(fileName: string) {
    super(fileName);
    this.readToStringArrayDB();
  }

  //check if the provided file is one of my todo files (optional, work on it if have time)
  private isDBFile(): boolean {
    if (this.stringDB[0] === this.metaStart) {
      return true;
    }
    return false;
  }

  //return the to-do app text as a string array
  private readToStringArrayDB(): void {
    console.log(this.fullPath);
    let content: string[] = fs.readFileSync(this.fullPath, "utf-8").split("\n");
    this.stringDB = content;
  }

  private readMetaAndData(): void {
    let isData: boolean = false;
    this.stringDB.forEach((a) => {
      if (a === this.dataStart) {
        isData = true;
      }
      if (isData) {
        this.dbData.push(a);
      } else {
        this.dbMeta.push(a);
      }
    });
  }

  public getDBData(): string[] {
    return this.dbData;
  }
}

/*************************WE SHOULD HAVE AN OPTION TO CREATE DB FROM NULL, NOT ONLY MODIFY IT. BUILD META, CREATE FILE */
class MyDBCreator extends MyFileHandler {}

let myLittleDB = new MyDBModifier("todo1.txt");
