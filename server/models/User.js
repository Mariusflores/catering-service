
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    id:{
        type: String,
        unique: true,
        required:true,
    },
    username:{
        type: String,
        unique: false,
        required: true
    },
    password:{
        type:String,
        required: true
    }
});

const User = mongoose.model('User', userSchema)
export default User;