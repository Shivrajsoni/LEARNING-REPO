const jwt = require("jsonwebtoken");

function generateToken(username){
    const token = jwt.sign({username},"HULU", {
        expiresIn: '1h'
        });
        return token;
}

module.exports=generateToken;