
const mongoose = require("mongoose");

//mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://user1:Contraseña1@cluster0.g3yjm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const db = mongoose.connection;

// Eventos
db.on("error", error => console.log(error));
db.once("open", () => console.log("Conexión a MongoDB establecida"));

module.exports = mongoose;