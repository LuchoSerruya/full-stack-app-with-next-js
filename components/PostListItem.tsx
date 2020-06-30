import Link from "next/link";
import { Post } from "../models/post.model";
type Props = {
  post: Post;
};

const PostListItem: React.FC<Props> = ({ post }) => {
  return (
    <Link href="/post/[id]" as={`/post/${post.id}`}>
      <a>
        <article className="bg-gray-100 border-gray-400 rounded-lg p-6 m-4 transition duration-300 ease-in-out transform hover:-translate-y-2 ">
          <div className="text-center md:text-left">
            <span className="text-lg">{post.title}</span>
            <p className="text-purple-500">{post.body}</p>
          </div>
        </article>
      </a>
    </Link>
  );
};

export { PostListItem };
