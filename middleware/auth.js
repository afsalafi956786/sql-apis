
import jwt from 'jsonwebtoken';


export const JWT_SECRET ='MySecret'

export async function verifyToken (req,res,next){
    try{
        const token = req.headers.authorizarion || req.query.token;

        if(!token){
            return res.status(401).json({ message: 'Token not found' });
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decode.userId;

        next();

    }catch(error){
        console.log(error.message)
        return res.status(401).json({ message: 'Invalid token' });
    }
}
