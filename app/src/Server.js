const mongoose = require ("mongoose");
const express = require ("express");
const Server= express();
Server.use(express.json());

mongoose.connect("mongodb://localhost:27017/squealer.db" ,
{
useUnifiedTopology: true,
useNewUrlParser: true}
)

mongoose.then(() =>{
    console.log("Connected to Database");
})

mongoose.catch((e)=> console.log(e));
Server.listen(5000, ()=>{
    console.log("Server Started");
});

Server.post("/register", async(req, res)=>{
    const {email, password, name}= req.body;

    try{

    } catch (error){

    }

})


const schema = new mongoose.Schema(
    {
    username: String,
    email: String, 
    password: String,
    }
)

const Model = mongoose.model("userData", schema);

const insertUser = async(obj)=>{
    const user = new Model(obj);

    await user.save();
}




