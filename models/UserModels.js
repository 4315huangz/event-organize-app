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

UserSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.password;
    return obj;
}
export default mongoose.model('User', UserSchema);