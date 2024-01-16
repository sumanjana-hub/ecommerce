const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");
const JWT_SECRET = "HDHCDKIDIJDKJDKDK1234";

//protected route

const requiresignin = async(req,res,next)=>{
         try {
            const decode = jwt.verify(req.headers.authorization, JWT_SECRET);
            req.user = decode;
            next();
         } catch (error) {
            console.log(error);
         }
}

const isadmin = async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !==1){
            return res.status(401).send({
                success: false,
                message: "Unauthorised access"
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {requiresignin,isadmin}