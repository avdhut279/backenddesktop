const express=require("express");
const app=express.Router();
const Productmodel=require("./product.model")
const redis=require("../Redis/redis")
app.get("/",async(req,res)=>{
    console.log("ok")
    let{page,limit}=req.query;
    console.log(page,limit)
page=Number(page);
limit=Number(limit)
try{
   let productss=await Productmodel.find({})
    if(page&&limit){
        let x=JSON.parse(await redis.get(`${page}&${limit}`))
        if(x){
        console.log("i am in page and limit")
        return res.send(x)
        }
        let products=await Productmodel.find({}).limit(limit).skip(limit*(page-1))
       await redis.set(`${page}&${limit}`,JSON.stringify({products,totalpages:Math.ceil(productss.length/limit)}))
        return res.send({products,totalpages:Math.ceil(productss.length/limit)})
    }else{
        let redisprodcuts=JSON.parse(await redis.get("products"))
   if(redisprodcuts){
    console.log(" iam in redis all products")
    return res.send(redisprodcuts)
   }
        await redis.set("products",JSON.stringify(productss))
        return res.send(productss)
    }

}catch(e){
return res.send(e.message)
}
})
app.get("/:id",async(req,res)=>{
    const{id}=req.params;
    console.log(id)
try{
    let x=JSON.parse(await redis.get(`${id}`))
    if(x){
        return res.send(x)
    }
    const product=await Productmodel.findOne({_id:id});
      await redis.set(`${id}`,JSON.stringify(product))
    return res.send(product)
}catch(e){
return res.send(e.message)
}
})
module.exports=app