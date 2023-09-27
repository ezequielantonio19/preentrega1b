import{ existSync, promises} from 'fs';

import { productManager } from './productManager.js';
const path = 'CartsFiles.json'


class CartManager {
    async getCarts() {
        
        try {
            if (existSync(path)){
                const CartsFiles = await promises.readFile(path, 'utf-8')
                
                const cartsData = JSON.parse(CartsFiles)
                return  cartsData
            } else{
                console.log('Archivo no existe');
                return[];

            }
        } catch (error) {

            console.log('error', error);
            return error;
            
        }
    }

    async createCart(){
        try {
            const carts = await this.getCarts({});
            let id;
            if (!carts.length){
                id=1
            } else {
                id= carts [carts.length -1].id +1
            }
            const newCart = {id, products:[]}
            carts.push(newCart)
            await promises.writeFile(path, JSON.stringify(carts))
            return newCart
        } catch (error) {
            return error
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getCarts();
            console.log('productos', carts)
            const cart = carts.find((p)=>p.id === id)
            console.log('producto', cart)
            return cart
        } catch (error) {
            console.log('catch error')
            throw new Error (error.message)
            
        }
    }

    async addProductToCart(idCart, idProduct) {
        const cart = await this.getCartById(idCart)
        if (!cart)
        throw new Error ('No xiste carrito con ese Id')


        const product = await productManager.getProductById(idProduct)
        if (!product)
        throw new Error ('No existe producto con ese Id')

       const productIndex = cart.products.findIndex(p=>p.product === idProduct)
       if (productIndex === -1) {
        const newProduct = {product:idProduct, quantity:1}
        cart.products.push(newProduct)
       } else{
        cart.products[productIndex].quantity++
       }
    }
}
export const  cartManager = new CartManager();