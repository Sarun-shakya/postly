import mongoose  from "mongoose";

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

},{timestamps: true});

const Post = mongoose.model("Post", postSchema);

export default Post;