const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const path = require("node:path");
const {
  crearIdentificadorSolicitud,
  medirDuracion,
} = require("./middleware/solicitudes");
const { crearRouterReservas } = require("./rutas/reservas");
const { crearRouterReservasApi } = require("./rutas/reservas-api");
const { crearControladorReservas } = require("./controladores/reservas");
const { crearManejadorErrores } = require("./middleware/errores");

function crearApp({ servicioReservas, formatoRegistro }) {
  const app = express();
  const controlador = crearControladorReservas(servicioReservas);
  app.use(morgan(formatoRegistro));
  app.use(crearIdentificadorSolicitud());
  app.use(medirDuracion);
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("layout", "layouts/main");
  app.use(expressLayouts);
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.get("/", controlador.mostrarInicio);
  app.get("/estado", controlador.mostrarEstado);
  app.use("/api/reservas", crearRouterReservasApi(controlador));
  app.use("/reservas", crearRouterReservas(controlador));
  app.use((req, res) => {
    if (req.path.startsWith("/api/"))
      return res.status(404).json({ error: "Ruta no encontrada." });
    res.status(404).render("no-encontrado", {
      titulo: "Página no encontrada",
      mensaje: "La dirección solicitada no existe.",
    });
  });
  app.use(crearManejadorErrores());
  return app;
}
module.exports = { crearApp };
