
// codigo de Servidor
const express = require('express'); // usar la libreria
const app = express(); // Inicializar Servidor
const port = 3000; // puerto que voy a usar

// importar middlewares
const manage404 = require('./middlewares/manage404');
const auth_api_key = require('./middlewares/auth_api_key'); 
const morgan = require('./middlewares/morgan'); 

// Logger
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

app.use(express.json());

// Rutas
const booksRoutes = require("./routes/books.routes");
const productsRoutes = require("./routes/products.routes");
const entriesRoutes = require("./routes/entries.routes");

// Rutas API
// http://localhost:3000/api/books?API_KEY=123abc
app.use('/api/books', auth_api_key, booksRoutes); // habilitamos las rutas. Middleware con solicitud de API_KEY
app.use('/api/products', productsRoutes);
app.use('/api/entries', entriesRoutes);

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

// POST http://localhost:3000/films
app.post('/films', (req, res) => {
    console.log("POST realizado", req.body);

    // si existe el atributo 'title'
    // significa que hemos obtenido respuesta
    if(req.body.title){ 
        // aqui va la logica para guardar en BBDD
        //res.send(`<strong>Libro ${req.body.title} Creado con POST!</strong>`)

        // Simulamos guardar en BBDD
        // INSER INTO ...
        res.status(201).json({
            success:true,
            title:req.body.title,
            id: Math.floor(Math.random() * (10000 - 1) + 1),
            data:req.body
        });
    }
    else{
        res.status(400).send("Petición incorrecta")
    }
});

// PUT http://localhost:3000/films
app.put('/films', (req, res) => {
    console.log(req.body); // por body se recibe el libro a editar

    if(req.body.title && req.body.author) {
        // Lógica para editar el libro en la BBDD
        // UPDATE books SET title = req.body.title, author = req.body.author WHERE id = req.body.id
        //..

        // este objeto simula lo que devuelve una BBDD
        let book = {
            "title": "Alien 2",
            "author":"James Cameron",
            "pages": 2000,
            "year":1550,
            "description": "en un lugar de la mancha..."
        }
      
        // Actualizamos el libro traido de BBD con lo traido en la peticion
        // y se actualiza el libro en BBDD
        let newBook = {...book, ...req.body}; // Actualizar el libro con los nuevos datos

        res.status(200).json({
            success: true,
            action:"update",
            title: req.body.title,
            id: Math.floor(Math.random() * (10000 - 1) + 1),
            data: newBook
        });
    } else {
        res.status(400).send("Petición incorrecta");
    }
});

// DELETE http://localhost:3000/films?title=Alien&author=Ridley Scott
app.delete('/films', (req, res) => {
    console.log("DELETE req.query", req.query);
    res.send(`
        <strong>Pelicula Borrada!</strong>
        ${req.query.title} - ${req.query.author}
    `)
});

// Para todo el resto de rutas no contempladas
app.use('*', manage404);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});