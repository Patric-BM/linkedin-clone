"use server";
import Header from "@/components/Header";
import { PostFeed } from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
import ProtectedRoute from "@/components/ProtectedRouter";
import UserInformation from "@/components/UserInformation";
import connectionDb from "@/mongo/db";
import { IPostDocument, Post} from "@/mongo/models/post";
import { document } from "postcss";

export default async function Home() {
  await connectionDb();
	const documents: IPostDocument[] = await Post.getAllPosts();

	return (
		<ProtectedRoute>
			<div>
				<header className="sticky top-0 z-10 bg-white ">
					<Header />
				</header>
				<div className="grid grid-cols-8 mt-5 sm:px-5 ">
					<section className="hidden md:inline md:col-span-2">
						<UserInformation />
					</section>
					<section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl w-full">
						<div>
							<PostForm />
						</div>
						<div>
							<PostFeed posts={documents} />
						</div>
					</section>
					<section className="hidden xl:inline justify-center col-span-2">
						<p>Messaging</p>
					</section>
				</div>
			</div>
		</ProtectedRoute>
	);
}
