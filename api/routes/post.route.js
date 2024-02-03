import express from 'express';
import { verifyToken } from './../utils/verifyUser.js';
import { create , deletepost, getposts, updatepost } from '../controllers/post.controller.js';

const router = express.Router();

// Api route for post requests 
router.post('/create', verifyToken, create);

// Api route for get requests 

router.get('/getposts',  getposts);

//Api route for delete posts 

router.delete('/deletepost/:postId/:userID' , verifyToken, deletepost)

//Api route for update posts 

router.put('/updatepost/:postId/:userID', verifyToken , updatepost)

export default router;
