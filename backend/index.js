require('dotenv').config({path:'.env'})
const fileUp = require('express-fileupload')
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use(fileUp())
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
app.use(express.json())

const auth = require('./routes/auth')
app.use('/api/auth',auth)

app.use((req,res)=> res.status(404).json({message:"Route not Found"}))
app.listen(3001,()=>{

    console.log(`server Running on Port 3001`)

})