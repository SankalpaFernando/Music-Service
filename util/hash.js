const bcrypt = require('bcrypt')

const hashPassword=async(password)=>{
   return await bcrypt.hash(password, 10);
};
const comparePassword=async(assumePassword,passwordHash)=>{
    return await bcrypt.compare(assumePassword, passwordHash);
}


module.exports ={hashPassword,comparePassword};