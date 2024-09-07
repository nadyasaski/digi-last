const loadEnv = require('./config/env');
loadEnv();

const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouter');
const orderRouter = require('./router/orderRouter');
const connectDB = require('./db/mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/order', orderRouter)

// Connect to MongoDB
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(error => {
    console.error('Failed to connect to the database:', error);
});
