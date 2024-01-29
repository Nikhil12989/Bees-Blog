import express from 'express';
import { verifyToken } from './../utils/verifyUser.js';
import { create , getposts } from '../controllers/post.controller.js';

const router = express.Router();

// Api route for post requests 
router.post('/create', verifyToken, create);

// Api route for get requests 

router.get('/getposts',  getposts);

export default router;
