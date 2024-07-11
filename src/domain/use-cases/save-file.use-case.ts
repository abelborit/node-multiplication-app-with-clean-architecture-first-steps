import fs from "fs";

export interface SaveFileUseCase {
  create: (options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() {}

  create({
    fileContent,
    fileDestination = "outputs",
    fileName = "multiplication-table",
  }: SaveFileOptions): boolean {
    try {
      /* { recursive: true } para que si hay por ejemplo outputs/folder-1/folder-2/..... se vaya creando por cada folder */
      fs.mkdirSync(fileDestination, { recursive: true });
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }
}
