const dns = require("node:dns");
const mongoose = require("mongoose");
const { leerUriMongo } = require("./entorno");

// Resolutores DNS usados en clase. Si la red los bloquea, consultar al docente.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function conectarBaseDatos() {
  const uri = leerUriMongo();
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
}

async function desconectarBaseDatos() {
  await mongoose.disconnect();
}

// Mostramos información útil sin imprimir la contraseña ni la URI.
function mostrarErrorConexion(error) {
  console.error("No se pudo conectar con MongoDB.");
  console.error("Tipo de error:", error.name);
  const causa = error.reason?.servers
    ? [...error.reason.servers.values()][0]?.error
    : error.cause;
  const detalle = causa || error;
  if (detalle.code) console.error("Código:", detalle.code);
  if (detalle.syscall) console.error("Operación:", detalle.syscall);
  console.error("Revisar MONGODB_URI, DNS, usuario, clave e IP permitida.");
}

module.exports = {
  conectarBaseDatos,
  desconectarBaseDatos,
  mostrarErrorConexion,
};
