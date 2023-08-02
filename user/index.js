const bcrypt = require("bcrypt");

const createHashPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

const compareHashPassword = async (
  password,
  hashPassword
) => {
  const comparePassword = await bcrypt.compare(
    password,
    hashPassword
  );
  return comparePassword;
};

module.exports = {
  createHashPassword,
  compareHashPassword,
};
