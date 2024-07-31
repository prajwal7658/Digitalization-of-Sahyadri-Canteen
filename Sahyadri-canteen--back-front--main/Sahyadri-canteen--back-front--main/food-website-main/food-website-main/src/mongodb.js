const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://mahesh1231:sahyadri@cluster0.q5gr4vz.mongodb.net/UserDb")
.then(() => {
    console.log("mongodb connected");
})
.catch(() => {
    console.log("failed to connect")
})

const FoodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = new mongoose.model("Collection1", FoodSchema)

module.exports = collection;