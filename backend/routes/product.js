//Тут логика работы с запросами для продуктов!
const ProductController = require('../controllers/product');
const express = require('express');

const router = express.Router();

router.get('/',ProductController.getProducts);
router.get('/:id',ProductController.getProduct);
router.post('/',ProductController.addProduct);
router.put('/:id',ProductController.changeProduct);
router.delete('/:id',ProductController.deleteProduct);

module.exports = router