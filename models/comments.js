const mongoose = require('mongoose');
const schema = mongoose.schema;


const commentSchema = new Schema({
    author:  {
        type: String
    },
    content: {
        type: String
    }
  
});


const comments = mongoose.model('comments', commentSchema);

module.exports = comments;