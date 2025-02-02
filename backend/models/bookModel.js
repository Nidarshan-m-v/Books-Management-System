import mongoose from "mongoose";
// The Book model is created here

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
    },
        { 
            timestamps: true 
        }
);
export const Book = mongoose.model('Book', bookSchema);
