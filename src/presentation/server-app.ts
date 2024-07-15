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
  /* static para no inicializar mi clase y que se llame de manera estática. Los métodos estáticos son métodos que pertenecen a la clase en sí y no a las instancias de la clase. No se necesita crear una instancia de la clase para usarlos. Se utilizan comúnmente para funciones que son relevantes a la clase en general, y no a una instancia específica porque cuando se instancia una clase se crea un objeto a partir de esa clase y cada objeto instanciado tiene su propia copia de las propiedades de instancia y puede utilizar los métodos de instancia definidos en la clase */
  static run({
    base,
    limit,
    showTable,
    fileDestination,
    fileName,
  }: RunOptions) {
    console.log("Server running...\n");
    // console.log({ base, limit, showTable, fileDestination, fileName });

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
