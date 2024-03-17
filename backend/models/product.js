//Тут логика работы с данными (БД). Это называется - модели
const fs = require('fs');
const path = require('path');
const {json} = require("express");
const {stringify} = require("nodemon/lib/utils");
class ProductModel {
    static path = path.join(__dirname, '../db', 'products.json');
    static async findAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf-8', (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(data));
                }
            })
        });
    }
    static async find(id) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf-8', (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    try {
                        const products = JSON.parse(data);
                        const product = products.find(item => parseInt(item.id) === parseInt(id));
                        if (product) {
                            resolve(product);
                        } else {
                            reject('Продукт не найден');
                        }
                    } catch (e) {
                        reject('Невозможно обработать данные');
                    }
                }
            })
        });
    }
    static async create(newProduct) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf-8', (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    try {
                        const products = JSON.parse(data);
                        products.push(newProduct);
                        const newJSON = JSON.stringify(products);
                        fs.writeFile(this.path, newJSON, 'utf-8', (error, data) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(newProduct);
                            }
                        })
                    } catch (e) {
                        reject('Невозможно обработать данные');
                    }
                }
            })
        });
    }
    static async change(id, newProduct) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf-8', (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    try {
                        const products = JSON.parse(data);
                        const productIndex = products.findIndex(item => parseInt(item.id) === parseInt(id));
                        if (productIndex > -1) {
                            products[productIndex] = newProduct;
                            const newJSON = JSON.stringify(products);
                            fs.writeFile(this.path, newJSON, 'utf-8', (error, data) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(newProduct);
                                }
                            })
                        } else {
                            reject('Продукт не найден');
                        }
                    } catch (e) {
                        reject('Невозможно обработать данные');
                    }
                }
            })
        });
    }
    static async delete(id) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf-8', (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    try {
                        const products = JSON.parse(data);
                        const productIndex = products.findIndex(item => parseInt(item.id) === parseInt(id));
                        if (productIndex > -1) {

                            products.splice(productIndex,1);//Удаление из массива 1 элемента

                            const newJSON = JSON.stringify(products);
                            fs.writeFile(this.path, newJSON, 'utf-8', (error, data) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve();
                                }
                            })
                        } else {
                            reject('Продукт не найден');
                        }
                    } catch (e) {
                        reject('Невозможно обработать данные');
                    }
                }
            })
        });
    }
}
module.exports = ProductModel;