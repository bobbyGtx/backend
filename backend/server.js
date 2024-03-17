const express = require('express');
const routes = require('./routes/index');
const cors = require('cors');

const app = express(); //Формируем новое приложение экспресс

app.use(express.json());//мы задаем json формат для всего приложения
app.use(express.urlencoded({extended:false}));//спец кодировка для наших параметров
app.use(cors());

app.use('/api', routes);//Формируем общее правило для всех роутов/api

app.listen(process.argv[2], () => {
    console.log('Сервер запущен');
})