import mongoose from "mongoose";
import {ROLES} from '../utils/constants.js';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'lastName'
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.USER
    }
})
export default mongoose.model('User', UserSchema);