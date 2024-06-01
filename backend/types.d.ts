import {Types} from "mongoose";

export interface UserFields {
    email: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleID?: string;
    avatar?: string | null;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

export interface ArtMutation {
    title: string;
    art: string | null;
    userId: Types.ObjectId;
    author: string;
}