const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Collection")
.then(()=>{console.log("Mongo connected for discount")})
.catch((err)=>console.log("error of mongo discount : ",err))

const discountSchema=new mongoose.Schema({
    code:{
        type:String,
        required:true,
    },

    type:{
        type:String,
        required:true
    },
    value:{
        type:String,
        required:true
    },
    
    purchase:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
});

const discountModel=mongoose.model("discounts",discountSchema);

module.exports=discountModel;



