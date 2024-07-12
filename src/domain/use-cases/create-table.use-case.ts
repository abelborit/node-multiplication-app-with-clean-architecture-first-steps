/* si trabajáramos en JavaScript propiamente, también se podrían hacer clases pero al trabajar con JavaScript y se quiere implementar alguna arquitectura, entonces se usan más los Factory Function para poder inyectar las dependencias mediante la función, pero en este caso lo haremos mediante una clase y su constructor el cual este es el primer método que se va a llamar cuando creemos una instancia de nuestra clase */

export interface CreateTableUseCase {
  /* reglas de negocio que quiero forzar a que mi clase implemente */
  create: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  /* en este ejercicio no tendrá ninguna razón de existir el constructor pero al solo declararlo nos permite hacer un paso muy importante en la reutilización de todo el código y en su flexibilidad, lo cual es la DI (Dependencies Injection - Inyección de Dependencias) en donde vamos a poder pasarle a este caso de uso la forma cómo queremos que cree la data que vamos a terminar de mandarle a un archivo basado en dependencias externas */
  constructor() {
    /* inyección de dependencias */
  }

  create({ base, limit = 10 }: CreateTableOptions) {
    let outputMessage = "";

    for (let i = 1; i <= limit; i++) {
      outputMessage += `${base} x ${i} = ${base * i}`;

      /* para solucionar el último salto de línea de la última iteración */
      if (i < limit) outputMessage += "\n";
    }

    return outputMessage;
  }
}
