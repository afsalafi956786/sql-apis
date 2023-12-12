import bcrypt from 'bcrypt'
import { JWT_SECRET } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';
import { db } from '../app.js'
import { response } from 'express';


export async function adminCreate (req,res){

    const { email ,password } = req.body;

    if(!email){
        return res.status(404).json({ message:"Email is required"});
    }

    if(!password){
        return res.status(404).json({ message:"password is required"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password,salt);

    const admin = "INSERT INTO admin (`email`,`password`) VALUES (?,?) ";
    const values = [email,hashPass];

    db.query(admin,values,(err,data)=>{
        if(err) return res.status(500).json("Internal server error");
        return res.status(200).json({ message:"Admin created "})
    })  

}


export async function adminAccept (req,res){

    try{
        const { approve, id } = req.body;
        let kycVerification;

        if(approve === true){
            kycVerification = 1
        }else if(approve === false){
            kycVerification = 0;
        }else {
            return res.status(400).json({ error: "Invalid input parameters." });
        }

        const updateStatus = "UPDATE user SET kycVerification = ? WHERE id = ?";
        db.query(updateStatus,[kycVerification,id],(err,data)=>{
            if(err) return res.status(500).json({ error: "Internal server error." });

         //sedn rsponse 
        const responseMessage = approve ? "KYC verification approved" : "KYC verifiation Rejected";
        return res.status(200).json({ message:responseMessage})
        })
    }catch(error){
        return res.status(500).json({ error: "Internal server error." });
    }
}