
const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    date: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Item', ItemSchema);

