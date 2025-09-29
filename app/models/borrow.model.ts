import { model, Schema } from "mongoose";
import { IBorrow } from "../types/borrow.type";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
