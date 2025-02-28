const express = require("express");

const app = express();
app.use(express.json());
const port = 3000;
let dataa = require("./data.json");
//get
app.get("/", (req, res) => {
  res.send(dataa);
});

//post
app.post("/:id", (req, res) => {
  let ids = req.params.id;
  filtered = dataa.products.filter((val) => {
    return val.id == ids;
  });
  if (filtered.length > 0) {
    res.send(filtered);
  } else {
    res.send("product not found");
  }
});

//patch
// productFound = false;

app.patch("/:id", (req, res) => {
  const ids = req.params.id;
  const u_price = req.body.price;

  let productFound = false;
  dataa.products.forEach((element) => {
    if (element.id == ids) {
      element.price = u_price;
      productFound = true;
    }
  });

  if (productFound) {
    res.send(dataa.products);
  } else {
    res.send("Product not found");
  }
});


//delete
app.delete("/:id",(req,res)=>{
    const ids=req.params.id
    


})


app.get
app.listen(port, () => {
  console.log("server has been running");
});

