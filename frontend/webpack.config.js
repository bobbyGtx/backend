const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app.js',//главный файл js. Точка входа
    mode: 'development',// Режим разработки
    devServer: {//делаем devServer
        static: './dist'//статический путь
    },
    output: {
        filename: 'app.js',//название итогового файла
        path: path.resolve(__dirname, 'dist'),//путь
        clean: true//для очистки папки перед компиляцией
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Development',
            template: './index.html'
        }),
        new CopyPlugin({
            patterns: [
                {from: './src/views', to: 'views'},
                {from: './src/styles', to: 'styles'},
            ]
        })
    ]
};