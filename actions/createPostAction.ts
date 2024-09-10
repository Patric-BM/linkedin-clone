"use server";
import { AddPostRequestBody } from "@/app/api/posts/route";
import { Post } from "@/mongo/models/post";
import { IUser } from "@/types/user";
import { revalidatePath } from "next/cache";
import { User } from "firebase/auth";

export default async function createPostAction(formData: FormData, user: any) {
	console.log(user);
	const postInput = formData.get("postInput") as string;

	if (!user) {
		throw new Error("You must be signed in to post.");
	}

	const text = formData.get("postInput") as string;
	const image = formData.get("image") as File;
	let imageUrl: string | undefined;

	if (!postInput) {
		throw new Error("Post must have input.");
	}

	const userDb: IUser = {
		userId: user?.uid,
		firstName: user?.displayName ?? "",
		lastName: user?.displayName?.split(" ")[1] ?? "",
		userImage: user?.photoURL ?? "",
	};

	try {
		if (image.size > 0) {
			const body: AddPostRequestBody = {
				user: userDb,
				text: postInput,
			};

			await Post.create(body);
		} else {
			const body: AddPostRequestBody = {
				user: userDb,
				text: postInput,
			};

			await Post.create(body);
		}
	} catch (error: any) {
		throw new Error(error);
	}
	revalidatePath("/");
}
