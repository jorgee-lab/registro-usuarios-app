# Proyecto Registro de Usuarios con Docker, Node.js y MySQL

Este proyecto es una aplicación web simple que permite registrar usuarios y almacenar sus datos en una base de datos MySQL, todo orquestado con Docker y Docker Compose para facilitar el despliegue y desarrollo.

---

## 📂 Estructura del proyecto

registro-usuarios/
├── backend/
│ ├── Dockerfile
│ ├── package.json
│ ├── server.js
│ └── wait-for-it.sh
├── frontend/
│ ├── Dockerfile
│ └── ...
├── mysql/
│ ├── init.sql
│ └── my.cnf (opcional)
├── docker-compose.yml
└── README.md

---

## ⚙️ Tecnologías utilizadas

- **Node.js**: Backend con Express para API REST.
- **MySQL 8.0**: Base de datos relacional para almacenar usuarios.
- **Docker & Docker Compose**: Contenerización y orquestación.
- **wait-for-it.sh**: Script para esperar que MySQL esté listo antes de arrancar el backend.
- **Nginx** : Servidor web para frontend.

---

## 🚀 Cómo levantar el proyecto

### Requisitos previos

- Docker Desktop instalado y corriendo.
- Git (opcional para clonar este repositorio).

---

### Pasos

1. Clonar el repositorio (si aplica):

`git clone https://github.com/tu_usuario/registro-usuarios.git`\
`cd registro-usuarios`

2. Construir y levantar los contenedores:

`docker-compose up --build`

Esto hará:

- Levantar MySQL con base de datos y tabla inicializadas mediante mysql/init.sql.

- Levantar backend Node.js, que espera a que MySQL esté listo usando wait-for-it.sh.

- Levantar frontend 

3. Acceder a la aplicación

- Backend escuchando en: http://localhost:3000

- Frontend escuchando en y se puede acceder a traves de un navegador web: http://localhost:8080

 ## Detalles técnicos importantes

 **Backend**\
Se conecta a MySQL usando credenciales definidas en docker-compose.yml (usuario admin, password 1234).

Implementa reconexión automática si la conexión a MySQL se pierde.

Expone un endpoint POST /usuarios para registrar nuevos usuarios con campos: nombre, correo, edad.

**MySQL**

Inicializa la base de datos y tabla con el script mysql/init.sql.

Crea usuarios con los permisos adecuados.

Configurado para usar autenticación mysql_native_password.

**Orquestación con Docker Compose**

Los servicios están definidos en docker-compose.yml:

mysql_host: Base de datos MySQL.

registro_backend: Backend Node.js.

registro_frontend: Frontend (opcional).

El backend espera a que MySQL esté listo mediante el script wait-for-it.sh incluido en la imagen.

## Comandos útiles
Parar y borrar contenedores, redes y volúmenes:


`docker-compose down -v --remove-orphans`

Forzar reconstrucción sin usar cache:

`docker-compose build --no-cache`

Ver logs del backend:

`docker logs registro_backend`

Entrar a la consola MySQL en el contenedor:

`docker exec -it mysql_host mysql -u admin -p`

**Contraseña: 1234**
