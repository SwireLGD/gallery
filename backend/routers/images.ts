import express from "express";
import Image from "../models/Image";

const imagesRouter = express.Router();

imagesRouter.get('/', async (req, res) => {
    try {
        const user = typeof req.query.user === 'string' ? req.query.user : undefined;

        let images;

        if (user) {
            images = await Image.find({ user }).populate('user');
        } else {
            images = await Image.find();
        }

        return res.send(images);
    } catch (e) {
        return res.sendStatus(500);
    }
});

imagesRouter.post('/') 