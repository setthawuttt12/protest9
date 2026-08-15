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

//staf api

const member = require('./routes/Staff/member')
app.use('/api/Staff/member',member)

const topic = require('./routes/Staff/topic')
app.use('/api/Staff/topic',topic)

const indicate = require('./routes/Staff/indicate')
app.use('/api/Staff/indicate',indicate)

const round = require('./routes/Staff/round')
app.use('/api/Staff/round',round)

const eva = require('./routes/Staff/eva')
app.use('/api/Staff/eva',eva)

const commit = require('./routes/Staff/commit')
app.use('/api/Staff/commit',commit)

const doc = require('./routes/Staff/doc')
app.use('/api/Staff/doc',doc)

const score_member6 = require('./routes/Staff/score_member')
app.use('/api/Staff/score_member',score_member6)

app.use((req,res)=> res.status(404).json({message:"Route not Found"}))
app.listen(3001,()=>{

    console.log(`server Running on Port 3001`)

})