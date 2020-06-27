import { Fragment } from "react";
import { PostListItem } from "./PostListItem";

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
