const mongoose = require('mongoose')

const id = "qweqwe123"
const pwd = "qweqwe123"
const connectionString = `mongodb+srv://${id}:${pwd}@cluster0.pwkonyc.mongodb.net/?retryWrites=true&w=majority`
module.exports = async function () {
    await mongoose.connect(connectionString)
    console.log('connected')
}