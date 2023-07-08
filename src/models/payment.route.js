const express=require("express");
const Razorpay=require("razorpay")
const app=express.Router()
var instance = new Razorpay({ key_id: 'rzp_test_1Bn12Hh7QTi9jn', key_secret: 'TlPgpKbAtZs1VzJOeYWXBHx8' })
app.post("/createorder/orderId",async(req,res)=>{
    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      instance.orders.create(options, function(err, order) {
        console.log(order);
        res.send({orderId:order.id})
      });
})
