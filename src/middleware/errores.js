function crearManejadorErrores() {
  return function manejarErrores(error, req, res, next) {
    if (res.headersSent) return next(error);
    const esValidacion =
      error.name === "ValidationError" || error.name === "CastError";
    const esEntrada =
      esValidacion ||
      error.codigo === "ID_INVALIDO" ||
      error.codigo === "FILTRO_INVALIDO" ||
      error.type === "entity.parse.failed";
    const estado = esEntrada ? 400 : 500;
    const mensaje = esEntrada
      ? "Revisá los datos enviados."
      : "No se pudo completar la operación.";
    console.error("Solicitud fallida:", error.name); // No imprimir URI ni contraseña.
    if (req.path.startsWith("/api/") || req.baseUrl.startsWith("/api/")) {
      return res.status(estado).json({
        error: mensaje,
        campos:
          error.name === "ValidationError" ? Object.keys(error.errors) : [],
      });
    }
    if (esEntrada && req.method === "POST" && req.path === "/reservas") {
      return res.status(400).render("reservas/nueva", {
        titulo: "Nueva reserva",
        error: mensaje,
        valores: req.body ?? {},
      });
    }
    res.status(estado).render("no-encontrado", {
      titulo: esEntrada ? "Solicitud inválida" : "Error del servidor",
      mensaje,
    });
  };
}
module.exports = { crearManejadorErrores };
