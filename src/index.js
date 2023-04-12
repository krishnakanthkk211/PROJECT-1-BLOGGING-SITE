const express = require("express")
const bodyParser = require("body-parser")
const {default:mongoose} = require("mongoose")
const route = require("./router/router")
const app = express()

app.use(bodyParser.json())


app.use("/", route)

mongoose.connect("mongodb+srv://amanprajapat82780:Lucky82780@newproject.3qdy8y3.mongodb.net/project_1?retryWrites=true&w=majority",{
    useNewUrlParser:true
}).then(()=>{console.log("Mongoose connected")})
.catch((err)=>console.log(err))

app.listen(process.env.PORT||4000, ()=>{
    console.log("server run on "+(process.env.PORT||4000))
})