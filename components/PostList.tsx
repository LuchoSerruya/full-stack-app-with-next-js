import { Fragment } from "react";
import { PostListItem } from "./PostListItem";
import { Post } from "../models/post.model";

type Props = {
  posts: Post[];
};

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <Fragment>
      {posts.map(p => (
        <PostListItem key={p.id} post={p} />
      ))}
    </Fragment>
  );
};

export { PostList };
