import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  fileDestination: string;
  fileName: string;
}

/* clase para mantener estructurada la lógica de mi servidor */
export class ServerApp {
  /* static para no inicializar mi clase y que se llame de manera estática */
  static run({
    base,
    limit,
    showTable,
    fileDestination,
    fileName,
  }: RunOptions) {
    console.log("Server running...\n");
    console.log({    base,
      limit,
      showTable,
      fileDestination,
      fileName,});
    

    const dataTable = new CreateTable().create({ base, limit });
    // const wasFileCreated = new SaveFile().create({ fileContent: dataTable });

    const wasFileCreated = new SaveFile().create({
      fileContent: dataTable,
      fileDestination,
      fileName,
    });

    if (showTable) console.log(dataTable);

    wasFileCreated
      ? console.log("File created! ✅")
      : console.log("File not created! ❌");
  }
}
