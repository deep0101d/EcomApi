import {  ApplicationError } from "../../error-handeller/ApplicationError.js";
import UserModel from "../user/user.model.js";
export default class ProductModel {
  constructor(id, name, desc, price, imageUrl, category, sizes) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.sizes = sizes;
  }

  static GetAll() {
    return products;
  }
  //add
  static add(product) {
    product.id=products.length+1;
    products.push(product);
    return product;
  }
  //find Throgh id
  static get(id)
  {
  const product=products.find((i)=>i.id==id);
  return product;
  }
  //
  static filter(minPrice,maxPrice,category)
  {
   const result= products.filter((product)=>
  {
   return( 
   (!minPrice || product.price>=minPrice) && 
   (!maxPrice|| product.price<=maxPrice )&& 
    (!category||product.category==category));
  });
  return result;
  }
static rateProduct(userId,productId,rating)
{
  //1.validate user and product
const users=UserModel.getAll().find((i)=>i.id==userId);
if(!users)
{
  throw new ApplicationError('User not found',404);
}
//2.validate product

  const product=products.find((i)=>i.id==productId);
  if(!product)
  {
    throw new ApplicationError('Product not found',400);
  }

  //3.check if any rating exists for this product
  if(!product.rating)
  {
    product.rating=[];
    product.rating.push({userId:userId, rating: rating});
  }
  else{
    //check if alrready rating availaible or not
    const ratingExists=product.rating.findIndex((i)=>i.userId==userId);
    if(ratingExists>=0)
    {
    product.rating[ratingExists]={
      userId:userId,
      rating:rating,
    };
    }
  else{
      product.rating.push({userId:userId, rating: rating});
    }
  }
}

}
const products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 1',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    'Cateogory1'
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    29.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    'Cateogory2',
    ['M', 'XL']
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    'Cateogory3',
    ['M', 'XL','S']
  )
];
