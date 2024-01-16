const bcrypt = require("bcrypt");

 const hashPassword = async(password) =>{
       try {
            const saltround = 10;
            const hashPassword = await bcrypt.hash(password, saltround)
            return hashPassword;
       } catch (error) {
          console.log(error);
       }
}


 const comparepassword = async (password, hashPassword)=>{
    return bcrypt.compare(password, hashPassword)
}

module.exports = {hashPassword, comparepassword}