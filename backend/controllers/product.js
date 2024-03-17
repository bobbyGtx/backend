//Тут в контроллерах - логика работы с моделями
const ProductModel = require('../models/product');

class ProductController {
    static async getProducts(request, response) {
        const products = await ProductModel.findAll();
        response.send(products);
    }
    static async getProduct(request, response) {
        const {id} = request.params;
        const product = await ProductModel.find(id);
        response.send(product);
    }
    static async addProduct(request, response) {
        const product = await ProductModel.create(request.body);//передаем тело запроса в метод create
        response.send(product);
    }
    static async changeProduct(request, response) {
        const {id} = request.params;
        console.log(request.params);//Удалить
        const product = await ProductModel.change(id,request.body);//передаем тело запроса в метод create
        response.send(product);
    }
    static async deleteProduct(request, response) {
        const {id} = request.params;
        console.log(request.params);//Удалить
        await ProductModel.delete(id);
        response.send({});
    }
}

module.exports = ProductController;