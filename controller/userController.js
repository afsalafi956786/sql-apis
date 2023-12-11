import { db } from '../app.js'
import bcrypt from 'bcrypt'
import { JWT_SECRET } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';




export function userRegister (req,res) {
    const { phone,email,name,password } = req.body;

    if(!name){
        return res.status(404).json({ error :"Name is required"})
    }

    if(!email){
        return res.status(404).json({ error :"email is required"})
    }
    if(!phone){
        return res.status(404).json({ error :"phone is required"})
    }
    if(!password){
        return res.status(400).json({ error:"password is reqiured"})
    }

    //check if email is alreay used or not 
    const existEmail = "SELECT * FROM user WHERE email = ?";
    db.query(existEmail,[email],async (err,data)=>{
        if(err){
            return res.status(400).json(err);
        }
        if(data.length>0){
            return res.status(400).json({error:"This email is already registered"})
        }


    const existPhone = "SELECT * FROM user WHERE phone = ?" 
    db.query(existPhone,[phone],async (err,data)=>{
        if(err){
            return res.status(400).json({ err })
        }
        if(data.length>0){
            return res.status(400).json({ error:"This phone number is already taken"})
        }



        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);

    const user = "INSERT INTO user (`name`, `email`, `phone`,`password`) VALUES (?, ?, ?,?)";
    const values =[
        name,
        email,
        phone,
        hashPass
      
    ];
    db.query(user,values,(err,data)=>{
        if(err) return res.json(err)
        return res.json({ message:"User Registeration completed succssfully",values})
    })
})

})  
}


export function userLogin (req,res){
    const { email ,password } = req.body;

    if(!email){
        return res.status(404).json({ message:"Email is requried"})
    }
    if(!password){
        return res.status(404).json({ message:"Please enter your password"})
    }
    const existUser = "SELECT * FROM user WHERE email = ?";
    db.query(existUser,[email],async (err,data)=>{
        if(err) return res.status(400).json({ err });
        if(data.length ===0){
            return res.status(404).json({ error:"User not found"})
        }
        const hashedPassword = data[0].password;
        const passwordMatch = await bcrypt.compare(password,hashedPassword);

        if(!passwordMatch){
            return res.status(401).json({ error:"Incorrect password" })
        }
       try{
            const token =jwt.sign({ id: data[0].id,email:data[0].email,phone:data[0].phone },
            JWT_SECRET,
            { expiresIn :'1y'}
            )

            return res.status(200).json({ message:'Login successful',token,user:data[0]})
       }catch(error){
        console.log(error)
        return res.status(500).json({ message:'Internal server error'})
       }
 
    })
}