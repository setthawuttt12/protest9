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

const pf = require('./routes/profile')
app.use('/api/profile',pf)

const d = require('./routes/docnoe')
app.use('/api/docnoe',d)

const dash = require('./routes/dash')
app.use('/api/dash',dash)

//eva

const selfeva = require('./routes/Eva/selfeva')
app.use('/api/Eva/selfeva',selfeva)

const edit_eva = require('./routes/Eva/edit_eva')
app.use('/api/Eva/edit_eva',edit_eva)

const score_member = require('./routes/Eva/score_member')
app.use('/api/Eva/score_member',score_member)

app.use((req,res)=> res.status(404).json({message:"Route not Found"}))
app.listen(3001,()=>{

    console.log(`server Running on Port 3001`)

})