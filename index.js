
// codigo de Servidor
const express = require('express'); // usar la libreria
const app = express(); // Inicializar Servidor
const port = 3000; // puerto que voy a usar

// importar middlewares
const morgan = require('./middlewares/morgan');
const manage404 = require('./middlewares/manage404');
const auth_api_key = require('./middlewares/auth_api_key'); 

// express
app.use(express.json());

// Logger
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Rutas
const entriesRoutes = require("./routes/entries.routes");
const productsRoutes = require("./routes/products.routes");
const providersRoutes = require("./routes/providers.routes");

// Rutas API
app.use('/api/entries', entriesRoutes); // http://localhost:3000/api/entries
app.use('/api/products', productsRoutes); // http://localhost:3000/api/products
app.use('/api/providers', providersRoutes); // http://localhost:3000/api/providers

// GET http://localhost:3000
app.get('/', (req, res) => {
    res.send('Hello Demo Express!')
});

// GET http://localhost:3000/perros/peluson
// http://localhost:3000/perros/peluson?API_KEY=123abc
app.get('/perros/:name?', auth_api_key, (req, res) => {
    const name = req.params.name;

    // en vez del array, sería obtener los datos de una BBDD SQL
    const perros = [
        { name: "mordisquitos", age: 2 },
        { name: "toby", age: 3 },
        { name: "peluson", age: 5 },
        { name: "bob", age: 3 },
    ];

    if(name){
        let miPerro = perros.find( perro => perro.name === name);

        (miPerro) ? res.status(200).json(miPerro) : res.status(404).json({
            message: "perro " + name + " no encontrado"
        });
        //res.send('Mostrando Perro <strong>' + name + '!</strong>')
    }
    else{
        res.status(200).json(perros)
    }
});

// Para todo el resto de rutas no contempladas
app.use('*', manage404);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});