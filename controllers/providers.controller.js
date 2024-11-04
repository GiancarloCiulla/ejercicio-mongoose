
const Product = require('../models/products.model');
const providerService = require('../services/providers.service');

// READ
const getOneProvider = async (req, res) => {
    try {
        const provider = await providerService.getOneProvider(req.params.id);
        if (provider) {
            res.json(provider);
        } else {
            res.status(404).json({ mensaje: 'Proveedor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// READ
const getAllProviders = async (req, res) => {
    try {
        const providers = await providerService.getAllProviders();
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// CREATE
/*
{
	"companyName":"CasaArbustos",
	"CIF": "B543493495",
	"address": "Calle de los arboles",
    "urlWeb": "http://www.casaarboles.es"
}
*/
const createProvider = async (req, res) => {
    try {
        const nuevoProvider = await providerService.createProvider(req.body);
        res.status(201).json(nuevoProvider);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// UPATE
const updateProvider = async (req, res) => {
    try {
        const providerActualizado = await providerService.updateProvider(req.params.id, req.body);
        if (providerActualizado) {
            res.json(providerActualizado);
        } else {
            res.status(404).json({ mensaje: 'Proveedor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// DELETE
/* const deleteProvider = async (req, res) => {
    try {
        const proveedor = await providerService.deleteProvider(req.params.id);
        if (proveedor) {
            res.json({ mensaje: 'Proveedor eliminado' });
        } else {
            res.status(404).json({ mensaje: 'Proveedor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}; */

const deleteProvider = async (req, res) => {
    try {
        const proveedor = await providerService.deleteProvider(req.params.id);
        
        // Verificamos el resultado del servicio
        if (proveedor.success) {
            res.json({ mensaje: proveedor.message }); // Mensaje de éxito
        } else {
            res.status(400).json({ mensaje: proveedor.message }); // Mensaje de error
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// READ
/* const getOneProvider = async (req, res) => {
    try {
        const id = req.params.id;

        // Busca el proveedor con el nombre de la compañía especificada o devuelve todos si no se pasa ningún nombre
        let providers = id
            ? await Provider.findOne({ id }, '-_id -__v')
            : await Provider.find({}, '-_id -__v');

        res.status(200).json(providers); // Respuesta de la API para el proveedor específico o todos los proveedores
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
} */

// READ
/* const getAllProviders = async (req, res) => {
    try {
        // Obtener todos los productos, excluyendo los campos _id y __v
        const providers = await Provider.find({}, '-_id -__v');
        
        // Responder con los productos encontrados
        res.status(200).json(providers);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
} */

// CREATE
/*
req.body ejemplo:
{
    "id":4,
	"companyName":"titulo nuevo",
	"website": "http://www.nuevacompany.es",
	"image": "aaa.jpg"
}
*/
/* const createProvider = async (req, res) => {
    console.log(req.body);

    try{
        const data = req.body;
        let answer = await new Provider(data).save();
        //res.status(201).json(answer);

        res.status(201).json({
            msj: "Proveedor creado!: " + answer.companyName, 
            provider: answer 
        });

    }catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
} */

// UPATE
/*
req POSTMAN: http://localhost:3000/api/providers/4
req.body ejemplo:
{
	"companyName":"La casa de las modificaciones",
	"website": "http://www.modificaciones.es",
	"image": "modificado.jpg"
}
*/
/* const updateProvider = async (req, res) => {
    try {
        const id = req.params.id;
        //const { id } = req.params;
        const data = req.body;

        // actualiza el proveedor en la base de datos
        const updatedProvider = await Provider.findOneAndUpdate(
            { id: Number(id) }, // parámetro que extraemos de la URL
            data, // req.body
            { 
                new: true, // devuelve el documento actualizado en lugar del original
                runValidators: true // ejecuta las validaciones definidas en el esquema para asegurarse de que los nuevos valores sean válidos
            });

        // si no se encuentra el proveedor, responde con un error 404
        if (!updatedProvider) {
            return res.status(404).json({ msj: "Proveedor no encontrado" });
        }

        res.status(200).json({
            msj: "Proveedor actualizado!: " + updatedProvider.companyName, 
            provider: updatedProvider 
        });

    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}; */

// DELETE
/*
req POSTMAN: http://localhost:3000/api/providers/4
req.body ejemplo: No lleva
{}
*/
/* const deleteProvider = async (req, res) => {
    try {
        const id = req.params.id;

        // eliminamos el proveedor de la base de datos
        const deletedProvider = await Provider.findOneAndDelete({ id: Number(id) });

        // si no se encuentra el proveedor, responde con un error 404
        if (!deletedProvider) {
            return res.status(404).json({ msj: "Proveedor no encontrado" });
        }

        res.status(200).json({
            msj: "Se ha borrado el proveedor: " + deletedProvider.companyName,
            provider: deletedProvider
        });

    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}; */

module.exports = {
    getOneProvider,
    getAllProviders,
    createProvider,
    updateProvider,
    deleteProvider
}