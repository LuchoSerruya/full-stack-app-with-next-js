import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { Fragment } from "react";
import { PostList } from "../components/PostList";
import { getOrCreateConnection } from "../utils";
import { Post } from "../models/post.model";
import { Pagination } from "../components/Pagination";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // `page` defaults to "0" and `count` to "10" if not sent
  const { page = "0", count = "10" } = context.query;
  const pageNumber = parseInt(page as string);
  const countNumber = parseInt(count as string);
  const postsToSkip = countNumber * pageNumber;

  const conn = await getOrCreateConnection();
  const postRepo = conn.getRepository<Post>("Post");

  const postsCount = await postRepo.count();
  console.log(`postsCount ${postsCount}`);

  const posts = (
    await postRepo.find({ take: countNumber, skip: postsToSkip })
  ).map(p => JSON.stringify(p));

  const previousPage = pageNumber > 0 ? String(pageNumber - 1) : "";
  // We don't want to indicate there is a next page if it'll be a blank page
  const nextPage =
    postsToSkip + countNumber < postsCount ? String(pageNumber + 1) : "";

  return {
    props: {
      msg: "Hello world!",
      posts,
      pagination: { previousPage: previousPage, nextPage }
    }
  };
}

export default function Home({
  posts,
  msg,
  pagination
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const postObjs = posts.map(p => JSON.parse(p) as Post);

  return (
    <Fragment>
      <h1 className="m-4 text-center text-4xl text-red-500">{msg}</h1>
      <PostList posts={postObjs} />
      <Pagination {...pagination} />
    </Fragment>
  );
}
