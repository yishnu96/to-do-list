const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    date: {
        type: String
    },
    time:{
        type: String
    },
    type:{
        type: String
    }
})

const List = mongoose.model('List',taskSchema)
module.exports = List;