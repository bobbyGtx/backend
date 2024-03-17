//Присвоение запросу - логики. Если продукты введены в адрес - то в Products Routes
const express = require('express');
const productsRoutes = require('./product');

const router = express.Router({mergeParams:true});

router.use('/products',productsRoutes);//Роуты используем только для продуктов т.к. там есть много вариантов запросов

module.exports = router;