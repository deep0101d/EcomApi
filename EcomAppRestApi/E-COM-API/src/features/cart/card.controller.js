import CartModel from "./cart.model.js";
export default class CartController{
    add(req,res)
    {
        const {productId,quantity}=req.query;
        const userID=req.userID;
CartModel.add(userID,productId,quantity);
res.status(200).json({
    message:"product added to cart"
});
    }
    get(req,res)
    {
        const userID=req.userID;
        const cart=CartModel.get(userID);
        res.status(200).json({
            message:"cart fetched",
            cart
        });
    }
    delete(req,res){
      const userID=req.userID;
      const productId=req.params.id;
   const error= CartModel.delete(userID,productId);
   if(error)
   {
       res.status(400).json({
           message:error
       });
   }
else{
    res.status(200).json({
        message:"product deleted from cart"
    });
}
    }
}