const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const authorize = function (req, res, next) {
    try {
        //console.log(req.url);
        if(req.url === "/login" || req.url === "/register" || req.url === "/forgot-password" || req.url === "/confirm-otp"){
            return next();
        }
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) throw new Error("Unauthorized");

        const token = req.headers.authorization.split(" ")[1];

        return jwt.verify(token, JWT_SECRET, function (err, data) {
            if (err) throw new Error("Authorize Failed");
            req.body.user = data.user;
            //console.log(req.user);
            next();
        });
    } catch (err) {
        return res.status(401).json({
            message: err.message
        });
    }
};

module.exports = authorize;
