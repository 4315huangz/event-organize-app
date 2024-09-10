import {StatusCodes} from 'http-status-codes';
import User from '../models/UserModels.js';
import Event from '../models/EventModels.js';
import cloudinary from 'cloudinary';
import {promises as fs} from 'fs';


export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({_id: req.user.userId});
    const userWithoutPW = user.toJSON();
    res.status(StatusCodes.OK).json({userWithoutPW});
}

export const getAppStatus = async (req, res) => {
    const users = await User.countDocuments();
    const events = await Event.countDocuments();
    res.status(StatusCodes.OK).json({users, events});
}

export const updateUser = async (req, res) => {
    const newUser = {...req.body};
    delete newUser.password;
    //only upload the image if the user sending it, and if uploaded successfully to cloud, remove the local copy
    if(req.file) {
        const response = await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path);
        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }
    const oldUser = await User.findByIdAndUpdate(req.user.userId, newUser);

    //remove old images
    if(req.file && oldUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(oldUser.avatarPublicId);
    }
    res.status(StatusCodes.OK).json({msg: 'The user is updated successfully.'});
}