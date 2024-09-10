import connectionDb from "@/mongo/db";
import { Post } from "@/mongo/models/post";
import { NextResponse } from "next/server";

export interface UnlikePostRequestBody {
  userId: string;
}

export async function GET(
  req: Request,
  { params: { post_id } }: { params: { post_id: string } }
) {
  await connectionDb();
  try {
    const user = await null;
    const post = await Post.findById(post_id);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
    if (post.user.userId !== user?.id ?? "") {
      return new Response("Unauthorized", { status: 401 });
    }

    const likes = post.likes;

    return NextResponse.json(likes, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params: { post_id } }: { params: { post_id: string } }
) {
  await connectionDb();
  try {
    const { userId }: UnlikePostRequestBody = await req.json();
    const post = await Post.findById(post_id);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    await post.unlikePost(userId);

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
