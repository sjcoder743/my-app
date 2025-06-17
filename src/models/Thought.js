import mongoose from "mongoose";

const ThoughtSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please add a title"],
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Please add content"],
      maxlength: [20000, "Content cannot be more than 1000 characters"],
    },
    userId: {
      type: String,
      required: [true, "Thought must be associated with a user"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Thought ||
  mongoose.model("Thought", ThoughtSchema);
