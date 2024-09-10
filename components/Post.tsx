"use client";
import ReactTimeAgo from "react-time-ago";
import pt from "javascript-time-ago/locale/pt";
import TimeAgo from "javascript-time-ago";
import { IPostDocument } from "@/mongo/models/post";
import { Badge } from "./ui/badge";
import deletePostAction from "@/actions/deletePostAction";
import { useAuth } from "@/hooks/AuthContext";

export function Post({ post }: { post: IPostDocument }) {
    TimeAgo.addLocale(pt);
    const user  = useAuth().user;
    const date = new Date(post.createdAt);
    const isAuthor = post.user.userId === user?.uid;

    const handleDelete = async () => {
        // Debugging line to see the post object structure
        console.log("Post object:", post);

        const postID = post._id ?? post.id;
        console.log("Post ID:", postID);

        if (!postID) {
            console.error("Post ID is missing");
            return;
        }

        try {
            await deletePostAction(postID);
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    return (
        <div className="bg-white p-4 flex shadow-lg rounded-lg">
            <div className="">
                <img
                    className="h-10 w-10 rounded-full cursor-pointer"
                    src={post.user.userImage}
                    alt=""
                />
            </div>
            <div className="px-4 py-2 flex flex-col">
                <div className="flex items-center space-x-2">
                    <p className="font-bold font-medium text-gray-900">
                        {post.user.firstName}
                    </p>

                    {isAuthor && (
                        <Badge className="ml-2" variant="outline">
                            Author
                        </Badge>
                    )}
                </div>
                <p className="text-gray-500 text-sm">
                    @{post.user.firstName}-
                    {post.user.lastName.slice(-4) || ""}
                </p>
                <p className="text-gray-800 text-sm">
                    <ReactTimeAgo date={date} locale="pt" />
                </p>
            </div>
            <div className="ml-auto">
                <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={handleDelete}
                >
                    {isAuthor ? "Delete" : "Report"}
                </button>
            </div>
        </div>
    );
}
