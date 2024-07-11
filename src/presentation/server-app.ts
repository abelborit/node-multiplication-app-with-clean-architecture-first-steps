import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
}

/* clase para mantener estructurada la lógica de mi servidor */
export class ServerApp {
  /* static para no inicializar mi clase y que se llame de manera estática */
  static run({ base, limit, showTable }: RunOptions) {
    console.log("Server running...\n");

    const dataTable = new CreateTable().create({ base, limit });
    // const wasFileCreated = new SaveFile().create({ fileContent: dataTable });

    const wasFileCreated = new SaveFile().create({
      fileContent: dataTable,
      fileDestination: "outputs",
      fileName: `tabla-${base}`,
    });

    if (showTable) console.log(dataTable);

    wasFileCreated
      ? console.log("File created! ✅")
      : console.log("File not created! ❌");
  }
}
