import { Router } from 'express'
import { productsManager } from '../productManager.js'

const router = Router();


router.get('/', async(req,res)=>{

    try {
        const products = await productsManager.getProducts(req.query)
        if(!products.length){
            res.status(200).json ({message: 'No hay productos'})
        }

        res.status(200).json ({message: 'productos encontrados', products})
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }

})

router.get('/:idProduct', async(req,res)=>{
    const {idProduct} = req.params
    try {
        const product = await productsManager.getProductsById(+idProduct)
        if(!product){
            return res.status(404).json({message: 'No se encuentra producto por Id' })
        }

        res.status(200).json ({message: 'producto encontrado', product})
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }
})

router.post('/', async(req,res)=> {
    const {title, description, code, price, status, stock, category, thumbnails,} = req.body
    if (!title || !description || !code || !price || !status || !category || !thumbnails){
        res.status(400).json ({message: 'faltan datos'})

    }

        
    try {

        const newProduct = await productsManager.createProduct(req.body)
        res.status(200).json({message: 'Producto creado', product: newProduct})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    }
)

router.delete('/:idProduct', async(req,res)=>{
    const {idProduct} = req.params

    try {
        const product = await productsManager.getProductsById(+idProduct)
        if(!product){
            return res.status(404).json({message: 'No se encuentra producto por Id' })
        }
        await productsManager.deleteProduct(+idProduct)
        res.status(200).json ({message: 'Producto eliminado', product})
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }
})

router.put('/:idProduct', (req, res) => {
    const { idProduct } = req.params;
    const productUpdates = req.body;
    const updatedProduct = productsManager.updateProduct(parseInt(pid), productUpdates);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: `Producto con el Id ${pid} no encontrado` });
    }
  })


export default router;