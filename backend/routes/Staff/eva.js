const express = require('express')
const bc = require('bcrypt')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_member,id_sys,day_eva} = req.body
        const [rows] = await db.query(`insert into tb_indicate(id_member,id_sys,day_eva,status_eva) values(?,?,?,?)`,[id_member,id_sys,day_eva,1])
        res.json(rows,{message:'save eva succesful'})
    } catch (error) {
        console.error("Error save eva",error)
        res.status(500).json({message:'Error save eva'})
    }
})

router.put('/update/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_member,id_sys,day_eva} = req.body
        const {id_eva} = req.params

        const [rows] = await db.query(`update tb_eva set id_member=?,id_sys=?,day_eva=? where id_eva=?`,[id_member,id_sys,day_eva,id_eva])
        res.json(rows,{message:'update eva succesful'})
        
        
    } catch (error) {
        console.error("Error update eva",error)
        res.status(500).json({message:'Error update eva'})
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const [rows] = await db.query(`select * from tb_member m ,tb_eva e,tb_system s where m.id_member = e.id_member and e.id_sys = s.id_sys`)
        res.json(rows,{message:'get eva succesful'})
    } catch (error) {
        console.error("Error get eva",error)
        res.status(500).json({message:'Error get eva'})
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


router.delete('/delete/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_eva} = req.params
        const [rows] = await db.query(`delete from tb_eva where id_eva = ?`,[id_eva])
        res.json(rows,{message:'delete eva succesful'})
        
    } catch (error) {
        console.error("Error delete eva",error)
        res.status(500).json({message:'Error delete eva'})
    }
})



module.exports = router