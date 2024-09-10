"use client";
import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import createPostAction from "@/actions/createPostAction";
import { useAuth } from "@/hooks/AuthContext";

const PostForm = () => {
	const user = useAuth().user;
	const ref = useRef<HTMLFormElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const [postInput, setPostInput] = useState<string>("");
  const newUser = {
    uid: user?.uid ?? "",
    photoURL: user?.photoURL ?? "",
    displayName: user?.displayName  ?? "",
  };

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setPreviewImage(URL.createObjectURL(file));
		}
	};

	const handlePostAction = async (formData: FormData) => {

		if (formData.get("postInput") === "") {
			return;
		}

		setPreviewImage(null);

		try {
      
			await createPostAction(formData, newUser);
      console.log("Post created", newUser);
		} catch (error) {
			console.error("Failed to post:", error);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(ref.current!);
		await handlePostAction(formData);
		setPostInput("");
	};

	return (
		<div>
			<form
				ref={ref}
				className="flex items-center"
				onSubmit={handleSubmit}
			>
				<Avatar className="mr-2">
					{user?.uid ? (
						<AvatarImage src={user?.photoURL ?? ""} />
					) : (
						<AvatarImage src="https://github.com/shadcn.png" />
					)}
					<AvatarFallback>
						{user?.displayName?.charAt(0)}
					</AvatarFallback>
				</Avatar>

				<input
					type="text"
					name="postInput"
					placeholder={"What's on your mind?"}
					className="pl-2 flex-1 py-3 rounded-full border outline-none"
					value={postInput}
					onChange={(event) => setPostInput(event.target.value)}
				/>

				<input
					type="file"
					accept="image/*"
					name="image"
					ref={fileInputRef}
					hidden
					onChange={handleImageChange}
				/>

				<div className="flex items-center space-x-2">
					<Button
						type="button"
						onClick={() => fileInputRef.current?.click()}
					>
						<ImageIcon
							className="mr-2"
							size={16}
							color="currentColor"
						/>
						{previewImage ? "Change" : "Add"} Image
					</Button>

					<Button type="button" onClick={() => setPreviewImage(null)}>
						<XIcon
							className="mr-2"
							size={16}
							color="currentColor"
						/>
						Remove
					</Button>
				</div>
			</form>
			{previewImage && (
				<div className="mt-4 w-[200px] h-[300px] object-cover">
					<img
						src={previewImage}
						alt="Preview Image"
						className="rounded-lg w-full h-full object-cover"
					/>
				</div>
			)}
		</div>
	);
};

export default PostForm;
