import express from 'express';
const router = express.Router();
import { userRegister,userLogin,getUser,GetVerifiedUser} from '../controller/userController.js'

router.post('/register',userRegister);
router.post('/login',userLogin);
router.get('/get-user',getUser);
router.get('/verified-user',GetVerifiedUser)


export default router;