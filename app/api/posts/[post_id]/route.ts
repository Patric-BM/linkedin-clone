import connectionDb from "@/mongo/db";
import { Post } from "@/mongo/models/post";

export interface DeletePostRequestBody {
  userId: string;
}

export async function GET(
  req: Request,
  { params: { post_id } }: { params: { post_id: string } }
) {
  await connectionDb();
  try {
    // const { userId }: DeletePostRequestBody = await req.json();
    const user = await null;
    const post = await Post.findById(post_id);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
/*     if (post.user.userId !== user?.id ?? "") {
      return new Response("Unauthorized", { status: 401 });
    }
 */

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { post_id } }: { params: { post_id: string } }
) {
  await connectionDb();
  try {
    const post = await Post.findById(post_id);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
    await post.removePost();
    return new Response("Post deleted", { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
