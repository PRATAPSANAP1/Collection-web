const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Collection")
.then(()=>{console.log("Mongo connected for cart")})
.catch((err)=>console.log("error of mongo cart : ",err))

const cartSchema=new mongoose.Schema({
    Email:{
        type:String,
        require:true
    },
    Product:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }

});

const cartModel=mongoose.model("carts",cartSchema);

module.exports=cartModel;