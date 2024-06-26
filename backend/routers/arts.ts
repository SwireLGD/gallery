import express from "express";
import auth, { RequestWithUser } from "../middleware/auth";
import { ArtMutation } from "../types";
import Art from "../models/Art";
import mongoose from "mongoose";
import { imagesUpload } from "../multer";

const artsRouter = express.Router();

artsRouter.get('/', async (req, res) => {
    try {
        const arts = await Art.find();
        return res.send(arts);
    } catch (e) {
        return res.sendStatus(500);
    }
});

artsRouter.get('/author/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const arts = await Art.find({ userId });
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
        image: req.file ? req.file.filename : null,
        author: req.user.displayName,
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

export default artsRouter;

function clearImages(filename: string) {
    throw new Error("Function not implemented.");
}
