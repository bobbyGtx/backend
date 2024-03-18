import {UrlManager} from "../utils/url-manager.js";

export class Product {
    constructor() {
        this.productElement = document.getElementById('product');
        this.id = UrlManager.getQueryParams()['id'];
        this.baseUrl = 'http://localhost:3000/api/products/';
        this.getProduct(this.id)
            .then(product => this.fillProduct(product));
    }

    async getProduct(id) {
        const response = await fetch(this.baseUrl + id);
        return await response.json();
    }

    fillProduct(product) {
        if (product) {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            const titleElement = document.createElement('div');
            titleElement.className = 'title edt';
            titleElement.setAttribute('id', 'product-title');
            titleElement.innerText = product.title;

            const descriptionElement = document.createElement('div');
            descriptionElement.className = 'description edt';
            descriptionElement.setAttribute('id', 'product-description');
            descriptionElement.innerText = product.description;

            const priceElement = document.createElement('div');
            priceElement.className = 'price edt';
            priceElement.setAttribute('id', 'product-price');
            priceElement.innerText = product.price + ' $';

            const actionsElement = document.createElement('div');
            actionsElement.className = 'actions';
            const delButtonElement = document.createElement('button');
            delButtonElement.className = 'btn';
            delButtonElement.innerText = 'Удалить';
            const editButtonElement = document.createElement('button');
            editButtonElement.className = 'btn';
            editButtonElement.innerText = 'Изменить';
            actionsElement.appendChild(delButtonElement);
            actionsElement.appendChild(editButtonElement);

            this.productElement.appendChild(titleElement);
            this.productElement.appendChild(descriptionElement);
            this.productElement.appendChild(priceElement);
            this.productElement.appendChild(actionsElement);

            this.title = product.title;
            this.description = product.description;
            this.price = product.price;

            titleElement.addEventListener("click", this.editElement.bind(titleElement));
            descriptionElement.addEventListener("click", this.editElement.bind(descriptionElement));
            priceElement.addEventListener("click", this.editElement.bind(priceElement));

            delButtonElement.addEventListener('click', this.delProduct.bind(this));
            editButtonElement.addEventListener('click', this.editProduct.bind(this));
        }
    }

    delProduct() {
        const deleteUrl = this.baseUrl + this.id;
        const delOperation = new Promise((resolve, reject) => {
            fetch(deleteUrl, {method: 'DELETE'})
                .then(response => {
                    if (response.ok) {
                        resolve();
                    } else {
                        //console.warn(response.statusText);
                        reject(error);
                    }
                });
        }).then(response => {
            this.productElement.innerHTML = `<h2>Товар успешно удален</h2>`;
        }).catch(error => console.log(error));
    }

    editElement(el) {
        var newStr = prompt('Введите новый текст', this.innerText);
        if (newStr && this.innerText.indexOf('$') >= 0) {
            if (isNaN(parseInt(newStr))) {
                alert('Цена должна состоять из цифр');
                return;
            }
            this.innerText = newStr;
            if (this.innerText.indexOf('$') === -1) {
                this.innerText += ' $';
            }
        } else if (newStr) {
            this.innerText = newStr;
        }
    }

    editProduct() {
        const editUrl = this.baseUrl + this.id;
        const productTitle = document.getElementById('product-title');
        const productDescription = document.getElementById('product-description');
        const productPrice = document.getElementById('product-price');
        let prodPrice;
        if (isNaN(parseInt(productPrice.innerText))) {
            alert('Цена должна состоять из цифр. Отправка данных на сервер невозможна');
            return;
        } else {
            prodPrice = parseInt(productPrice.innerText);
        }
        const data = {
            "id": parseInt(this.id),
            "title": productTitle.innerText,
            "description": productDescription.innerText,
            "price": prodPrice
        };
        const delOperation = new Promise((resolve, reject) => {
            fetch(editUrl, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "charset": "utf-8"
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) {
                        resolve(response);
                    } else {
                        //console.warn(response.statusText);
                        reject(error);
                    }
                });
        }).then(data=>{
            data.json().then(json=>{
                productTitle.innerText=json.title;
                productDescription.innerText = json.description;
                productPrice.innerText=json.price+' $';
                alert('Изменения сохранены!');
            })
        }).catch(error => console.log(error));
    }
}