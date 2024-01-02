const express = require("express")
const _ = require('lodash')
const app = express()
const {v4: uuidv4} = require('uuid')
const crypto = require('crypto')

app.use(express.json())

let users = [{
    idx: uuidv4(),  
    id: 'qwe',
    pwd: encryptPassword("123"),
    name: 'jmg',
    gender: 'male',
    age: 19,
    phone: '010-6646-6546'
}]

function encryptPassword(password) {
    return crypto
        .createHash('sha256')
        .update(password + "ssibal")
        .digest('base64')
}

app.post('/', (req, res) => {
    return res.send("qwe")
})

app.post('/signup', (req, res) => {
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

    users.push(Object.assign(user, {idx:uuidv4()}))
    return res.json({success: true})
})

app.get('/users', (req, res) => {
    return res.json(users)
})

app.patch('/users/:userId', (req, res) => {
    const {userId} = req.params
    const body = req.body

    const userIndex = users.findIndex((user) => {
        return user.id === userId
    })

    const newUser = _.pick(req.body, ['id', 'password', 'name', 'age', 'gender', 'phone'])

    if (newUser.password != undefined)
        newUser.password = encryptPassword(newUser.password)
    
    Object.assign(users[userIndex], newUser)

    return res.json({success: true})
})

app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params
    const filterFunc = (user) => {
        if (user.idx === userId) return false
        return true
    }


    users = users.filter(filterFunc)
    return res.json({success: true})

})

const port = 3000
app.listen(port, () => {
    console.log("app is running on port: "+port)
    
})