import { NextApiRequest, NextApiResponse } from "next";
import { EditPostFormData } from "../../../components/EditPostForm";
import { getOrCreateConnection } from "../../../utils";
import { Post } from "../../../models/post.model";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id }
  } = req;
  if (req.method === "DELETE") {
    const conn = await getOrCreateConnection();
    const postRepo = conn.getRepository<Post>("Post");

    await postRepo.delete({ id: parseInt(id as string) });
    return res.status(204).end();
  } else if (req.method === "PUT") {
    const data = req.body as EditPostFormData;

    const conn = await getOrCreateConnection();
    const postRepo = conn.getRepository<Post>("Post");

    await postRepo.update({ id: parseInt(id as string) }, data);
    return res.status(200).json({ status: "Success", data });
  }

  return res.status(405).json({ msg: "Method not implemented" });
};
