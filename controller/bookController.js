import { db } from '../app.js';
import  bcrypt  from 'bcrypt'

export async function getBook (req,res){
        const sql = "SELECT * FROM books"
        db.query(sql,(err,data)=>{
            if(err)  return  res.json(err);
            return res.json(data)
        })

    
}

export async function userAddBook (req,res){
     const book = "INSERT INTO books (`title`,`discription`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
    ];
    db.query(book,[values],(err,data)=>{
        if(err)  return res.json(err)
        return res.json("Book Added succssfully")
    })
}

export async function  deleteBook (req,res){
    const bookId = req.params.id
     const deletBook = "DELETE FROM books WHERE id = ?"
     db.query(deletBook,[bookId],(err,data)=>{
        if(err) return res.json(err.message);
        return res.json("Book deleted successfuly")
     })

}

export async function updateBook(req, res) {
    const { id } = req.params;
    const updateBook = "UPDATE books SET `title`=?, `discription`=?, `cover`=? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.discription,
        req.body.cover
    ];
    db.query(updateBook, [...values, id], (err, data) => {
        if (err) throw res.json(err.message);
        return res.status(200).json({ message: "Book updated successfully", data });
    });
}
