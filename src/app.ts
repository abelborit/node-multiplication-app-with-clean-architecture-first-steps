/* argv -> arguments value */
/* son los arguments values que se utilizaron para ejecutar la aplicación en este momento. Devuelve un array que contiene los argumentos de la línea de comandos pasados ​​cuando se inició el proceso Node.js. El primer elemento será Process.execPath. El segundo elemento será la ruta al archivo JavaScript que se está ejecutando. Los elementos restantes serán argumentos adicionales de la línea de comandos. */
// console.log(process.argv);

/* como ejemplo se podría colocar en la línea de comandos: node src/app.ts --base 100 --file="ejemplo.txt" y veremos que nos retorna un arreglo con las flags o banderas adicionales que le estamos colocando y esas son formas comunes de mandar argumentos */
// import { yargPlugin } from "./config/plugins/args.plugin";
// console.log(yargPlugin);

/* en node todo lo que se ejecuta en nuestro archivo principal app.ts o index.ts o el archivo principal en general, todo es síncrono. No se podría utilizar asincronía en nuestro root de la aplicación. Por ejemplo si trabajamos con una dependencia de terceros y esa dependencia trabaja de forma asíncrona o sino que queremos trabajar esperando una respuesta de alguna petición http y traer la data de algún otro lugar. Para eso podemos usar las funciones anónimas autoinvocadas */

/* EJEMPLO 1 */
// (() => {
//   console.log("render");
// })();

/* EJEMPLO 2 (se puede hacer de otras formas pero verlo así es algo común) */
// (async () => {
//   await main();
// })();

// async function main() {
//   console.log("Main Ejecutado");
// }

import { yargPlugin } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";

(async () => {
  await main();
})();

async function main() {
  const {
    base,
    limit,
    show: showTable,
    fileDestination,
    fileName,
  } = yargPlugin;

  /* si por ejemplo en server-app.ts no se utilizara static run(......) entonces se tendría primero que instanciar la clase como "const run = new ServerApp().run" para poder utilizar método run, pero en este caso solo se llama al método sin instanciar la clase */
  ServerApp.run({ base, limit, showTable, fileDestination, fileName });
}
