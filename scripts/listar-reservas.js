const {
  conectarBaseDatos,
  desconectarBaseDatos,
  mostrarErrorConexion,
} = require("../src/config/base-datos");
const { Reserva } = require("../src/modelos/reserva");

async function main() {
  try {
    await conectarBaseDatos();
    const reservas = await Reserva.find();
    console.log("Cantidad de reservas:", reservas.length);
    for (const reserva of reservas) {
      console.log("----------------------");
      console.log("ID:", reserva._id.toString());
      console.log("Estudiante:", reserva.estudiante);
      console.log("Email:", reserva.email);
      console.log("Sala:", reserva.sala);
      console.log("Fecha:", reserva.fecha);
      console.log("Turno:", reserva.turno);
      console.log("Personas:", reserva.personas);
    }
  } catch (error) {
    mostrarErrorConexion(error);
    process.exitCode = 1;
  } finally {
    await desconectarBaseDatos();
  }
}

main();
