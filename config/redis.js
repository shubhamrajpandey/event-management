const redis = require("redis");

const redisClient = redis.createClient({
    url: "redis://localhost:6379",
})

redisClient.connect();

redisClient.on("connect",()=>{
    console.log("Redis Connected");
})

module.exports = redisClient;