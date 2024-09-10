"use client";
import { useAuth } from "@/hooks/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

function UserInformation() {
	let user = useAuth().user;
	try {
	} catch (error) {
		console.error("Failed to fetch current user:", error);
		return (
			<div className="flex flex-col text-center justify-center items-center bg-white mr-6 rounded-lg border py-4">
				<p className="text-red-500">Failed to load user information.</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col text-center justify-center items-center bg-white mr-6 rounded-lg border py-4">
			<Avatar>
				{user?.photoURL ? (
					<AvatarImage src={user?.photoURL} />
				) : (
					<AvatarImage src="https://github.com/shadcn.png" />
				)}
				<AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
			</Avatar>
			<p className="text-xs">@{user?.displayName}</p>
			{user?.displayName?.slice(0, 6)}-{user?.uid?.slice(-4)}

			<hr className="w-1/2 my-4 border-gray-200" />
			<div className="flex justify-between w-full px-4 text-sm">
				<p className="text-xs">Posts</p>
				<p className="text-xs">0</p>
			</div>
			<div className="flex justify-between w-full px-4 text-sm">
				<p className="text-xs">Comments</p>
				<p className="text-xs">0</p>
			</div>
		</div>
	);
}

export default UserInformation;
