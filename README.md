# Node & TypeScript - Node Multiplication App with Clean Architecture (first steps)

---

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

**PARTE I:**

Esta sección veremos conceptos de Node como Argv (Argument Values) y vamos a introducir el concepto de la arquitectura limpia: UseCases

- Aplicaciones de consola
- Argumentos de consola
  - Recibir argumentos
  - Procesar argumentos
  - Si no recibimos un argumento entonces realizar una acción
- Funciones asíncronas auto-invocadas
- Banderas y opciones
- Yargs
- Configuración de Yargs
- Instalación de dependencias
- Versión específica
- Versión futura
- Versión actual
- Clean Architecture (first steps)
  - Casos de Uso (use cases)

**PARTE II:**

Esta sección de testing, tiene por objetivo probar todo lo visto hasta el momento.

- Pruebas sobre comandos de consola
- Cambiar dinámicamente los argumentos de consola
- Mocks
- Spies (espías)
- Mocks y Spies con retornos personalizados
- Pruebas cuando se esperan errores
- Pruebas de Casos de Uso
- Pruebas de integración
- Pruebas con funciones asíncronas anónimas auto-invocadas
- Pruebas con yargs
- Pruebas con creación de archivos y directorios

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- _yargs_: `https://www.npmjs.com/package/yargs`

  - Usando `npm i yargs`
  - Si se trabaja con typescript entonces colocar `npm i @types/yargs --save-dev`

- ejemplo

- ejemplo

### \* NOTAS:

- ¿Cuándo se debería usar clases y cuando factory function?

  - La elección entre uno y otro depende del contexto y los requisitos del problema que se está tratando de resolver.

    - Se debería usar clases cuando:

      - Se necesita crear múltiples objetos con la misma estructura y comportamiento.
      - Se quiere aprovechar la herencia y el polimorfismo.
      - Se prefiere una sintaxis más familiar y similar a la programación orientada a objetos tradicional.

    - Se debería usar factory functions cuando:

      - Se necesita crear objetos con diferentes estructuras o comportamientos.
      - Se quiere evitar el uso de la palabra clave new y la sintaxis de clases, o crear objetos sin estado interno.
      - Se prefiere un enfoque más funcional y flexible.

- ejemplo
- ejemplo

---
