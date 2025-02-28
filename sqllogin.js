const mysql=require("mysql2")
const connection =mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Sagar#9550",
    database:"movies"
})
connection.connect((err)=>{
    if(err){
        console.log("failed to connect")
    }
    else{
        console.log("connected successfully")
    }
})
module.exports=connection