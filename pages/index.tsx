import { InferGetServerSidePropsType } from "next";
import { Fragment } from "react";
import { PostList } from "../components/PostList";
import { getOrCreateConnection } from "../utils";
import { Post } from "../models/post.model";

export async function getServerSideProps() {
  const conn = await getOrCreateConnection();
  const postRepo = conn.getRepository<Post>("Post");

  const posts = (await postRepo.find()).map(p => JSON.stringify(p));

  return {
    props: { msg: "Hello world!", posts }
  };
}

export default function Home({
  posts,
  msg
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const postObjs = posts.map(p => JSON.parse(p) as Post);
  return (
    <Fragment>
      <h1 className="m-4 text-center text-4xl text-red-500">{msg}</h1>
      <PostList posts={postObjs} />
    </Fragment>
  );
}
