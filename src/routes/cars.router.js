import { Router } from 'express'
import { cartManager } from '../cartsManager.js';
const router = Router();



router.post('/', async (req,res)=>{

    const productId = parseInt(req.body.productId);
    const count = parseInt(req.body.count);
    await cartManager.createCart(productId, count);

    res.sendStatus(200);

})

router.get('/:idCart', async (req,res)=>{

    const { idCart } = req.params;
    const cart = await cartManager.getCart(parseInt(idCart));
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: `Producto con el Id ${idCart} no encontrado` });
    }

})

router.post ('/:idCart/product/idProduct', async (req, res)=>{
    const cartId = parseInt(req.params.idCart);
    const productId = parseInt(req.params.productId);
    const count = parseInt(req.body.count);

    await cartManager.addProductToCart(cartId, productId, count);

    res.status(200).json({ error: 'cambios realizados' })
})


export default router;