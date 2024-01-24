import { errorHandler } from "../utils/error.js";
import User from "./../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Sign-up Controller
export const Signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json({ message: "Sign up Successful" });
  } catch (error) {
    next(error);
  }
};

// Sign In controller
export const Signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "All fields required"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(400, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, );
    
    const {password : pass , ...rest} = validUser._doc;
     
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        // You can add more cookie options if needed (e.g., secure:true for HTTPS)
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export default { Signup, Signin };
