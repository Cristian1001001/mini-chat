const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    roomId: {type: Types.ObjectId, required: true, ref: 'Room'},
    sentDate:{type: Date, required: true},
    userId: {type: Types.ObjectId, required:true, ref: 'User'},
    message:{type: String, required: true}
})

module.exports=('Messages', schema)
