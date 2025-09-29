import express, { Request, Response } from "express";
import { success, z } from "zod";
import { Book } from "../models/book.model";
const bookRouter = express.Router();

const BookZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().min(1, "Genre is required"),
  isbn: z.string().min(1, "ISBN is required"),
  description: z.string().min(1, "Description is required"),
  copies: z.number().positive("Copies must be a positive number"),
  available: z.boolean().optional().default(true),
});

bookRouter.post("/books", async (req: Request, res: Response) => {
  try {
    const parsedData = await BookZodSchema.safeParseAsync(req.body);

    if (!parsedData.success) {
      const errors = parsedData.error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors,
      });
    }

    const newBook = await Book.create(parsedData.data);
    return res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      const errors = error.issue.map((e: any) => ({
        filed: e.path.join(" . "),
        message: e.message,
        errors,
      }));
    }
  }
});

bookRouter.get("/books", async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string | undefined;
    const genreFilter = req.query.filter as string | undefined;
    const sortField = (req.query.sortBy as string) || "createdAt";
    const sortOrder = (req.query.sort as string) === "desc" ? -1 : 1;
    const limitNumber = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : 10;

    const query: any = {};
    if (genreFilter) {
      query.genre = { $regex: new RegExp(genreFilter, "i") };
    }
    if (id) {
      const result = await Book.findById(id);
      return res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: result,
      });
    }
    const books = await Book.find(query)
      .sort({ [sortField]: sortOrder })
      .limit(limitNumber);

    return res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

bookRouter.get("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

bookRouter.put("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const parseData = await req.body;
    const updateBook = await Book.findOneAndUpdate(
      {
        _id: bookId,
      },
      parseData,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updateBook,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
  }
});

bookRouter.delete("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export default bookRouter;
