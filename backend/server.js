const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configurar la conexión a la base de datos
const dbConfig = {
  host: 'mysql_host', // El nombre del servicio MySQL en docker-compose.yml
  user: 'admin',
  password: '1234',
  database: 'registro',
};

let connection;

// Función para conectar a la base de datos con manejo de reconexión
function handleConnection() {
  connection = mysql.createConnection({
		host: dbConfig.host,
		user: dbConfig.user,
		password: dbConfig.password,
		database: dbConfig.database,
		multipleStatements: true
	});

  connection.connect((err) => {
    if (err) {
      console.error('Error conectando a la base de datos:', err);
      setTimeout(handleConnection, 2000); // Reintenta la conexión después de 2 segundos
    } else {
      console.log('Conectado a la base de datos');
    }
  });

  connection.on('error', (err) => {
    console.error('Error en la conexión a MySQL:', err);

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Intentando reconectar...');
      handleConnection(); // Reconectar automáticamente si la conexión se pierde
    } else {
      throw err;
    }
  });
}

handleConnection();

module.exports = connection;

// Endpoint para registrar un usuario
app.post("/usuarios", (req, res) => {
    const { nombre, correo, edad } = req.body;

    const query = "INSERT INTO usuarios (nombre, correo, edad) VALUES (?, ?, ?)";
    connection.query(query, [nombre, correo, edad], (err, result) => {
        if (err) {
            console.error("Error al insertar datos:", err);
            res.status(500).send("Error al registrar el usuario");
            return;
        }
        res.status(200).send("Usuario registrado exitosamente");
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
