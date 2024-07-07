
export default class CartModel{
constructor(productID,userID,quantity,id)
{
this.productID=productID;
this.userID=userID;
this.quantity=quantity;
this.id=id;
}
static add(productID,userID,quantity)
{
    const obj=new CartModel(productID,userID,quantity);
     obj.id=cart.length+1;
    cart.push(obj);
    return obj;
}
static get(userID)
{
    return cart.filter(item=>item.userID==userID);
}

static delete(userID,cartID){
    //user is deleting own cart items

const cartItemIndex=cart.findIndex(item=>item.id==cartID && item.userID==userID);
if(cartItemIndex==-1)
{
    throw new Error("Cart item not found");
}else
{
    cart.splice(cartItemIndex,1);
}

}

}
let cart=[
    new CartModel(1,2,1,1),
    new CartModel(1,1,2,2),
]