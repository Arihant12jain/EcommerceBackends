const express = require('express');
const app = express();

// Import your routes
const category = require('./routes/categoryroutes');
const Product = require('./routes/Product');
const User = require('./routes/User');

// Import JWT middleware
const jwt = require('./helpers/jwt');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply JWT middleware
const cors = require('cors');
app.use(cors());


// Define routes
const Order=require('./routes/Order');
app.use('/cat', category);
app.use('/pro', Product);
app.use('/user', User);
app.use('/order',Order);
// app.use(jwt());
// Global error handling middleware
const err=require('./helpers/err');
app.use(err);

// Start the server
app.listen(8000, () => {
  console.log('Server running on port 8000');
});
