const express = require('express')
const bc = require('bcrypt')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {name_topic} = req.body
        const [rows] = await db.query(`insert into tb_topic(name_topic) values(?)`,[name_topic])
        res.json(rows,{message:'save topic succesful'})
    } catch (error) {
        console.error("Error save topic",error)
        res.status(500).json({message:'Error save topic'})
    }
})

router.put('/update/:id_topic',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {name_topic} = req.body
        const {id_topic} = req.params

        const [rows] = await db.query(`update tb_topic set name_topic=? where id_topic=?`,[name_topic,id_topic])
        res.json(rows,{message:'update topic succesful'})
        
        
    } catch (error) {
        console.error("Error update member",error)
        res.status(500).json({message:'Error update member'})
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const [rows] = await db.query(`select * from tb_topic order by id_topic desc`)
        res.json(rows,{message:'get topic succesful'})
    } catch (error) {
        console.error("Error get topic",error)
        res.status(500).json({message:'Error get topic'})
    }
})

// router.get('/showC',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
//     try {
//         const [rows] = await db.query(`select * from tb_member where role = 'กรรมการประเมิน' order by id_member desc`)
//         res.json(rows,{message:'get memberC succesful'})
//     } catch (error) {
//         console.error("Error get memberC",error)
//         res.status(500).json({message:'Error get memberC'})
//     }
// })


router.delete('/delete/:id_topic',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_topic} = req.params
        const [rows] = await db.query(`delete from tb_topic where id_topic = ?`,[id_topic])
        res.json(rows,{message:'delete topic succesful'})
        
    } catch (error) {
        console.error("Error delete topic",error)
        res.status(500).json({message:'Error delete topic'})
    }
})



module.exports = router