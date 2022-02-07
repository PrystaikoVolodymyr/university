const bcrypt = require('bcrypt')


module.exports = {
 async hasher (password) {
   return await bcrypt.hash(password, 12)
 },
 async compare (password, hashPassword) {
   const isPasswordEquals = await bcrypt.compare(password, hashPassword)
   if (!isPasswordEquals) {
    throw new Error('Wrong Email or Password');
   }
 }
}