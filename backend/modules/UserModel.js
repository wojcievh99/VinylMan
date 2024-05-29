import mongoose from "mongoose";

const user = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        favourites: {
            type: Array,
            required: true
        },
        cart: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true,
    },
);

export const User = mongoose.model('USER', user);

