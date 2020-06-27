import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Fragment } from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params;
  console.log(`** FETCHING POST [${id}] **`);

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const { title, body, id: postId } = (await res.json()) as NetworkPost;
  const post: Post = { title, body, id: postId };
  return {
    props: { post }
  };
}
export default function PostDetailPage({
  post
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Fragment>
      <h1 className="m-4 text-center text-3xl text-red-400">{post.title}</h1>
      <p className="m-8">{post.body}</p>
    </Fragment>
  );
}
