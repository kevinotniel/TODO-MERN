import { model, Schema } from "mongoose";
import { Todo } from "../types/todo";

const todoSchema: Schema = new Schema( // instance atau class Schema yang akan diisi objek
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // seperti created_at dan updated_at
);

export default model<Todo>("Todo", todoSchema);
