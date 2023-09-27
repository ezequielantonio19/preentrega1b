import{ existSync, promises} from 'fs';
const path = 'ProductsFiles.json'


class ProductManager {
    async getProducts(queryObj = {}) {
        const {limit} =queryObj;
        try {
            if (existSync(path)){
                const ProductsFiles = await promises.readFile(path, 'utf-8')
                console.log('ProductsFiles', ProductsFiles)
                const productsData = JSON.parse(ProductsFiles)
                return limit ? productsData.slice(0, +limit) : productsData
            } else{
                console.log('Archivo no existe');
                return[];

            }
        } catch (error) {

            console.log('error', error);
            return error;
            
        }
    }

    async createProduct(product){
        try {
            const products = await this.getProducts({});
            let id;
            if (!products.length){
                id=1
            } else {
                id= products [products.length -1].id +1
            }
            const newProduct = {id, ...product, status:true}
            products.push(newProduct)
            await promises.writeFile(path, JSON.stringify(products))
            return newProduct
        } catch (error) {
            return error
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            console.log('productos', products)
            const product = products.find((p)=>p.id === id)
            console.log('producto', product)
            return product
        } catch (error) {
            console.log('catch error')
            throw new Error (error.message)
            
        }
    }

    async deleteProduct (id){
        try {
            const products = await this.getProducts({})
            const product = products.find((p)=>p.id === id)
            if (product){
                const newArrayProducts = products.filter ((p)=>p.id !== id)
                await promises.writeFile(path.JSON.stringify(newArrayProducts))


            }
            return product


        } catch (error) {

            return error
            
        }
    }

    async updateProduct(id, obj) {

        try {
            const products = await this.getProducts ({})
            const index = products.index ((p)=>p.id === id)
            if (index === -1){
                return null
            }

            const updateProduct ={...products[index], ...obj}
            products.splice(index, 1, updateProduct)
            await promises.writeFile(path.JSON.stringify(products))

            return updateProduct
        } catch (error) {
            return error
        }
    }
}
;

export const manager = new ProductManager("ProductsFiles.json");

const Product1 = {
    title: 'Pote 100gr',
    description: 'Pote de PAD con capacidad de 100gr',
    price: 25000,
    thumbnail: 'messi',
    code: 'p001',
    stock: 13000,
};

const Product2 = {
    title: 'Pote 1 kg',
    description: 'Pote de 1kg de PAD con tapa diámetro 96',
    price: 15000,
    thumbnail: 'suarez',
    code: 'p013',
    stock: 9000,
};

const Product3 = {
    title: 'Pico doble 1lt',
    description: 'Bidón con dosificador, con doble pico',
    price: 45000,
    thumbnail: 'ella',
    code: 'bl08',
    stock: 10000,
};

const Product4 = {
    title: 'Pico doble 1lt',
    description: 'Bidón con dosificador, con doble pico',
    price: 45000,
    thumbnail: 'ella',
    code: 'bl08',
    stock: 10000,
};

async function test() {
    const product = new ProductManager();
    await product.addProduct(Product1);
    await product.addProduct(Product2);
    await product.addProduct(Product3);
    await product.addProduct(Product4);
}

test();