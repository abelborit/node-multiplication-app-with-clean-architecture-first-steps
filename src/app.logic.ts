import fs from "fs";
import { yargPlugin } from "./config/plugins/args.plugin";

const { base, limit, show: showTable } = yargPlugin;

let outputMessage = "";
const headerMessage = `
================================
        Tabla del ${base}
================================\n
`;

for (let i = 1; i <= limit; i++) {
  outputMessage += `${base} x ${i} = ${base * i}\n`;
}

outputMessage = headerMessage + outputMessage;

const outputFolderPath = `outputs`;
const outputFilePath = `tabla-${base}.txt`;

/* { recursive: true } para que si hay por ejemplo outputs/folder-1/folder-2/..... se vaya creando por cada folder */
fs.mkdirSync(outputFolderPath, { recursive: true });
fs.writeFileSync(`${outputFolderPath}/${outputFilePath}`, outputMessage);

if (showTable) console.log(outputMessage);
console.log("File created!");

/* para probar se puede colocar en la terminal "npx ts-node .\src\app.logic.ts -b 10 -l 10 -s" o sino modificar el package.json y colocarlo en el "dev: ......." */
