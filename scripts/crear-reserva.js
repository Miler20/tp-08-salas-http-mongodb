const {
  conectarBaseDatos,
  desconectarBaseDatos,
  mostrarErrorConexion,
} = require("../src/config/base-datos");
const { Reserva } = require("../src/modelos/reserva");

// Para las pruebas se puede cambiar un dato por vez y después restaurarlo.
const datosReserva = {
  estudiante: "Ana Ejemplo",
  email: "ana@example.com",
  sala: "Sala Norte",
  fecha: "2026-10-21",
  turno: "Mañana",
  personas: 2,
};

async function main() {
  try {
    await conectarBaseDatos();
    // create espera a que MongoDB guarde la reserva.
    const reservaGuardada = await Reserva.create(datosReserva);
    console.log("Reserva guardada correctamente.");
    console.log("ID:", reservaGuardada._id.toString());
  } catch (error) {
    if (error.name === "ValidationError") {
      console.error("Hay datos inválidos en la reserva.");
      console.error("Revisar:", Object.keys(error.errors).join(", "));
    } else if (error.name === "CastError") {
      console.error("Un dato tiene un tipo incorrecto:", error.path);
    } else {
      mostrarErrorConexion(error);
    }
    process.exitCode = 1;
  } finally {
    await desconectarBaseDatos();
  }
}

main();
