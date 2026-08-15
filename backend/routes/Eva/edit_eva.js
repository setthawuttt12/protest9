const express = require('express')
const db = require('../../db')
const router = express.Router()
const { verifyToken, requireRole } = require('../../middleware/authmiddleware')
const bc = require('bcrypt')

router.get('/', verifyToken, requireRole('ผู้รับการประเมินผล'), async (req, res) => {
    try {
        const id_member = req.user.id_member
        const [rows] = await db.query(`select first_name,last_name,email,username,role from tb_member where id_member=?`, [id_member])
        res.json(rows[0])
    } catch (error) {
        console.error('Error get user', error)
        res.status(500).json({ message: 'Error get user' })
    }
})

router.put('/', verifyToken, requireRole('ผู้รับการประเมินผล'), async (req, res) => {
    try {
        const id_member = req.user.id_member
        const { first_name, last_name, email, username, password, role } = req.body
        if (password && password.trim()) {
            const hash = await bc.hash(password, 10)
            await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,password=?,role=? where id_member='${id_member}'`, [first_name, last_name, email, username, hash, role])
        } else {
            await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,role=? where id_member='${id_member}'`, [first_name, last_name, email, username, role])
        }
        res.json({ message: `Update success` })
    } catch (error) {
        console.error('Error update', error)
        res.status(500).json({ message: 'Error update' })
    }
})

module.exports = router