const bcrypt = require('bcrypt');

export async function genSalt(){
    return await bcrypt.genSalt();
}

export async function hashPassword(password : string, salt : string){
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(password : string, hashedPassword : string){
  return await bcrypt.compare(password, hashedPassword);
}
