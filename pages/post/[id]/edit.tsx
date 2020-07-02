import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getOrCreateConnection } from "../../../utils";
import { Post } from "../../../models/post.model";
import {
  EditPostForm,
  EditPostFormData
} from "../../../components/EditPostForm";
import { useRouter } from "next/router";

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

async function sendData(id: number, data: EditPostFormData) {
  const res = await fetch(`/api/post/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.data.error.message);
  }
}

export default function EditPostPage({
  post
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const postObj = JSON.parse(post) as Post;
  const router = useRouter();
  function handleSubmit(data: EditPostFormData) {
    try {
      sendData(postObj.id, data);
      alert("Post updated successfully!");
      router.replace(`/post/${postObj.id}`);
    } catch (error) {
      alert("Something went wrong :/");
    }
  }

  return (
    <section className="m-4">
      <EditPostForm onSubmit={handleSubmit} post={postObj} reset={false} />
    </section>
  );
}
