import jwt from "jsonwebtoken";

const authMiddleware =(req, res, next)=>{
    try {
        const token = res.authorization?.split("")[1]
        if(!token){
            return res.status(401).json({message:"No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id
        next()

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default authMiddleware