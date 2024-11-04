
//const fetch = require('node-fetch');

const productsController = require('../controllers/products.controller');
const router = require('express').Router();

/*
POST /products

A enviar por Body:
{
    "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "price": 695,
    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    "rating": {
    "rate": 4.6,
    "count": 400
    }
}
*/
// http://localhost:3000/api/products
router.get("/", productsController.getAllProducts);

// http://localhost:3000/api/products/1
router.get("/:id?", productsController.getOneProduct);

// http://localhost:3000/api/products/
router.post("/", productsController.createProduct);

// http://localhost:3000/api/products/
router.put("/:id", productsController.updateProduct);

// http://localhost:3000/api/products/1
router.delete("/:id?", productsController.deleteProduct);

module.exports = router;