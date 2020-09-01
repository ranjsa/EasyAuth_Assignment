require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const Homepage = require("./routes/Homepage");
const productRoutes = require("./routes/product");

//DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch(
    err => console.log("DATABASE CONNECTION FAILED")
);

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//Routes
app.use("/api", Homepage);
app.use("/api", productRoutes);

//Port
const port = process.env.PORT || 8000;



//Starting a Server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});