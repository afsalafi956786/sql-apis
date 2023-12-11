import express from 'express';
const router= express.Router();
import { getBook,userAddBook,deleteBook,updateBook }  from '../controller/bookController.js'

router.get('/',getBook);
router.post('/add-book',userAddBook);
router.delete('/delete/:id',deleteBook);
router.put('/update-book/:id',updateBook)




export default router