const {Schema, model} = require('mongoose')

const schema= new Schema({
    users:{type: Array, required: true},
    name:{type: String, required: true, unique: true},
    lastUpdate:{type: Date, required: true}
})

module.exports=model('Room',schema)
