import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp =async (req, res)=>{
    try{
        const {name, email, password, skills} = req.body;
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({message:"User with this email already exists"})
        }
    
        const saltRounds=10;
        const hashedPassword= await bcryptjs.hash(password, saltRounds)
    
        const addUser = {name, email, password:hashedPassword, skills}
        const newUser = await User.create(addUser)
    
        const genToken =  jwt.sign({email:email, id:newUser._id}, process.env.JWT_SECRET, {expiresIn:'10d'})

        res.status(201).json({
            message:"User created successfully",
             user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        skills: newUser.skills
    },
            token:genToken
        })
    }catch(error){
        console.error("Error in registration:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const login = async(req, res)=>{
    try{

        const {email, password} = req.body;
        const findUser = await User.findOne({email})
        if(!findUser){
            return res.status(403).json({message: "User with this email doesn't exist"})
        }
    
        const isPasswordValid = await bcryptjs.compare(password, findUser.password)
        if (!isPasswordValid) {
        return res.status(401).json({ err: "Invalid credentials" });
      }
    
      const genToken =  jwt.sign({email:email, id:findUser._id}, process.env.JWT_SECRET,{expiresIn:"10d"});
       return res.status(200).json({
        success: "User Logged In successfully",
        token: genToken,
        id: findUser._id,
      });
    }catch(error){
        console.error("Error Logging in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export { signUp, login };