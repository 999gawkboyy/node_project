const {v4: uuidv4} = require('uuid')
const encryptPassword = require('../lib/encryptPassword')

module.exports = [{
    idx: uuidv4(),  
    id: 'qwe',
    pwd: encryptPassword("123"),
    name: 'jmg',
    gender: 'male',
    age: 19,
    phone: '010-6646-6546'
}]