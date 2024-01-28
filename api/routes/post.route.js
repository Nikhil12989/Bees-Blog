import express from 'express';
import { verifyToken } from './../utils/verifyUser.js';
import { create } from '../controllers/post.controller.js';

const router = express.Router();

// Api route for post requests 
router.post('/create', verifyToken, create);

export default router;