import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//root for save new book
router.post("/", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send("All input is required: title, author, publishYear");
        }

        const newBook ={
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        // responding with status 201 for sending book to the client
        return response.status(201).send(book);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//route for getting all books
router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.lenght,
            data: books
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//route for get one book from database using id
router.get("/:id", async (request, response) => {
    try {
        const{id} = request.params;
        const book = await Book.findById(id);
        
        return response.status(200).json({book});
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//route for update a Book
router.put("/:id", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({message: "All input is required: title, author, publishYear"});
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({message: "Book not found"});
        }
        return response.status(200).send({message: "Book updated successfully"});
    }

    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


//route for delete a book
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({message: "Book not found"});
        }
        return response.status(200).send({message: "Book Deleted successfully"});
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router