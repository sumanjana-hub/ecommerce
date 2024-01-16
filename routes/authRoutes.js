const express = require('express');
const { registerController, loginController,testController, forgotPasswordController, updateProfileController } = require("../controllers/authController");
const {requiresignin,isadmin} = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/register", registerController);

router.post ("/login", loginController);

router.post ("/forgot-password", forgotPasswordController);

router.get("/test",requiresignin,isadmin, testController);

router.get("/user-auth", requiresignin, (req,res) =>{
    res.status(200).send({ok:true});
})

router.get("/admin-auth", requiresignin, isadmin, (req,res) =>{
    res.status(200).send({ok:true});
})

router.put("/profile", requiresignin, updateProfileController);


module.exports = router;

