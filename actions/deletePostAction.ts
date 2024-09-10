"use server";

import { Post } from "@/mongo/models/post";
import { revalidatePath } from "next/cache";

export default async function deletePostAction(postId: string) {
    console.log("deletePostAction called with postId:", postId);
    const user = await null;

    console.log("Current user:", user);

    const post = await Post.findById(postId);
    if (!post) {
        console.error("Post not found");
        throw new Error("Post not found");
    }
    console.log("Post found:", post);

/*     if (post.user.userId !== user?.id) {
        console.error("Unauthorized access attempt by user:", user?.id);
        throw new Error("Unauthorized");
    } */

    try {
        console.log("Attempting to remove post:", postId);
        await post.removePost();
        console.log("Post removed successfully");
        revalidatePath("/");
    } catch (error) {
        console.error("An error occurred while deleting the post:", error);
        throw new Error("An error occurred while deleting the post");
    }
}