import mongoose, { Schema, Document, models } from "mongoose";
import { IUser } from "@/types/user";

export interface ICommentBase {
  user: IUser;
  text: string;
}

export interface IComment extends ICommentBase, Document {
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    id: { type: String, unique: true, required: true }, // Adicione este campo
    user: {
      userId: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String },
      userImage: { type: String },
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Middleware para gerar o campo `id` se não estiver presente
commentSchema.pre<IComment>("save", function (next) {
  if (!this.id) {
    this.id = this._id; // Gera um ID único a partir do _id
  }
  next();
});

export const Comment = models.Comment || mongoose.model<IComment>("Comment", commentSchema);
