const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1]; // Bearer (token)
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          res.status(400);
          throw new Error("The sessions of the user is expired");
        }
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decode.user;
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

module.exports = validateToken;
