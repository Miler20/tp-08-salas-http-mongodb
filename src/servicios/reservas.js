// Este módulo solo conoce los datos; no usa req, res, EJS ni estados HTTP.
function crearServicioReservas(datosIniciales) {
  const reservas = datosIniciales.map((reserva) => ({ ...reserva }));

  function listarReservas() {
    return reservas;
  }

  function contarReservas() {
    return reservas.length;
  }

  function buscarReservaPorId(id) {
    return reservas.find((reserva) => reserva.id === id);
  }

  function crearReserva(datosValidados) {
    const ultimoId = reservas.reduce(
      (mayorId, reserva) => Math.max(mayorId, reserva.id),
      0,
    );
    const nuevaReserva = { id: ultimoId + 1, ...datosValidados };
    reservas.push(nuevaReserva);
    return nuevaReserva;
  }

  return { listarReservas, contarReservas, buscarReservaPorId, crearReserva };
}

module.exports = { crearServicioReservas };
