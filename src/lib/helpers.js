const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (password) => {
   const salt = await bcrypt.genSalt(10);
   const cifrado = await bcrypt.hash(password,salt);
   return cifrado;
};

helpers.comparePassword = async(pass, savedPasss) => {
   try{
        await bcrypt.compare(pass, savedPasss);
   }
   catch(e){
       console.log(e);
   }
};





module.exports = helpers;