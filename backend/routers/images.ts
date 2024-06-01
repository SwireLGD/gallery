import express from "express";
import { clearImages, imagesUpload } from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import { ArtMutation } from "../types";
import Art from "../models/Art";
import mongoose from "mongoose";

const artsRouter = express.Router();

artsRouter.get('/', async (req, res) => {
    try {
        const user = typeof req.query.user === 'string' ? req.query.user : undefined;

        let arts;

        if (user) {
            arts = await Art.find({ user }).populate('user');
        } else {
            arts = await Art.find();
        }

        return res.send(arts);
    } catch (e) {
        return res.sendStatus(500);
    }
});

artsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'User must be authenticated.' });
    }

    const artData: ArtMutation = {
        title: req.body.title,
        art: req.file ? req.file.filename : null,
        userId: req.user._id,
    };

    const art = new Art(artData);

    try {
        await art.save();
        return res.send(art);
    } catch (e) {
        if (req.file) {
            clearImages(req.file.filename);
        }
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }

        next(e);
    }
});

artsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'Authentication is required' });
    }

    const art = await Art.findById(req.params.id);

    if (!art) {
        return res.status(404).send({ error: 'art not found' });
    }

    try {
        if (req.user.role.includes('admin') || (art.userId?.toString() === req.user._id.toString())) {
            const result = await Art.deleteOne({ _id: req.params.id});
    
            if (result.deletedCount === 0) {
                return res.status(404).send({ error: 'art not found or unauthorized to delete the item' });
            }
    
            return res.status(204).send();
        } else {
            return res.status(403).send({ error: 'You do not have permission to delete this art' });
        }
    } catch (e) {
        return next(e);
    }
});