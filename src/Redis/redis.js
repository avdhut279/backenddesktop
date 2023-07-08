const Redis= require("ioredis")
 const redis=new Redis({
    port: 16613, // Redis port
    host: "redis-16613.c301.ap-south-1-1.ec2.cloud.redislabs.com", // Redis host
    username: "default", // needs Redis >= 6
    password: "nRDFWmwa0VbFhi8wYIymT6UI3PPJ4oko",
    db: 0, // Defaults to 0
})
module.exports=redis