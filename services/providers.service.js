
const Product = require('../models/products.model');
const Provider = require('../models/providers.model');

const getOneProvider = async (id) => {
    return await Provider.findById(id);
};

const getAllProviders = async () => {
    return await Provider.find();
};

const createProvider = async (datosProvider) => {
    const proveedor = new Provider(datosProvider);
    return await proveedor.save();
};

const updateProvider = async (id, datosProvider) => {
    return await Provider.findByIdAndUpdate(id, datosProvider, { new: true });
};

/* const deleteProvider = async (id) => {
    return await Provider.findByIdAndDelete(id);
}; */

const deleteProvider = async (id) => {
    // Verificamos si hay productos relacionados con el proveedor
    const relatedProducts = await Product.find({ provider: id });

    if (relatedProducts.length > 0) {
        return { success: false, message: "No se puede eliminar el proveedor porque tiene productos relacionados." };
    }

    // Si no hay productos, procedemos a eliminar el proveedor
    const deletedProvider = await Provider.findByIdAndDelete(id);
    
    if (!deletedProvider) {
        return { success: false, message: "Proveedor no encontrado." };
    }
    return { success: true, message: "Proveedor eliminado correctamente." };
};

module.exports = {
    getOneProvider,
    getAllProviders,
    createProvider,
    updateProvider,
    deleteProvider
};