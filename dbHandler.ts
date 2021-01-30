import * as fs from "fs";
import { MyFileHandler } from "./fileHandler";

export class MyDBModifier extends MyFileHandler {
  private metaStart: string = "<Flat DB of Sanyi's todo app>";
  private dataStart: string = "<TodoData>";
  private stringDB: string[];
  private dbMeta: string[];
  private dbData: string[];

  constructor(fileName: string) {
    //I WILL HAVE TO HANDLE empty readMeta, readData and check if file is DB file at all
    super(fileName);
    this.readToStringArrayDB();
    this.readMeta();
    this.readData();
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
    let content: string[] = fs
      .readFileSync(this.fullPath, "utf-8")
      .trim()
      .split("\n");
    this.stringDB = content;
  }

  private readMeta(): void {
    this.dbMeta = [];
    let isData: boolean = false;
    for (let i: number = 0; i < this.stringDB.length; i++) {
      if (this.stringDB[i] === this.dataStart) {
        break;
      } else {
        this.dbMeta.push(this.stringDB[i]);
      }
    }
  }

  private readData(): void {
    this.dbData = [];
    let isData: boolean = false;
    for (let i: number = 0; i < this.stringDB.length; i++) {
      if (isData) {
        this.dbData.push(this.stringDB[i]);
      } else if (this.stringDB[i] === this.dataStart) {
        isData = true;
      }
    }
  }

  public getDBData(): string[] {
    return this.dbData;
  }
}

/*************************WE SHOULD HAVE AN OPTION TO CREATE DB FROM NULL, NOT ONLY MODIFY IT. BUILD META, CREATE FILE */
