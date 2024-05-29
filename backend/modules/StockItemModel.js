import mongoose from "mongoose";

const stockItem = mongoose.Schema(
    {
        product: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        photoUrl: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    },
);

export const StockItem = mongoose.model('SI', stockItem);

