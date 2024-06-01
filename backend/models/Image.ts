import { Schema, Types, model } from "mongoose";
import User from "./User";

const gallerySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String || null,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist!',
        }
    },
});

const gallery = model('Gallery', gallerySchema);

export default gallery;