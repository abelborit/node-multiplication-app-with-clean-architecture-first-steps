import fs from "fs";
import { SaveFile } from "./save-file.use-case";

describe("save-file.use-case.ts", () => {
  const argsValue = {
    fileContent: "test custom content",
    fileDestination: "outputs-2",
    fileName: "multiplication-table",
  };

  // afterEach(() => {
  //   /* después de cada test haremos un proceso de limpieza del archivo creado */
  //   fs.rmSync("outputs/multiplication-table.txt");
  //   fs.rmSync("outputs-2/multiplication-table.txt");
  // });

  test("should save file with default values", () => {
    const argsValue = { fileContent: "test content" };
    const fileDestination = "outputs";
    const fileName = "multiplication-table";

    const saveFileInstance = new SaveFile();
    const resultSaveFile = saveFileInstance.create(argsValue);

    const checkSaveFile = fs.existsSync(`${fileDestination}/${fileName}.txt`);
    const checkFileContent = fs.readFileSync(
      `${fileDestination}/${fileName}.txt`,
      { encoding: "utf-8" }
    );
    // console.log(checkSaveFile);
    // console.log(checkFileContent);

    expect(saveFileInstance).toBeInstanceOf(SaveFile);
    expect(resultSaveFile).toBe(true);
    expect(checkSaveFile).toBe(true);
    expect(checkFileContent).toBe(argsValue.fileContent);
  });

  test("should save file with custom values", () => {
    const saveFileInstance = new SaveFile();
    const resultSaveFile = saveFileInstance.create(argsValue);

    const checkSaveFile = fs.existsSync(
      `${argsValue.fileDestination}/${argsValue.fileName}.txt`
    );
    const checkFileContent = fs.readFileSync(
      `${argsValue.fileDestination}/${argsValue.fileName}.txt`,
      { encoding: "utf-8" }
    );
    // console.log(checkSaveFile);
    // console.log(checkFileContent);

    expect(resultSaveFile).toBe(true);
    expect(checkSaveFile).toBe(true);
    expect(checkFileContent).toBe(argsValue.fileContent);
  });

  test("should return false if directory could not be created", () => {
    /* en este test las pruebas pasarán pero aparecerá un mensaje de error porque nosotros lo estamos provocando aquí */
    const saveFileInstance = new SaveFile();

    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error(
        "This is a custom error message from testing (directory)"
      );
    });

    const resultSaveFile = saveFileInstance.create(argsValue);

    expect(resultSaveFile).toBe(false);

    /* para que al finalizar este test entonces se reestablezca el método que estamos espiando o mockeando para que no afecte a los test siguientes. Este mockRestore() nos dice que "Does everything that mockFn.mockReset() does, and also restores the original (non-mocked) implementation.
    This is useful when you want to mock functions in certain test cases and restore the original implementation in others." */
    mkdirSpy.mockRestore();
  });

  test("should return false if file could not be created", () => {
    /* en este test las pruebas pasarán pero aparecerá un mensaje de error porque nosotros lo estamos provocando aquí */
    const saveFileInstance = new SaveFile();

    const writeFileSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("This is a custom error message from testing (file)");
      });

    const resultSaveFile = saveFileInstance.create(argsValue);

    expect(resultSaveFile).toBe(false);

    writeFileSpy.mockRestore();
  });
});
