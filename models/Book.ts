import mongoose, { Schema, models } from "mongoose";

const BookSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["WANT_TO_READ", "READING", "COMPLETED"],
      default: "WANT_TO_READ",
    },
  },
  {
    timestamps: true,
  }
);

const Book = models.Book || mongoose.model("Book", BookSchema);

export default Book;