const { mongoose, Schema } =require("mongoose");

const userSchema=new Schema({
    name: String,
    email: String,
    password: String,
})

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;