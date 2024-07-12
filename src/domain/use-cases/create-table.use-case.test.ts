import { CreateTable } from "./create-table.use-case";

describe("create-table.use-case.ts", () => {
  test("should create table with default values", () => {
    const argsValue = { base: 2 };

    const createTableInstance = new CreateTable();
    const dataTable = new CreateTable().create(argsValue);
    // console.log(dataTable);
    const rowsTable = dataTable.split("\n").length;
    // console.log(rowsTable);

    expect(createTableInstance).toBeInstanceOf(CreateTable);
    expect(dataTable).toContain("2 x 1 = 2");
    expect(dataTable).toContain("2 x 10 = 20");
    // expect(rowsTable).toBe(argsValue.limit + 1); // se coloca el argsValue.limit + 1 porque como al crear cada fila en el ciclo for estamos colocando un salto de línea "\n" para poder dividir cada respuesta, entonces en la última iteración se creará ese salto de línea adicional
    expect(rowsTable).toBe(10); // para solucionar lo anterior (que puede ser tal vez un comportamiento que nosotros queremos tener) se puede modificar el código de create-table.use-case.ts
  });

  test("should create table with custom values", () => {
    const argsValue = { base: 2, limit: 5 };

    const dataTable = new CreateTable().create(argsValue);
    const rowsTable = dataTable.split("\n").length;

    expect(dataTable).toContain("2 x 1 = 2");
    expect(dataTable).toContain("2 x 5 = 10");
    expect(dataTable).not.toContain("2 x 6 = 12");
    expect(rowsTable).toBe(argsValue.limit);
  });

  test('should the "create" method have been called with custom values', () => {
    const argsValue = { base: 2, limit: 5 };

    /* Crear un spy para el método create de la instancia de CreateTable */
    const createTableSpy = jest.spyOn(CreateTable.prototype, "create");
    /* para llamar al menos una vez a la clase o instancia de nuestra clase y que funcione el test, porque si no entonces aparece que no se ha llamado ninguna vez */
    new CreateTable().create(argsValue);

    expect(createTableSpy).toHaveBeenCalledWith(argsValue);

    /* Limpiar el spy después del test */
    createTableSpy.mockRestore();
  });
});
