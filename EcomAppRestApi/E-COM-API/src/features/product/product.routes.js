import express from 'express';
import ProductController from './product.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';
//2.get Router
const productRouter=express.Router();
const productController=new ProductController();
//all path to conteroller methods
//localshots/api/product
productRouter.get('/',productController.getAllProdcts);
productRouter.post('/rate',productController.rateProducts);
productRouter.post('/',
upload.single('imageUrl'),
productController.addProduct);
productRouter.get('/filter',productController.getFilterProduct)
productRouter.get('/:id',productController.getOneProduct);
export default productRouter;



// 1. Import express.
// import express from 'express';
// import ProductController from './product.controller.js';

// // 2. Initialize Express router.
// const productRouter=express.Router();
// const productController=new ProductController();

// // All the paths to the controller methods.
// // localhost/api/products 
// productRouter.get('/', productController.getAllProdcts);
// productRouter.post('/', productController.addProduct);


// export default productRouter;