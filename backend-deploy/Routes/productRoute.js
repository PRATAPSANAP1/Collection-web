const express=require("express");
const path = require("path");
const product_handler=require("../Controllers/productManager");
const multer = require("multer");
const router=express.Router();

 // Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage: storage });


router.post("/addProduct",upload.array("Product_Images", 5),product_handler.addProduct);

router.get("/getTableData",product_handler.sendTableData);

router.post("/status",product_handler.updateStatus);

router.post("/updateData",upload.single("Product_Image"),product_handler.updateData);

router.post("/deleteData",product_handler.deleteData);

router.get("/getProduct/:id", product_handler.getProductById);



module.exports=router;