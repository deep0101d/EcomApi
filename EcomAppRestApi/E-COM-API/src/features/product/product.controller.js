import ProductModel from "./product.model.js";
export default class ProductController{
    //get
    getAllProdcts(req,res){
const products=ProductModel.GetAll();

res.status(200).send(products);
    }
    //add
    addProduct(req,res){
       const{name,price,size}=req.body;
       const newProduct={
        name,
        price:parseFloat(price),
        size:size.split(','),
        imageUrl:req.file.filename,
       }
      const createdRecord= ProductModel.add(newProduct);
       res.status(200).send(createdRecord);
    }
    //rate
    rateProducts(req,res){
const userID=req.query.userID;
const productID=req.query.productID;
const rating=req.query.rating;
try{
ProductModel.rateProduct(userID,productID,rating);
}catch(err)
{
 return res.status(400).send(err.message);
}

    res.status(200).send('Rating added');


    }
    //get one
    getOneProduct(req,res){
const id=req.params.id;
const product=ProductModel.get(id);
if(!product)
{
    res.status(404).send('Product not found');
 
} 
else{
    res.status(200).send(product);
}
 }
 //filter
 //query paramete
 //local host 4200/api/products/filter/
getFilterProduct(req,res){
    const minPrice=req.query.minPrice;
    const maxPrice=req.query.maxPrice;
    const category=req.query.category;
    const result=ProductModel.filter(minPrice,maxPrice,category);
    return res.status(200).send(result);
}
}