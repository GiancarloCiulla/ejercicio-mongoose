
// express
const router = require('express').Router();
const providersController = require('../controllers/providers.controller');

// http://localhost:3000/api/providers
router.get("/", providersController.getAllProviders);

// http://localhost:3000/api/providers/id
router.get("/:id", providersController.getOneProvider);

// http://localhost:3000/api/providers/
router.post("/", providersController.createProvider);

// http://localhost:3000/api/providers/id
router.put("/:id", providersController.updateProvider);

// http://localhost:3000/api/providers/id
router.delete("/:id", providersController.deleteProvider);

module.exports = router;