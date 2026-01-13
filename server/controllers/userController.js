// controller for user registration
// POST : /api/users/register

import User from "../models/Usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/resume.js";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("REQ BODY:", req.body);

    // check if required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // check if user already exists
    const user = await User.findOne({ email });
    console.log("EXISTING USER:", user);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user and hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed!");

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("USER CREATED:", newUser);

    const count = await User.countDocuments();
    console.log("TOTAL USERS IN DB:", count);

    // retur success message

    const token = generateToken(newUser._id);
    newUser.password = undefined;

    return res
      .status(201)
      .json({ message: "User created successfully", token, user: newUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for user login
// POST : /api/users/login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if required fields are present
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check if pasword is correct
    if (!user.comparePassword(password)) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // return success message

    const token = generateToken(user._id);
    user.password = undefined;

    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for getting user by id
// GET : /api/user/data

export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    // check if user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    // return user
    user.password = undefined;
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for getting user resumes
// GET : /api/users/resumes

export const getResumes = async (req, res) => {
  try {
    const userId = req.userId;

    // return user resumes
    const resumes = await Resume.find({ userId });
    return res.status(200).json({ resumes });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
