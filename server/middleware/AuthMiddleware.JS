const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken){
        return res.json({error: "You aren't logged in"})
    }

    try{
        const validToken = verify(accessToken, "importantsecret");
        req.user         = validToken;
        const username   = req.user.username;

        if(validToken){
            return next();
        }
    }catch(err){
            return res.json({error:err});
    }
};

module.exports = { validateToken };