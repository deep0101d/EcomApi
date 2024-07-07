import express from 'express';
import CartController from './card.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';
//2.get Router
const cartRouter=express.Router();
const cartController=new CartController();

//3.define routes
cartRouter.delete('/:id',cartController.delete);
cartRouter.post('/',cartController.add);
cartRouter.get('/',cartController.get);
export default cartRouter;