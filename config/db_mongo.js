
const mongoose = require("mongoose");

//mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/local");

const db = mongoose.connection;

// Eventos
db.on("error", error => console.log(error));
db.once("open", () => console.log("Conexión a MongoDB establecida"));

module.exports = mongoose;