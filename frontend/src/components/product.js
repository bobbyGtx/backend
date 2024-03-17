import {UrlManager} from "../utils/url-manager.js";

export class Product {
    constructor() {
        this.productElement = document.getElementById('product');
        this.id = UrlManager.getQueryParams()['id'];
        this.baseUrl='http://localhost:3000/api/products/';
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
            titleElement.innerText = product.title;

            const descriptionElement = document.createElement('div');
            descriptionElement.className = 'description edt';
            descriptionElement.innerText = product.description;

            const priceElement = document.createElement('div');
            priceElement.className = 'price edt';
            priceElement.innerText = product.price + ' $';

            const actionsElement = document.createElement('div');
            actionsElement.className = 'actions';
            const delButtonElement = document.createElement('button');
            delButtonElement.className='btn';
            delButtonElement.innerText='Удалить';
            const editButtonElement = document.createElement('button');
            editButtonElement.className='btn';
            editButtonElement.innerText='Изменить';
            actionsElement.appendChild(delButtonElement);
            actionsElement.appendChild(editButtonElement);

            this.productElement.appendChild(titleElement);
            this.productElement.appendChild(descriptionElement);
            this.productElement.appendChild(priceElement);
            this.productElement.appendChild(actionsElement);

            delButtonElement.addEventListener('click',this.delProduct.bind(this));
            descriptionElement.addEventListener("click", this.editElement.bind(descriptionElement))

        }
    }
    delProduct(){
        const deleteUrl = this.baseUrl+this.id;
        const delOperation = new Promise((resolve, reject) => {
             fetch(deleteUrl,{method:'DELETE'})
                 .then(response=>{
                     if (response.ok){
                         resolve();
                     }else{
                         //console.warn(response.statusText);
                         reject(error);
                     }
                 });
         }).then(response=>{
            this.productElement.innerHTML=`<h2>Товар успешно удален</h2>`;
        }).catch(error=>console.log(error));
    }
    editElement(el){
        this.innerText=prompt('Введите новый текст',this.innerText);
    }
}