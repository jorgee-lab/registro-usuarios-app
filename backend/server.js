const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración DB
const dbConfig = {
  host: 'mysql_host',
  user: 'admin',
  password: '1234',
  database: 'registro',
};

let connection;

// 🔁 Nueva función con retry limpio
function connectWithRetry() {
  return new Promise((resolve) => {
    console.log("Intentando conectar a MySQL...");

    const conn = mysql.createConnection(dbConfig);

    conn.connect((err) => {
      if (err) {
        console.error("MySQL no está listo, reintentando en 3s...");
        setTimeout(() => resolve(connectWithRetry()), 3000);
      } else {
        console.log("✅ Conectado a MySQL");
        resolve(conn);
      }
    });
  });
}

// 🚀 Arranque controlado
async function startServer() {
  connection = await connectWithRetry();

  connection.on('error', async (err) => {
    console.error('Error en MySQL:', err);

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Reconectando...');
      connection = await connectWithRetry();
    } else {
      throw err;
    }
  });

  // Endpoint para registrar usuario
  app.post("/usuarios", (req, res) => {
  const { nombre, correo, edad } = req.body;

  const query = "INSERT INTO usuarios (nombre, correo, edad) VALUES (?, ?, ?)";

  connection.query(query, [nombre, correo, edad], (err, result) => {

    console.log("RESULT:", result);
    console.log("ERROR:", err);

    if (err) {
      return res.status(500).json({ mensaje: "Error real", error: err });
    }

    return res.status(200).json({
      mensaje: "OK",
      id: result.insertId
    });
  });
});

  // Obtener usuarios
  app.get("/usuarios", (req, res) => {
    connection.query("SELECT * FROM usuarios", (err, results) => {
      if (err) {
        console.error("Error al obtener usuarios:", err);
        return res.status(500).send("Error al obtener usuarios");
      }
      res.json(results);
    });
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

// 🔥 Punto de entrada real
startServer();