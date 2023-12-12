import express from 'express';
const router = express.Router();
import { adminCreate,adminAccept } from '../controller/AdminController.js'


router.post('/create',adminCreate)
router.post('/accept',adminAccept)




export default router;