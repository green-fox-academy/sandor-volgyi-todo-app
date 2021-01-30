import * as fs from "fs";

export abstract class MyFileHandler {
  protected fileName: string;
  protected fullPath: string;

  constructor(fileName: string) {
    this.fileName = fileName;
    this.fullPath = this.returnFullFilePath();
    console.log(this.fileName, this.fullPath);
  }

  private returnFullFilePath() {
    return __dirname + "/todofiles/" + this.fileName;
  }

  /************************************ */
  /************WRITE BETTER THROWS????? HANDLE ERRORS SOMEWHERE!!!!!!!!!!!!!!!!!!!!!!!!!!! */
  /******************************************** */

  //Check if the provided file is a TXT file. If not, throw an error.
  static isTextFile(fileName: string): boolean {
    let isTextFile: boolean;
    if (fileName.split(".").pop() === "txt") {
      isTextFile = true;
    } else {
      isTextFile = false;
    }
    return isTextFile;
  }

  //check if path is readable
  static isReadAble(path: string): boolean {
    let isReadAble: boolean;
    try {
      fs.accessSync(path, fs.constants.R_OK);
      isReadAble = true;
    } catch (error) {
      isReadAble = false;
    }
    return isReadAble;
  }

  //check if path is writable
  static isWriteAble(path: string): boolean {
    let isWriteAble: boolean;
    try {
      fs.accessSync(path, fs.constants.W_OK);
      isWriteAble = true;
    } catch (error) {
      isWriteAble = false;
    }
    return isWriteAble;
  }

  //check if path exists
  static doesExist(path: string): boolean {
    let existsOrNot: boolean = false;
    if (fs.existsSync(path)) {
      existsOrNot = true;
    } else {
      existsOrNot = false;
    }
    return existsOrNot;
  }
}

/*console.log(__dirname);*/
