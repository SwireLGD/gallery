import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Art from "./models/Art";
import { randomUUID } from "crypto";

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('arts');
    } catch (e) {
        console.error('Error dropping collections:', e);
    }

    const [user1, user2] = await User.create({
        email: 'Liliweiss@example.com',
        displayName: 'Liliweiss',
        password: 123,
        token: randomUUID(),
        role: 'admin',
        avatar: 'fixtures/liliweiss.jpg',
    }, {
        email: 'swire@example.com',
        displayName: 'Swire',
        password: 123,
        token: randomUUID(),
        role: 'user',
        avatar: 'fixtures/swire.jpg',
    });

    const arts = await Art.create({
        title: 'art1',
        art: 'fixtures/art1.jpg',
        author: user1.displayName,
        userId: user1._id,
    }, {
        title: 'art2',
        art: 'fixtures/art2.jpg',
        author: user1.displayName,
        userId: user1._id,
    }, {
        title: 'art3',
        art: 'fixtures/art3.jpg',
        author: user1.displayName,
        userId: user1._id,
    }, {
        title: 'art4',
        art: 'fixtures/art4.jpg',
        author: user2.displayName,
        userId: user2._id,
    }, {
        title: 'art5',
        art: 'fixtures/art5.jpg',
        author: user2.displayName,
        userId: user2._id,
    }, {
        title: 'art6',
        art: 'fixtures/art6.jpg',
        author: user2.displayName,
        userId: user2._id,
    });

    console.log('Fixtures created successfully');
    await db.close();
};

run().catch(console.error);