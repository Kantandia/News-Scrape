const mongoose = require('mongoose');
const schema = mongoose.schema;

const articleSchema = new schema({
    title: {
        type: String,
        required: true
    },
    summary: String,
    link: {
        type: String,
        required: true
    },
    image: String,
    isFav: {
        type: Boolean,
        default: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    }]
})


