
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});


const itemRoutes = require('./routes/api/items');
const userRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');

const app = express();

//DB
const DB = process.env.MONGO_URI;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connection successful');
}).catch((err) => {
    console.log(err);
});



//MIDDLEWARES
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//bodyparser => read data from body into req.body
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());




//ROUTES

app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);



const PORT = 8080;

app.listen(PORT, () => {
    console.log('Server listening on port ', PORT);
})