const sample_middleware=(req,res,next)=>{
    console.log(req)
    next()
}

module.exports={sample_middleware}



app.delete("/:id", (req, res) => {
    const ids = req.params.id;
    const initialLength = dataa.products.length;
    dataa.products = dataa.products.filter((val) => val.id != ids);
    
    if (dataa.products.length < initialLength) {
      res.send({ message: "Product deleted successfully", products: dataa.products });
    } else {
      res.send("Product not found");
    }
  });
  
  app.listen(port, () => {
    console.log("Server has been running on port", port);
  });
  