const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Cart } = require("../models");
const AppError = require("../utils/appError");

async function register(data) {
  const existingUser = await User.findOne({ where: { email: data.email } });

  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  const password = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password,
    role: data.role
  });

  await Cart.create({ userId: user.id });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

async function login(email, plainPassword) {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const validPassword = await bcrypt.compare(plainPassword, user.password);

  if (!validPassword) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
}

module.exports = { register, login };