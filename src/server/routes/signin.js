const users = require("../../db/users.schema")
const encryptPassword = require("../../lib/encryptPassword")
const express = require("express")
const _ = require('lodash')
const app = express()
module.exports = {
    path: '/signin',
    method: 'post',
    handler: (req, res) => {
        const {id, pwd} = req.body

        let success = false
    
        function findUserByIdAndPassword() {
            const user = users.find(user => {
                return user.id === id && user.pwd == encryptPassword(pwd)
            })
            return user
        }
    
        const user = findUserByIdAndPassword()
    
        if (user !== undefined) {
            success = true
            req.session.idx = user.idx
        }
    
        return res.json({success})
    }
}