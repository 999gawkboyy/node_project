const express = require("express")
const _ = require('lodash')
const app = express()
const {v4: uuidv4} = require('uuid')

const signupRoute = require('./server/routes/signup')
const signinRoute = require('./server/routes/signin')

const dbConnect = require('./db/connect')
const User = require('./db/users.schema')
const encryptPassword = require('./lib/encryptPassword')
const initExpressApp = require("./server/initExpressApp")

async function a() {
    console.log('db connecting ...')
    await dbConnect()
    console.log('db connected')

    await User.create({
        id: "zxc",
        pwd: "zxc",
        name: "zxc",
        age:123
    })

    console.log(await User.find())
}
a()

initExpressApp(app)

const routes = [
    signinRoute,
    signupRoute
]

routes.forEach(route=> {
    app[route.method][route.path, route.handler]
})

app.post('/', (req, res) => {
    return res.send("qwe")
})


app.get('/users/me', (req, res) => {
    const {idx} = req.session

    const me = users.find(user => {
        return user.idx === idx
    })

    return res.json(me)
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