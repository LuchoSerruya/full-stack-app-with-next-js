import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getOrCreateConnection } from "../../../utils";
import { Post } from "../../../models/post.model";
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

async function deletePost(id: number) {
  const res = await fetch(`/api/post/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.data.error.message);
  }
}

export default function PostDetailPage({
  post
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const postObj = JSON.parse(post) as Post;
  const router = useRouter();
  async function handleDeleteButtonClick(id: number) {
    const answer = confirm("Are you sure you want to delete this post?");
    if (!answer) return;

    try {
      await deletePost(id);
      alert("Post deleted successfully!");
      router.replace("/");
    } catch (error) {
      alert("Something went wrong :/");
    }
  }
  return (
    <section className="m-4">
      <h1 className="m-4 text-center text-3xl text-red-400">{postObj.title}</h1>
      <p className="">{postObj.body}</p>
      <div className="mt-20 flex flex-col md:flex-row md:justify-end">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block flex-grow md:inline md:flex-grow-0">
          <a href={`/post/${postObj.id}/edit`}>Edit</a>
        </button>
        <button
          onClick={() => handleDeleteButtonClick(postObj.id)}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block flex-grow mt-2 md:inline md:flex-grow-0 md:m-0 md:ml-1"
        >
          Delete
        </button>
      </div>
    </section>
  );
}
