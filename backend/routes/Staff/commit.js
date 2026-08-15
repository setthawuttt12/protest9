const express = require('express')
const bc = require('bcrypt')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_eva} = req.params
        await db.query(`delete from tb_commit where id_eva = ?`,[id_eva])
        const m = req.body
        const v = m.map(p => [id_eva,p.id_member,'n',p.role])
        const [rows] = await db.query(`insert into tb_commit(id_eva,id_member,status_commit,level_commit) values ?`,[v])
        res.json(rows,{message:'save commit succesful'})
    } catch (error) {
        console.error("Error save commit",error)
        res.status(500).json({message:'Error save commit'})
    }
})


router.get('/header/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_eva} = req.params
        const [rows] = await db.query(`select * from tb_member m ,tb_eva e,tb_system s where e.id_eva = ? and m.id_member = e.id_member and e.id_sys = s.id_sys`,[id_eva])
        res.json(rows[0],{message:'get header succesful'})
    } catch (error) {
        console.error("Error get header",error)
        res.status(500).json({message:'Error get header'})
    }
})

router.get('/member/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_eva} = req.params
        const [pick] = await db.query(`select id_member,concat(first_name,'',last_name)as fullname_commit from tb_member where role = 'กรรมการประเมิน' order by id_member desc`)
        const [picked] = await db.query(`select m.id_member,id_commit,first_name,last_name,level_commit as role from tb_member m,tb_eva e,tb_commit c where c.id_eva = ? and c.id_eva = e.id_eva and c.id_member = m.id_member`,[id_eva])
        res.json({pick,picked})
    } catch (error) {
        console.error("Error get commit",error)
        res.status(500).json({message:'Error get commit'})
    }
})


router.delete('/delete/:id_commit',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_commit} = req.params
        const [rows] = await db.query(`delete from tb_commit where id_commit = ?`,[id_commit])
        res.json(rows,{message:'delete commit succesful'})
        
    } catch (error) {
        console.error("Error delete commit",error)
        res.status(500).json({message:'Error delete commit'})
    }
})



module.exports = router