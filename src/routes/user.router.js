import userController  from '../controllers/user.controller.js';
import express from 'express';
 
const router = express.Router();

router.get('/getAllUser', userController.getAllUser);


export default router;