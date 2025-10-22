require("dotenv").config();   

const express=require("express");
const path=require("path");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const route=require("./Routes/userRoutes");
const product_route=require("./Routes/productRoute");
const categoryRoute=require("./Routes/categoryRoute");
const dashboardRoute=require("./Routes/dashboard");
const beauty=require("./Routes/appointmentBeauty");
const cartRoute=require("./Routes/cart");
const wishRoute=require("./Routes/wishRoute");
const orderRoutes = require("./Routes/orderRoutes");
const del=require("./Routes/boy");
const web=require("./Routes/websiteManager");
const feed=require("./Routes/feed");

const app=express();

const sec = process.env.secret_key;

// CORS configuration
app.use(cors({
    origin: ['https://collection-web-phi.vercel.app', 'http://localhost:3000', 'http://127.0.0.1:5500', 'https://b2knfdbj-3400.inc1.devtunnels.ms'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const loadDataRoute = require("./Routes/loadData");
app.use("/api/loadData", loadDataRoute);

function validateUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect("/register");

    jwt.verify(token, sec, (err, user) => {
        if (err) {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            return res.sendStatus(403);
        };
        req.user = user; // decoded payload
        console.log("data from token:", user);
        console.log("user.email :", user.email);
        console.log("password :",user.password)
        next();
    });
}


function validateAdmin(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect("/register");

    jwt.verify(token, sec, (err, user) => {
        if (err) {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            return res.sendStatus(403);
        };
        req.user = user; // decoded payload
        console.log("data from token:", user);
        console.log("user.email :", user.email);
        if(user.email==process.env.admin_email)
        {

            next();
        }else{
            // res.send("access forbidden !");
            res.redirect("/register");
        }
    });
}

function validateDeliveryBoy(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect("/register");

    jwt.verify(token, sec, (err, user) => {
        if (err) {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            return res.sendStatus(403);
        };
        req.user = user; // decoded payload
        console.log("data from token:", user);
        console.log("user.email :", user.email);
        if(user.email==process.env.delivery_email)
        {

            next();
        }else{
            // res.send("access forbidden !");
            res.redirect("/register");
        }
    });
}


app.get("/admin.html",validateAdmin,(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'Collection', `admin.html`));
    // res.send("admin page");
})

app.get("/order.html",validateUser,(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'Collection', `order.html`));
})

app.get("/cart.html",validateUser,(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'Collection', `cart.html`));
})

app.get("/delivery.html",validateUser,(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'Collection', `delivery.html`));
})

app.get("/wishlist.html",validateUser,(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'Collection', `wishlist.html`));
})

app.get("/profile.html",validateUser,(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'Collection', `profile.html`));
})

app.get("/ddelivery.html",validateDeliveryBoy,(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'Collection', `ddelivery.html`));
})

app.use(express.static(path.join(__dirname, '..','Collection')));


app.get("/validateUser",validateUser,(req,res)=>{
    res.send("success");
})

app.get("/admin",(req,res)=>{
    res.redirect("/admin.html");
})


app.use("/api",route);

app.use("/product",product_route);

app.use("/category",categoryRoute);

app.use("/dashboard",dashboardRoute);

app.use("/parlor",beauty);

app.use("/cart",cartRoute);

app.use("/wish",wishRoute);

app.use("/order", orderRoutes);

app.use("/deliveryBoy",del);

app.use("/website-content",web);

app.use("/feedback",feed);

// Debug route to list all routes
app.get('/debug/routes', (req, res) => {
    res.json({
        routes: [
            '/product/getTableData',
            '/category/sendCategory',
            '/website-content',
            '/api/*',
            '/dashboard/*',
            '/cart/*',
            '/wish/*',
            '/order/*'
        ]
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found', path: req.path });
});

app.use('/category/*', (req, res) => {
    res.status(404).json({ error: 'Category endpoint not found', path: req.path });
});

app.use('/product/*', (req, res) => {
    res.status(404).json({ error: 'Product endpoint not found', path: req.path });
});

app.get('/:page', (req, res) => {
    console.log("hello world");
    if(req.params.page=="order")
    {
        res.redirect("/order.html");
    }else if(req.params.page=="cart")
    {
        res.redirect("/cart.html");
    }else if(req.params.page=="wishlist")
    {
        res.redirect("/wishlist.html");
    }else if(req.params.page=="delivery")
    {
        res.redirect("/delivery.html");
    }else if(req.params.page=="profile")
    {
        res.redirect("/profile.html");
    }else if(req.params.page=="ddelivery")
    {
        res.redirect("/ddelivery.html");
    }else{
        res.sendFile(path.join(__dirname, '..', 'Collection', `${req.params.page}.html`));
    }
    // console.log("page :: ",req.params.page);
    if (req.params.page.includes('.'))
        {
            return res.status(404).send('Not found');
        } 

    
});

app.listen(3400,()=>{
    console.log("Server started at 3400");
})