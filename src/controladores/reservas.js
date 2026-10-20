function crearControladorReservas(servicioReservas) {
  function mostrarInicio(req, res) {
    res.render("inicio", { titulo: "Reservas de salas de estudio" });
  }

  async function mostrarEstado(req, res) {
    res.json({
      servicio: "activo",
      reservas: await servicioReservas.contarReservas(),
      solicitudId: res.locals.solicitudId,
    });
  }

  async function listar(req, res) {
    const reservas = await servicioReservas.listarReservas();
    res.render("reservas/lista", { titulo: "Reservas", reservas });
  }

  function mostrarFormulario(req, res) {
    res.render("reservas/nueva", {
      titulo: "Nueva reserva",
      error: null,
      valores: {},
    });
  }

  async function mostrarDetalle(req, res) {
    const reserva = await servicioReservas.buscarReservaPorId(req.params.id);
    if (!reserva) {
      return res.status(404).render("no-encontrado", {
        titulo: "Reserva no encontrada",
        mensaje: "No existe una reserva con ese identificador.",
      });
    }
    res.render("reservas/detalle", { titulo: "Detalle de reserva", reserva });
  }

  async function crear(req, res) {
    await servicioReservas.crearReserva(req.reservaValidada);
    res.redirect("/reservas");
  }

  async function listarApi(req, res) {
    const reservas = await servicioReservas.listarReservas(req.query.sala);
    res.json(reservas);
  }

  async function obtenerApi(req, res) {
    const reserva = await servicioReservas.buscarReservaPorId(req.params.id);
    if (!reserva)
      return res.status(404).json({ error: "Reserva no encontrada." });
    res.json(reserva);
  }

  async function crearApi(req, res) {
    const reserva = await servicioReservas.crearReserva(req.reservaValidada);
    res.location(`/api/reservas/${reserva.id}`).status(201).json(reserva);
  }

  return {
    mostrarInicio,
    mostrarEstado,
    listar,
    mostrarFormulario,
    mostrarDetalle,
    crear,
    listarApi,
    obtenerApi,
    crearApi,
  };
}

module.exports = { crearControladorReservas };
