import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from "./server-app";

describe("server-app.ts", () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false, // false y true
    fileDestination: "outputs-test-fileDestination",
    fileName: "test-fileName",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create ServerApp instance", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("should run ServerApp with options (integration test)", () => {
    /* espiar las funciones porque estas ya fueron probadas entonces ahora solo queremos espiarlas para ver si se llamaron cuántas veces, con qué valores, pero ya no testearlas otra vez */
    const logSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "create");
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "create");

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(2); // 2 y 3
    expect(logSpy).toHaveBeenCalledWith("Server running...\n");
    expect(logSpy).toHaveBeenLastCalledWith("File created! ✅");

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      // fileContent: expect.any(String),
      fileContent: createTableSpy.mock.results[0].value,
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
  });

  test("should run ServerApp with options (atomic test)", () => {
    /* valor de retorno para la función mockeada */
    const returnValueCreateTableMock = "1 x 2 = 2";

    /* esto de jest.fn() son similares a los espías que nos sirven para poder saber si se llamó la función y cuantas veces, con qué valores, etc. Aquí con el jest.fn() es un poco más sencillo también de usar y de limpiar antes de cada prueba */
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createTableMock = jest
      .fn()
      .mockReturnValue(returnValueCreateTableMock); // se coloca un valor de retorno mockeado porque al ser una función y no tener un valor de retorno entonces nos regresa un undefined
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.create = createTableMock;
    SaveFile.prototype.create = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server running...\n");
    expect(createTableMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: returnValueCreateTableMock,
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
    expect(logMock).toHaveBeenCalledWith("File created! ✅");
    expect(logErrorMock).not.toHaveBeenCalledWith();
  });
});

/* Un Mock es una simulación de un objeto o función que te permite definir su comportamiento durante una prueba. Por ejemplo, puedes hacer que una función devuelva un valor específico o que lance un error. En este caso, createMock y saveFileMock son ejemplos de mocks.

Por otro lado, el SpyOn se utiliza para rastrear las llamadas a una función, permitiéndote verificar cuántas veces se llamó a una función, con qué argumentos se llamó, etc. En este caso, el logSpy, createTableSpy y saveFileSpy son ejemplos de spies.

La elección entre usar un Mock o un SpyOn depende de lo que necesites probar. Si necesitas controlar el comportamiento de una función y no te importa cómo se llama, entonces ahí deberías escoger un Mock. Si necesitas verificar cómo se llama a una función, como cuántas veces se llama o con qué argumentos, entonces debes usar SpyOn. */
