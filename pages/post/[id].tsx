import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Fragment } from "react";
import { getOrCreateConnection } from "../../utils";
import { Post } from "../../models/post.model";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params;
  const conn = await getOrCreateConnection();
  const postRepo = conn.getRepository<Post>("Post");
  const post = JSON.stringify(
    await postRepo.findOneOrFail(parseInt(id as string))
  );
  return {
    props: { post }
  };
}
export default function PostDetailPage({
  post
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const postObj = JSON.parse(post) as Post;
  return (
    <Fragment>
      <h1 className="m-4 text-center text-3xl text-red-400">{postObj.title}</h1>
      <p className="m-8">{postObj.body}</p>
    </Fragment>
  );
}
