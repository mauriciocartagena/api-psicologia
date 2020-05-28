const express = require("express");
const mysql = require("mysql");

const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  bodyParser.json(), res.header("Access-Control-Allow-Origin", "*");
  res.header(("Content-Type", "application/json"));
  res.header("Accept", "application/json");
  res.header("Access-Control-Allow-Methods", " GET, POST, PUT, DELETE");
  next();
});

var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "db1",
  //solo sirve para aplicaciones de mapp
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
});
// Route
app.get("/", (req, res) => {
  res.send("Iniciando API");
});
// app.post(
//   "/usuarios/:nombre/:ape_paterno/:ape_materno/:ci/:genero/:direccion",
//   (req, res) => {
//     let nombre = req.params.nombre;
//     let apellido_paterno = req.params.ape_paterno;
//     let apellido_materno = req.params.ape_materno;
//     let ci = req.params.ci;
//     let genero = req.params.genero;
//     let direccion = req.params.direccion;
//     connection.query(
//       "INSERT INTO `usuarios` (`nombre`,`apellido_paterno`,`apellido_materno`,`ci`,`genero`,`direccion`)VALUES ('" +
//         nombre +
//         "','" +
//         apellido_paterno +
//         "','" +
//         apellido_materno +
//         "','" +
//         ci +
//         "','" +
//         genero +
//         "','" +
//         direccion +
//         "');",
//       function (err, data) {
//         err ? res.send(err) : res.json({ usuarios: data });
//       }
//     );
//   }
// );
// app.get("/usuarios", function (req, res) {
//   connection.query("Select * from usuarios", function (err, data) {
//     err ? res.send(err) : res.json({ usuarios: data });
//   });
// });
app.get("/questions", (req, res) => {
  const sql = "SELECT nombre,id_pregunta FROM `pregunta_formas` ";

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("Not result");
    }
  });
});
// app.get("/usuarios/:id", function (req, res) {
//   let id = req.params.id;
//   connection.query("Select * from usuarios WHERE id_usuario =" + id, function (
//     err,
//     data
//   ) {
//     err ? res.send(err) : res.json({ usuarios: data });
//   });
// });
// app.delete("/usuarios/delete/:id", function (req, res) {
//   let id = req.params.id;
//   connection.query("DELETE FROM usuarios WHERE id_usuario=" + id, function (
//     err,
//     data
//   ) {
//     err ? res.send(err) : res.send("success");
//   });
// });

// app.put(
//   "/usuarios/update/:id/:nombre/:ape_paterno/:ape_materno/:ci/:genero/:direccion",
//   function (req, res) {
//     let id = req.params.id;
//     let nombre = req.params.nombre;
//     let apellido_paterno = req.params.ape_paterno;
//     let apellido_materno = req.params.ape_materno;
//     let ci = req.params.ci;
//     let genero = req.params.genero;
//     let direccion = req.params.direccion;

//     connection.query(
//       "UPDATE usuarios SET nombre = '" +
//         nombre +
//         "', apellido_paterno = '" +
//         apellido_paterno +
//         "', apellido_materno= '" +
//         apellido_materno +
//         "', ci='" +
//         ci +
//         "', genero='" +
//         genero +
//         "', direccion='" +
//         direccion +
//         "' WHERE id_usuario='" +
//         id +
//         "'  LIMIT 1",
//       function (err, data) {
//         err ? res.send(err) : res.send("success");
//       }
//     );
//   }
// );
connection.getConnection((error) => {
  if (error) throw error;
  console.log("Database server running!");
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
