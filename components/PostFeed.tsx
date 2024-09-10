import { IPostDocument } from "@/mongo/models/post";
import { Post } from "./Post";
export function PostFeed({ posts }: { posts: IPostDocument[] }) {
	return (
		<div className="flex mt-8 flex-col space-y-4">
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
}
