#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

/* se puede usar .parseSync() o .parse() según sea necesario pero lo haremos con .parseSync() para que sea un proceso síncrono */
/* hideBin(...) para ocultar los path que vienen en process.argv */
export const yargPlugin = yargs(hideBin(process.argv))
  .option("base", {
    alias: "b",
    type: "number",
    demandOption: true,
    description: "Multiplication Table Base",
  })
  .option("limit", {
    alias: "l",
    type: "number",
    default: 10,
    description: "Multiplication Table Limit",
  })
  .option("show", {
    alias: "s",
    type: "boolean",
    default: false,
    description: "Show Multiplication Table",
  })
  .parseSync();

// yargs(hideBin(process.argv))
//   .command('serve [port]', 'start the server', (yargs) => {
//     return yargs
//       .positional('port', {
//         describe: 'port to bind on',
//         default: 5000
//       })
//   }, (argv) => {
//     if (argv.verbose) console.info(`start server on :${argv.port}`)
//     serve(argv.port)
//   })
//   .option('verbose', {
//     alias: 'v',
//     type: 'boolean',
//     description: 'Run with verbose logging'
//   })
//   .parse()
