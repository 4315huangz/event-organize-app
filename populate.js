import Event from './models/EventModels.js';
import User from './models/UserModels.js';
import mongoose from 'mongoose';
import{readFile} from 'fs/promises';
import dotenv from 'dotenv';
dotenv.config();


try {
    await mongoose.connect(process.env.MONGO_URL);
    const user = await User.findOne({email: 'test@test.com'});
    const jsonEvents = JSON.parse(
        await readFile(new URL('./utils/mockData.json', import.meta.url))
    );
    const events = jsonEvents.map((event) => {
        return {...event, createdBy: user._id };
    })
    await Event.deleteMany({createdBy:user._id});
    await Event.create(events);
    console.log("Success!");
    process.exit(0);

} catch (error) {
    console.log(error);
    process.exit(1);
}
