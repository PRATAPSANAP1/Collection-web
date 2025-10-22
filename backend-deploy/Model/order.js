const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Collection")
.then(()=>{console.log("Mongo connected for order")})
.catch((err)=>console.log("error of mongo order : ",err))

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  Email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  items: { type: Array, required: true },
  deliveryCode: { type: String, required: true },
  total:{type:String,required:true},
  status: { type: String, enum: ["Pending", "Shipped", "Completed"], default: "Pending" },
  paymentStatus: { type: String, enum: ["Unpaid", "Paid"], default: "Unpaid" },
  createdAt: { type: Date, default: Date.now }
  
});

module.exports = mongoose.model("Order", orderSchema);
