const connection=require("./sqllogin.js")
const express=require("express");
app=express()
app.use(express.json());
app.post("/check",(req,res)=>{
    let user_name=req.body.movie
    let user_hero=req.body.hero
    let sql=`select * from movies where name='${user_name}' AND actor='${user_hero}'`
    connection.query(sql,(err,result)=>{
        if(err){
            res.send(err)
        }
        else if(result.length>0){
            res.send(result)
        }
        else{
            res.send("invalid credentials")

        }
    })
})
app.listen(3000,()=>{
    console.log("server is running")
})

