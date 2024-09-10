'use server';
import connectionDb from "@/mongo/db";
import { IComment } from "@/mongo/models/comments";
import { IPostBase, Post } from "@/mongo/models/post";
import { IUser } from "@/types/user";

export interface AddPostRequestBody {
  user: IUser;
  text: string;
  imageUrl?: string;
  comments?: IComment[];
  likes?: string[];
}

export async function GET(request: Request) {
  try {
    await connectionDb();
    const posts = await Post.getAllPosts();
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectionDb();

    const { user, text, imageUrl }: AddPostRequestBody = await request.json();

    const postData: IPostBase = {
      user,
      text,
      ...(imageUrl && { imageUrl }),
    };

    const post = await Post.create(postData);
    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error: any) {
    console.error("Erro detalhes: ", error);
    return new Response(error.message, { status: 500 });
  }
}
