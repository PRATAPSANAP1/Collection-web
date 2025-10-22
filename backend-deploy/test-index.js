const express = require('express');
const cors = require('cors');

const app = express();

// CORS configuration
app.use(cors({
    origin: ['https://shubhangi-collection-flax.vercel.app', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(express.json());

// Test endpoints without database
app.get('/product/getTableData', (req, res) => {
    res.json({ success: true, data: [] });
});

app.get('/category/sendCategory', (req, res) => {
    res.json({ success: true, data: [
        { Category_ID: '1', Category_Name: 'Earrings', Category_type: 'jewelry' },
        { Category_ID: '2', Category_Name: 'Necklaces', Category_type: 'jewelry' }
    ]});
});

app.get('/website-content', (req, res) => {
    res.json({
        heroLine: 'Welcome to Shubhangi Collection',
        subHeroLine: 'Beautiful jewelry for everyone',
        aboutUs: 'We provide quality jewelry',
        contactEmail: 'contact@shubhangi.com',
        contactPhone: '+91 93704 70692',
        shopName: 'Shubhangi Collection'
    });
});

app.get('/', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

module.exports = app;