const express = require('express')
const bc = require('bcrypt')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {first_name,last_name,email,username,password,role} = req.body
        const hash = await bc.hash(password,10)
        const [rows] = await db.query(`insert into tb_member(first_name,last_name,email,username,password,role) values(?,?,?,?,?,?)`,[first_name,last_name,email,username,hash,role])
        res.json(rows,{message:'save member succesful'})
    } catch (error) {
        console.error("Error save member",error)
        res.status(500).json({message:'Error save member'})
    }
})

router.put('/update/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {first_name,last_name,email,username,password,role} = req.body
        const {id_member} = req.params
        if(password && password.trim()){
            const hash = await bc.hash(password,10)
            const [rows] = await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,password=?,role=? where id_member = ?`,[first_name,last_name,email,username,hash,role,id_member])
            res.json(rows,{message:'update member succesful'})
        }else{
            const [rows] = await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,role=? where id_member = ?`,[first_name,last_name,email,username,role,id_member])
            res.json(rows,{message:'update member succesful'})
        }
        
    } catch (error) {
        console.error("Error update member",error)
        res.status(500).json({message:'Error update member'})
    }
})

router.get('/showE',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const [rows] = await db.query(`select * from tb_member where role = 'ผู้รับการประเมินผล' order by id_member desc`)
        res.json(rows,{message:'get memberE succesful'})
    } catch (error) {
        console.error("Error get memberE",error)
        res.status(500).json({message:'Error get memberE'})
    }
})

router.get('/showC',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const [rows] = await db.query(`select * from tb_member where role = 'กรรมการประเมิน' order by id_member desc`)
        res.json(rows,{message:'get memberC succesful'})
    } catch (error) {
        console.error("Error get memberC",error)
        res.status(500).json({message:'Error get memberC'})
    }
})


router.delete('/delete/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_member} = req.params
        const [rows] = await db.query(`delete from tb_member where id_member = ?`,[id_member])
        res.json(rows,{message:'delete member succesful'})
        
    } catch (error) {
        console.error("Error delete member",error)
        res.status(500).json({message:'Error delete member'})
    }
})



module.exports = router