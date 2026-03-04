import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    profilePic: {
        url: {
            type: String,
            default: ""
        },
        public_id: {
            type: String,
            default: ""
        }
    } 
},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;