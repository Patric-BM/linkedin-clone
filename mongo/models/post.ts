import { IUser } from "@/types/user";
import mongoose, { Schema, Document, models, Model } from "mongoose";
import { IComment, ICommentBase, Comment } from "./comments";
import path from "path";

export interface IPostBase {

  user: IUser;
  text: string;
  imageUrl?: string;
  comments?: IComment[];
  likes?: string[];
}

export interface IPost extends IPostBase, Document {
  createdAt: Date;
  updatedAt: Date;
}

interface IPostMethods {
  likePost: (userId: string) => Promise<void>;
  unlikePost: (userId: string) => Promise<void>;
  commentOnPost: (comment: ICommentBase) => Promise<void>;
  getAllComments: () => Promise<IComment[]>;
  removePost: () => Promise<void>;
}

interface IPostStatics {
  getAllPosts: () => Promise<IPostDocument[]>;
}

export interface IPostDocument extends IPost, IPostMethods {}
interface IPostModel extends Model<IPostDocument>, IPostStatics {}

const PostSchema = new Schema<IPostDocument>(
  {
    user: {
      userId: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String },
      userImage: { type: String, required: true },
    },
    text: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
    },
    likes: {
      type: [String],
    },
  },
  { timestamps: true }
);

// Middleware para gerar o campo `id` se não estiver presente
/* PostSchema.pre<IPostDocument>("save", function (next) {
  if (!this.id) {
    this.id = this._id; // Gera um ID único a partir do _id
  }
  next();
}); */

PostSchema.methods.likePost = async function (userId: string): Promise<void> {
  try {
    await this.updateOne({ $addToSet: { likes: userId } });
  } catch (error) {
    throw error;
  }
};

PostSchema.methods.unlikePost = async function (userId: string): Promise<void> {
  try {
    await this.updateOne({ $pull: { likes: userId } });
  } catch (error) {
    throw error;
  }
};

PostSchema.methods.commentOnPost = async function (
  comment: ICommentBase
): Promise<void> {
  try {
    const newComment = await Comment.create(comment);
    this.comments.push(newComment._id);
    await this.save();
  } catch (error) {
    console.log("Erro ao comentar: ", error);
    throw error;
  }
};

PostSchema.methods.getAllComments = async function (): Promise<IComment[]> {
  try {
    await this.populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
    });
    return this.comments;
  } catch (error) {
    console.log("Erro ao pegar os comentários: ", error);
    throw error;
  }
};

PostSchema.methods.removePost = async function (): Promise<void> {
  try {
    await this.deleteOne();
  } catch (error) {
    console.error("Erro ao remover o post: ", error);
    throw error;
  }
};


PostSchema.statics.getAllPosts = async function (): Promise<IPostDocument[]> {
  try {
    const posts = await this.find().sort({ createdAt: -1 }).exec();
    return posts.map((post: IPostDocument) => ({
      ...post.toObject(), // Converta o post para um objeto plain
      id: post._id, // Adicione o campo id
      comments: post.comments?.map((comment: IComment) => ({
        // Mapear manualmente os campos necessários
        ...comment,
        id: (comment._id as mongoose.Types.ObjectId).toString(), // Cast para ObjectId e converta para string
      })),
    }));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};



export const Post =
  (models.Post as IPostModel) ||
  mongoose.model<IPostDocument, IPostModel>("Post", PostSchema);
