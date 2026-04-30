const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    //1. Get the token from the header
    const token = req.header("Authorization")?.split(" ")[1];

    if(!token) {
        return res.status(401).json({message: "No Token, Authorization denied"});    
    }

    try {
        //2. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //3. Add user (id, role) to request object
        req.user = decoded;

        //4. Move to the next piece of code
        next();
    } catch (error) {
        res.status(401).json({message: "Token is not valid"});
    }

};

module.exports = verifyToken;