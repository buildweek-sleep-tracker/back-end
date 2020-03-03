const jwt = require("jsonwebtoken");
const jwtSecret = require("./jwtSecret");

module.exports = (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization)
        { res.status(400).json({message: "You must log in first to view this resource."})}
    
    else
        {
            jwt.verify(authorization, jwtSecret, (error, decodedToekn) => {
                if (error)
                    { res.status(403).json({message: "Invalid credentials."})}
                else
                    {
                        req.decodedToken = decodedToken;
                        next();
                    }
            })
        }
}