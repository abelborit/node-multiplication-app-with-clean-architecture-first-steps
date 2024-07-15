/* FORMA 1: al hacerlo de esta forma ya funcionaría normal la importación del app.ts porque como este archivo de test se resuelve de forma síncrona (instrucción por instrucción) entonces primero estamos modificando el process.argv para luego al solo importar el app.ts ya tenga los argv */
// process.argv = ["node", "app.ts", "-b", "10"];
// import "./app";

import { ServerApp } from "./presentation/server-app";

describe("app.ts", () => {
  test("should call ServerApp.run with values", async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;

    process.argv = [
      ...process.argv,
      "-b",
      "6",
      "-l",
      "5",
      "-s",
      "--fileName",
      "custom-name-2",
      "--fileDestination",
      "custom-dir-2",
    ];

    await import("./app");

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 6,
      limit: 5,
      showTable: true,
      fileName: "custom-name-2",
      fileDestination: "custom-dir-2",
    });
  });
});
