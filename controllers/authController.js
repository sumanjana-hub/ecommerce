const userModel = require("../models/userModel.js");
const { hashPassword, comparepassword } = require("../helpers/authHelper.js");
const jwt = require("jsonwebtoken");
JWT_SECRET = "HDHCDKIDIJDKJDKDK1234";

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        if (!name) {
            return res.send({ message: "Name is required" });
        }
        if (!email) {
            return res.send({ message: "Email is required" });
        }
        if (!password) {
            return res.send({ message: "Password is required" });
        }
        if (!phone) {
            return res.send({ message: "Phone is required" });
        }
        if (!address) {
            return res.send({ message: "Address is required" });
        }
        if (!answer) {
            return res.send({ message: "Answer is required" });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already registered, please login"
            });
        }

        const hashedPassword = await hashPassword(password);

        const user = new userModel({
            name,
            email,
            phone,
            address,
            answer,
            password: hashedPassword
        });

        await user.save();

        res.status(201).send({
            success: true,
            message: "Registered successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Failed in registration",
            error
        });
    }
};

const loginController = async(req,res)=>{
      try {
         const {email,password} = req.body;
         if(!email||!password){
            return res.status(404).send({
                success: false,
                message: "Inavalid email or password",
            })
         }
        const user = await userModel.findOne({ email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email not found",
            })
        }
         const match = await comparepassword(password,user.password)
         if(!match){
            return res.status(200).send({
                success: false,
                message: "Inavalid  password",
            })
         }
         const token = await jwt.sign({_id:user._id},JWT_SECRET,{expiresIn:"7d"});
         res.status(200).send({
            success: true,
            message: "Login successfully",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
         })
      } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
      }
}

const forgotPasswordController = async(req,res) =>{
       try {
           const {email,answer,newpassword} = req.body
           if(!email){
            res.status(400).send({message:"Please enter your email"})
           }
           if(!answer){
            res.status(400).send({message:"Please enter your answer"})
           }
           if(!newpassword){
            res.status(400).send({message:"Please enter your newpassword"})
           }
           const user = await userModel.findOne({email, answer})

           if(!user){
            return res.status(404).send({
                success: false,
                message: "wrong email or answer"
            })
           }
           const hashed = await hashPassword(newpassword)
           await userModel.findByIdAndUpdate(user._id, {password:hashed});
           res.status(200).send({
            success: true,
            message: "Password changed successfully"
           })
       } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "something went wrong",
            error
        })
       }
}
const testController = async(req, res) =>{
    try {
        res.send("Protected Routes");
      } catch (error) {
        console.log(error);
        res.send({ error });
      }
    
}

const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };
  



module.exports = { registerController,loginController,testController,forgotPasswordController,updateProfileController };
