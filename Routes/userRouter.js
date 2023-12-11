import express from 'express';
const router = express.Router();
import { userRegister,userLogin} from '../controller/userController.js'

router.post('/register',userRegister);
router.post('/login',userLogin)


export default router;