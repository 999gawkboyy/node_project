const _ = require('lodash')
const {v4: uuidv4} = require('uuid')
const users = require('../../db/users')
const encryptPassword = require('../../lib/encryptPassword')

module.exports = {
    path: '/signup',
    method: 'post',
    handler: (req, res) => {
        const user = _.pick(
            req.body,
            [
                'id',
                'pwd',
                'name',
                'gender',
                'age',
                'phone'
            ]
        )
        
    const isduplicated = users.find(u => {
        return u.id === user.id
    })

    if (isduplicated === undefined) {
        users.push(Object.assign(user, {
            idx:uuidv4(),
            ...(user.pwd !== undefined && {
                pwd: encryptPassword(user.pwd)
            })
        }))
        return res.json({success: true})
    }
    return res.status(400).json({success: false})
    }
}