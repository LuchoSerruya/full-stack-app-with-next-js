import { InferGetServerSidePropsType } from "next";
import { Fragment } from "react";
import { PostList } from "../components/PostList";

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const networkPosts = (await res.json()) as NetworkPost[];
  const posts: Post[] = networkPosts.map(({ id, title, body }) => ({
    id,
    title,
    body
  }));
  return {
    props: { msg: "Hello world!", posts }
  };
}

export default function Home({
  posts,
  msg
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Fragment>
      <h1 className="m-4 text-center text-4xl text-red-500">{msg}</h1>
      <PostList posts={posts} />
    </Fragment>
  );
}
