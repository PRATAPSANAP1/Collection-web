const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Collection")
.then(()=>{console.log("Mongo connected for wish")})
.catch((err)=>console.log("error of mongo wishlist : ",err))

const wishSchema=new mongoose.Schema({
    Email:{
        type:String,
        require:true
    },
    Image:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    }

});

const wishModel=mongoose.model("wishs",wishSchema);

module.exports=wishModel;