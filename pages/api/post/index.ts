import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../../models/post.model";
import { getOrCreateConnection } from "../../../utils";
import { EditPostFormData } from "../../../components/EditPostForm";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const data = req.body as EditPostFormData;

      const conn = await getOrCreateConnection();
      const postRepo = conn.getRepository<Post>("Post");

      const post = new Post();
      post.body = data.body;
      post.title = data.title;
      post.id = (await postRepo.count()) + 1;
      const newPost = await postRepo.save(post);

      return res.status(201).json({ status: "Success", data: newPost });
    } catch (error) {
      return res.status(500).json({
        status: "Error",
        data: { msg: "Could not create post", error }
      });
    }
  }

  return res.status(405).json({ msg: "Method not implemented" });
};
