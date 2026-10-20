const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
const turnosPermitidos = ["Mañana", "Tarde", "Noche"];

function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Reservas de salas";
  next();
}

function validarReserva(req, res, next) {
  const valores = req.body ?? {};
  const texto = (valor) => (typeof valor === "string" ? valor.trim() : "");
  const estudiante = texto(valores.estudiante);
  const email = texto(valores.email);
  const sala = texto(valores.sala);
  const fecha = texto(valores.fecha);
  const turno = texto(valores.turno);
  const recibido = valores.personas;
  const tipoValido =
    typeof recibido === "number" ||
    (typeof recibido === "string" && recibido.trim() !== "");
  const personas = tipoValido ? Number(recibido) : NaN;

  const incorrecto =
    !estudiante ||
    !email.includes("@") ||
    !salasPermitidas.includes(sala) ||
    !fecha ||
    !turnosPermitidos.includes(turno) ||
    !Number.isInteger(personas) ||
    personas < 1 ||
    personas > 6;
  if (incorrecto) {
    const mensaje = "Completá todos los campos con valores válidos.";
    if (req.baseUrl === "/api/reservas") {
      return res.status(400).json({ error: mensaje });
    }
    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva reserva",
      error: mensaje,
      valores,
    });
  }
  req.reservaValidada = { estudiante, email, sala, fecha, turno, personas };
  next();
}

module.exports = { prepararAreaReservas, validarReserva };
