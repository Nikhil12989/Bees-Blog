import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
    console.log(req.user);
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Title and content are required"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/\/$/, "");

  const newPost = new Post({
    ...req.body,
    slug,
    userID: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    return next(errorHandler(500, "Error saving the post"));
  }
};