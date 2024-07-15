/* para probar aplicaciones de consola sin estar bajando y levantando el testing en cada momento para colocar en la terminal las flags necesarias */
const runCommand = async (args: string[]) => {
  /* modificar los argv del process con los que ya tiene y los nuevos que yo necesito para mi test */
  process.argv = [...process.argv, ...args];

  /* importar de manera dinámica este archivo porque ahora como ya están establecidos los nuevos valores en el process.argv entonces recién se puede llamar al args.plugin.ts porque sino daría un error porque no hay los flags que necesito */
  const { yargPlugin } = await import("./args.plugin");

  return yargPlugin;
};

describe("args.plugin.ts", () => {
  const originalArgv = process.argv;

  /* para que antes de cada test el process.argv vuelva a su estado original y se puedan pasar los nuevos flags correspondientes a cada test según necesite y no estén sumándose más y más flags en cada test */
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test("should return default values", async () => {
    /* hay que mandarle la base porque es un valor requerido, si no se manda entonces dará un error que no se puede parsear, es decir, no pudo hacer el .parseSync(); */
    const argv = await runCommand(["-b", "5"]);

    // console.log(process.argv);
    // console.log(argv);

    /* se coloca así para que al menso contenga esas propiedades que estoy usando, también se pueden colocar las abreviaturas */
    expect(argv).toEqual(
      expect.objectContaining({
        base: 5,
        limit: 10,
        show: false,
        fileName: "multiplication-table",
        fileDestination: "outputs",
      })
    );
  });

  test("should return configuration with custom values", async () => {
    const argv = await runCommand([
      "-b",
      "6",
      "-l",
      "20",
      "-s",
      "--fileName",
      "custom-name",
      "--fileDestination",
      "custom-dir",
    ]);

    // console.log(argv);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 6,
        base: 6,
        l: 20,
        limit: 20,
        s: true,
        show: true,
        fileName: "custom-name",
        fn: "custom-name",
        fileDestination: "custom-dir",
        fd: "custom-dir",
      })
    );
  });
});
