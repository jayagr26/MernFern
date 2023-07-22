import bcrypt from "bcryptjs";

export const isCorrectPassword = ({ currentPassword, input }) => {
  return bcrypt.compareSync(input, currentPassword);
};

export const encryptPassword = ({ password }) => {
  return bcrypt.hashSync(password, 8);
};
