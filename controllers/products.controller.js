
const productService = require('../services/products.service');

// READ
const getOneProduct = async (req, res) => {
    try {
        const product = await productService.getOneProduct(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// READ
/* const getProduct = async (req, res) => {
        try {
            const id = req.params.id;
            let products = id
            ? await Product.find({id},'-_id -__v').populate('provider', '-_id -__v')
            : await Product.find({},'-_id -__v').populate('provider', '-_id -__v'); //{}
            res.status(200).json(products); // Respuesta de la API para 1 producto
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(400).json({msj:`ERROR: ${error.stack}`});
        }
} */

// READ
const getAllProducts = async (req, res) => {
    try {
        const productos = await productService.getAllProducts();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// POST: CREATE
const createProduct = async (req, res) => {
    try {
        const nuevoProducto = await productService.createProduct(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// UPATE
const updateProduct = async (req, res) => {
    try {
        if(req.params.id){
            const updateProducto = await productService.updateProduct(req.params.id, req.body);
            res.status(200).json({mensaje: "Producto editado!", updateProducto});
        }
        else{
            return res.status(400).json({ mensaje: "ID del producto requerido" });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}
    

// DELETE
/* const deleteProduct = (req, res) => {
    res.status(200).send("Producto borrado!. Has borrado:"+req.params.id);
} */

// DELETE
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productService.deleteProduct(req.params.id);
        if (deletedProduct) {
            res.status(200).json({
                message: `producto eliminado: ${deletedProduct.title}`
            })
        }
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
    
}

module.exports = {
    getOneProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}