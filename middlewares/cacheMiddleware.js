const redisClient = require("../config/redis");

const cacheEvents = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return next(); 
    }

    const userId = req.user.id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const safePage = page > 0 ? page : 1;
    const safeLimit = limit > 0 && limit < 100 ? limit : 10;

    const cacheKey = `events:${userId}:page:${safePage}:limit:${safeLimit}`;

    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Events served from Redis cache");
      return res.status(200).json(JSON.parse(cachedData));
    }

    req.cacheKey = cacheKey;
    next();

  } catch (err) {
    console.error("Cache middleware error:", err.message);
    next();
  }
};

module.exports = { cacheEvents };
