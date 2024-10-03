import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Corrigé de "timeStamp" à "timestamps"
  }
);

const TodoModel = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default TodoModel;
