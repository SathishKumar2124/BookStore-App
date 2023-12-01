const express = require('express')
const Book = require('../models/bookModel')
const router = express.Router()

router.post('/',async(req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear
            ){
                return res.status(400).json({
                    message :"send all the fields correctly"
                })
        }
        const newBook = {
            title:req.body.title ,
            author:req.body.author,
            publishYear:req.body.publishYear,
        }

        const book = await Book.create(newBook)
        return res.status(201).send(book)

    } 
    catch (error) {
        console.log(error)    
    }
});

router.get('/',async(req,res)=>{
    try {
        const books = await Book.find({})
        res.status(201).json({
            count:books.length,
            data:books
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id)
        res.status(201).json(book)
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id',async(req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear
            ){
                return res.status(400).json({
                    message :"send all the fields correctly"
                })
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id,req.body)
        if(!result){
            res.status(401).json({message:"book not found"})
        }
        res.status(201).json("book updated successfully")
    } catch (error) {
        console.log(error)
    }
});

router.delete('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id)
        if(!result){
            res.status(201).json({message:"book not found"})
        }
        res.status(202).json({message:"Book deleted Successfully"})
    } catch (error) {
        res.status(401).json({message:error.message})
    }
})

module.exports = router