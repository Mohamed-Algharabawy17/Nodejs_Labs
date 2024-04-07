
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/E-Commerce");
let DBListner = mongoose.connection;

const PORT = process.env.PORT||7008;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


const ItemsRoutes = require("./Routes/ItemsRoutes");
const OrdersRoutes = require("./Routes/OrdersRoutes");
const UsersRoutes = require("./Routes/UsersRoutes");

DBListner.once('open',()=>{
    console.log("DB Opened !!!");
    app.use("/api/Items", ItemsRoutes);
    app.use("/api/orders",OrdersRoutes);
    app.use("/api/users",UsersRoutes);
})


app.listen(PORT,()=>{
    console.log("Runs at: http://localhost:"+PORT);
})
