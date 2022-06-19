import bcrypt from "bcrypt";

const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  return await bcrypt.hash(password, salt);
};

const checkHashedPassword = async (passwordText, passwordHashed) => {
  return await bcrypt.compare(passwordText, passwordHashed);
};

export default { getHashedPassword, checkHashedPassword };
