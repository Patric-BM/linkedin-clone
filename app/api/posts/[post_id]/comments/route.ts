import connectionDb from "@/mongo/db";
import { ICommentBase, Comment } from "@/mongo/models/comments";
import { Post } from "@/mongo/models/post";
import { IUser } from "@/types/user";
import { NextResponse } from "next/server";

export async function GET(req: Request, {
  params: { post_id },
}: {
  params: { post_id: string };
}) {
  await connectionDb();
  console.log("Post ID: ", post_id);
  try {
    const post = await Post.findById(post_id);
    if (!post) {
      return NextResponse.json("Post not found", { status: 404 });
    }

    const comments = post.comments;

    return NextResponse.json(comments, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}

export interface AddCommentRequestBody {
  user: IUser;
  text: string;
}

export async function POST(
  req: Request,
  { params: { post_id } }: { params: { post_id: string } }
) {
  await connectionDb();
  try {
    const { user, text }: AddCommentRequestBody = await req.json();
    const post = await Post.findById(post_id);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    const comment: ICommentBase = {
      user,
      text,
    };

    await post.commentOnPost(comment);

    return NextResponse.json(comment, { status: 201 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
