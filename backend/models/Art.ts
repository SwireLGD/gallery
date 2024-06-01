import { Schema, Types, model } from "mongoose";
import User from "./User";

const artSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String || null,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist!',
        }
    },
});

const Art = model('Art', artSchema);

export default Art;