const jwt = require("jsonwebtoken");


exports.user=async(req,res,next)=>{
    try {
        let token = req?.headers?.authorization;
        if (!token) {
            return res.json({ message: "No Token Found" ,statusCode:400 });
        }
    
        try {
            const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = verify.user_id;
            req.role = verify.role_id;
            req.tenant = verify.tenant_id;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.json({ message: "please login session expired",statusCode:400 });
            } else if (error.name === 'JsonWebTokenError') {
                return res.json({ message: "please login session expired",statusCode:400 });
            } else {
                return res.json({ message: "invalid user please login again",statusCode:400 });
            }
        }
    } catch (error) {
        return res.status(200).send({message:error.message})
    }
}