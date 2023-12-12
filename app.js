import express from 'express'
import mysql from 'mysql'
import bookRouter from './Routes/bookRouter.js';
import userRouter from './Routes/userRouter.js';
import adminRouter from './Routes/adminRouter.js'
const app = express();

const port = 5000;

app.use(express.json())

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345678",
    database:'user'
})




app.use('/book',bookRouter);
app.use('/user',userRouter);
app.use('/admin',adminRouter)


app.listen(port,()=>{
    console.log(`connected server at the port ${port}`)
})