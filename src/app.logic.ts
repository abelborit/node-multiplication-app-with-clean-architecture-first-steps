import fs from "fs";

let outputMessage = "";
const base = 5;
const headerMessage = `
================================
        Tabla del ${base}
================================\n
`;

for (let i = 1; i <= 10; i++) {
  outputMessage += `${base} x ${i} = ${base * i}\n`;
}

outputMessage = headerMessage + outputMessage;
// console.log(outputMessage);

const outputFolderPath = `outputs`;
const outputFilePath = `tabla-${base}.txt`;

/* { recursive: true } para que si hay por ejemplo outputs/folder-1/folder-2/..... se vaya creando por cada folder */
fs.mkdirSync(outputFolderPath, { recursive: true });
fs.writeFileSync(`${outputFolderPath}/${outputFilePath}`, outputMessage);
console.log("File created!");
