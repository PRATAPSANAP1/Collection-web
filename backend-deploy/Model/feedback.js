const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Collection")
.then(()=>{console.log("Mongo connected for feedback")})
.catch((err)=>console.log("error of mongo feedback : ",err))

const feedbackSchema=new mongoose.Schema({
    orderId:{
        type:String,
        required:true,
    },

    productName:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    
    reviewText:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
});

const feedbackModel=mongoose.model("feedbacks",feedbackSchema);

module.exports=feedbackModel;



