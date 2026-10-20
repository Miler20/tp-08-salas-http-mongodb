const {
  conectarBaseDatos,
  desconectarBaseDatos,
  mostrarErrorConexion,
} = require("../src/config/base-datos");

async function main() {
  try {
    await conectarBaseDatos();
    console.log("Conexión con MongoDB realizada correctamente.");
  } catch (error) {
    mostrarErrorConexion(error);
    process.exitCode = 1;
  } finally {
    await desconectarBaseDatos();
  }
}

main();
