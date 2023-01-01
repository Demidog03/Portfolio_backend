import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    username: {type: String, required: true},
    title: {type: String, required: true},
    text: {type: String, required: true},
    imgUrl: {type: String, default: '', required: true},
    views: {type: Number, default: 0},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
},
    {timestamps: true}
)

export default mongoose.model('Post', PostSchema)