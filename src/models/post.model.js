import mongoose  from "mongoose";

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    imageFile: {
        url: {
            type: String,
            default: ""
        },
        public_id: {
            type: String,
            default: ""
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

},{timestamps: true});

const Post = mongoose.model("Post", postSchema);

export default Post;