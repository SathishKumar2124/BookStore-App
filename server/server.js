const express = require('express')
const {PORT,MongoURL} = require('./config')
const mongoose = require('mongoose')
const Book = require('./models/bookModel')
const cors = require('cors')
const router = require('./routes/bookRoutes')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send("welcome to mern app")
})

app.use('/books',router)

mongoose.connect(MongoURL)
.then(()=>{
    console.log("database is connected")
}).catch((err) => { console.log(err)})

app.listen(PORT,()=>{
    console.log(`server is running in port ${PORT}`)
})