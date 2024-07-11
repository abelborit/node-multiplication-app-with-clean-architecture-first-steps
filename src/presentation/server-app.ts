import { CreateTable } from "../domain/use-cases/create-table.use-case";

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

    const table = new CreateTable().create({ base, limit });

    if (showTable) console.log(table);
  }
}
