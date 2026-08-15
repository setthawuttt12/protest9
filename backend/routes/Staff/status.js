const express = require('express')
const bc = require('bcrypt')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.get('/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_eva} = req.params
        const [rows] = await db.query(`select * from tb_member m,tb_commit c,tb_eva e where c.id_eva = ? and c.id_eva = e.id_eva and c.id_member = m.id_member`,[id_eva])
        res.json(rows,{message:'commit success'})
    } catch (error) {
        console.error("Error GET commit",err)
        res.status(500).json({message:'Error GET commit'})
    }
})

module.exports = router