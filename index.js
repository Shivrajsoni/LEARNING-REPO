const  express= require("express");
const mongoose = require("mongoose");
const app=express();

const UserRouter =require("./routes/user.js");
app.use(express.json());

app.use('/user',UserRouter);


async function main(){
    await mongoose.connect("mongodb+srv://shivrajsoni09022005:root@cluster0.a4tadip.mongodb.net/cookie");
    app.listen(5000);
    console.log("Listening to port 5000");
}
main();