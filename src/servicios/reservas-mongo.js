const mongoose = require("mongoose");
const { Reserva } = require("../modelos/reserva");

// MongoDB usa _id; la página y la API necesitan id como texto.
function representar(documento) {
  return {
    id: documento._id.toString(),
    estudiante: documento.estudiante,
    email: documento.email,
    sala: documento.sala,
    fecha: documento.fecha,
    turno: documento.turno,
    personas: documento.personas,
    estado: documento.estado,
  };
}

function crearServicioReservasMongo() {
  async function listarReservas(sala) {
    const filtro = {};
    if (sala !== undefined) {
      if (typeof sala !== "string" || !sala.trim()) {
        const error = new Error("Sala inválida");
        error.codigo = "FILTRO_INVALIDO";
        throw error;
      }
      filtro.sala = sala; // Igualdad exacta, sin operadores enviados por el cliente.
    }
    const documentos = await Reserva.find(filtro).lean();
    return documentos.map(representar);
  }

  async function contarReservas() {
    return Reserva.countDocuments();
  }

  async function buscarReservaPorId(id) {
    if (!mongoose.isObjectIdOrHexString(id)) {
      const error = new Error("ID inválido");
      error.codigo = "ID_INVALIDO";
      throw error;
    }
    const documento = await Reserva.findById(id).lean();
    return documento ? representar(documento) : null;
  }

  async function crearReserva(datos) {
    // No aceptamos estado ni _id del usuario.
    const documento = await Reserva.create({
      estudiante: datos.estudiante,
      email: datos.email,
      sala: datos.sala,
      fecha: datos.fecha,
      turno: datos.turno,
      personas: datos.personas,
    });
    return representar(documento);
  }

  return { listarReservas, contarReservas, buscarReservaPorId, crearReserva };
}

module.exports = { crearServicioReservasMongo };
