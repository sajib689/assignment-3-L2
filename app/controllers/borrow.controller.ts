import express, { Request, Response } from "express";
import { success, z } from "zod";
import { Borrow } from "../models/borrow.model";
import mongoose from "mongoose";

const borrowRouter = express.Router();

const borrowZodSchema = z.object({
  book: z.string().min(1, "Book ID is required"),
  quantity: z.number().positive("Quantity must be a positive number"),
  dueDate: z.coerce.date().optional().nullable(),
});

borrowRouter.post("/borrow", async (req: Request, res: Response) => {
  try {
    const parsedData = await borrowZodSchema.safeParseAsync(req.body);

    if (!parsedData.success) {
      const errors = parsedData.error.issues.map((e) => ({
        field: e.path.join(" . "),
        message: e.message,
      }));
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors,
      });
    }
    const data = {
      ...parsedData.data,
      book: new mongoose.Types.ObjectId(parsedData.data.book),
    };
    const newBorrow = await Borrow.create(data);

    return res.status(200).json({
      success: true,
      message: "Borrow record created successfully",
      data: newBorrow,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      const errors = error.issue.map((e: any) => ({
        filed: e.path.join(" . "),
        message: e.message,
        errors,
      }));
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors,
      });
    }
  }
});

borrowRouter.get("/borrow", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      // group by book id, sum quantity
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      // lookup book details
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      // unwind the joined array
      { $unwind: "$bookInfo" },
      // shape the final document
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});


export default borrowRouter;
