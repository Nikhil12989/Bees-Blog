import express from 'express';
import { Signin, Signup , google} from '../controllers/auth.controller.js';





const router = express.Router(); 


//Api route for sign-up
router.post('/signup' , Signup)


//Api route fro sign-in
router.post('/signin', Signin)

//Api route from google
router.post('/google' , google)

export default router