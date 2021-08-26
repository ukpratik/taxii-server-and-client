const jwt = require("jsonwebtoken");
const cookieparser = require('cookie-parser')

const config = process.env;

function verifyToken(req, res, next){
  const token = req.body.token || req.cookies.token || req.headers["token"];
  console.log(req.headers)
  console.log()
  console.log(req.cookies)
  // console.log(req.user)
  if (!token) {
    // console.log(req.headers)
    return res.status(403).send("A token is required for authentication");
  }
  try {
    // console.log(req.user)
    jwt.verify(token, 'swsh23hjddnns', function(err,decoded){
      console.log(token)
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      console.log(decoded)
      return next();
    });
    // req.user = decoded
    // console.log(req.user)
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  // return next();
};

module.exports = verifyToken;