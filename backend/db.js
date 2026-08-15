const mysql2 = require('mysql2')
const db = mysql2.createConnection(
    {
        host:'localhost',
        port:'3307',
        user:'root',
        password:'1234',
        database:'protest9'
    }
)

module.exports = db.promise