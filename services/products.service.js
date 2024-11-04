
const Product = require('../models/products.model');
const Provider = require('../models/providers.model');

const getOneProduct = async (id) => {

    return await Product.findById(id, '-_id -__v').populate('provider', '-_id -__v');
};

const getAllProducts = async () => {

    return await Product.find({}, '-_id -__v').populate('provider', '-_id -__v');
};

/*
{
	"id":3,
	"title": "Producto AlRu",
	"price": 1.5,
    "description": "descripcion 5",
    "image": "imagen5.jpg",
    "provider": "6728b860bf23a009bb346c88" -> uno que exista
}
*/
async function createProduct(datosProduct) {
    const producto = new Product(datosProduct);
    return await producto.save();
}

/*
{
	"id":3,
	"title": "Producto AlRu",
	"price": 1.5,
    "description": "descripcion 5",
    "image": "imagen5.jpg",
    "provider": "6728b860bf23a009bb346c88" -> uno que exista
}
http://localhost:3000/api/products/672353b7939a5c5a9bbaa775
*/
const updateProduct = async (id, datosProduct) => {
    return await Product.findByIdAndUpdate(id, datosProduct, { new: true });
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    getOneProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};