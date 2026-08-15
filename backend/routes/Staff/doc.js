const express = require('express')
const bc = require('bcrypt')
const path = require('path')
const uploadDir = path.join(__dirname,'../../uploads/document')
const fs = require('fs')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const file = req.files?.file
        const {name_doc} = req.body
        const maxSize = 10 * 1024 * 1024
        if(file.size > maxSize){
            return res.status(403).json({message:'ไฟล์มีขนาดใหญ่เกิน 10MB'})
        }
        const filename = Date.now() + path.extname(file.name)
        await file.mv(path.join(uploadDir,filename))
        
        const [rows] = await db.query(`insert into tb_doc(name_doc,day_doc,file) values(?,CURDATE(),?)`,[name_doc,filename])
        res.json(rows,{message:'doc succesful'})
    } catch (error) {
        console.error("Error doc",error)
        res.status(500).json({message:'Error doc'})
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const [rows] = await db.query(`select * from tb_doc order by id_doc desc`)
        res.json(rows,{message:'get doc succesful'})
    } catch (error) {
        console.error("Error get doc",error)
        res.status(500).json({message:'Error get doc'})
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


router.delete('/delete/:id_doc',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_doc} = req.params
        const [[d]] = await db.query(`select file from tb_doc`)
        const fp = path.join(uploadDir,d.file)
        if(fs.existsSync(fp)){
            fs.unlinkSync(fp)
        }
        const [rows] = await db.query(`delete from tb_doc where id_doc = ?`,[id_doc])
        res.json(rows,{message:'delete doc succesful'})
        
    } catch (error) {
        console.error("Error delete doc",error)
        res.status(500).json({message:'Error delete doc'})
    }
})

module.exports = router