const mongoose = require('mongoose');

// like schema - dynamic reference
const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // this defines the object id of the liked object - it can be a post or a comment
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'  // dynamic reference
    },
    // this field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});


const Like = mongoose.model('Like', likeSchema);
module.exports = Like;