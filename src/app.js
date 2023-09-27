import express from "express";

import productsRouter from './routes/products.router.js'
import carsRouter from './routes/cars.router.js'

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', productsRouter)
app.use('/api/carts', carsRouter)

app.listen(8000, ()=>
{
    console.log("Escuchando al puerto 8000");
})

