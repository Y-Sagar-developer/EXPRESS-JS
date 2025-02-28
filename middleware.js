const express = require("express")
const app=express()
// express.json()
app.use(express.json())

const port=3000

const Middleware=require("./s_midlleware.js")
const middle=Middleware.sample_middleware
console.log(middle)

app.get("/",middle,(req,res)=>{
    // console.log(req)
    res.send("hellow server")

})
app.post("/",(req,res)=>{
    console.log(req.body)
    res.send(req.body)
})
app.listen(port,()=>{
    console.log("server has been running");
    
})