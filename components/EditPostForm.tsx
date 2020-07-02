import { Post } from "../models/post.model";
import { useState, FormEvent } from "react";

export type EditPostFormData = {
  title: string;
  body: string;
};

type Props = {
  onSubmit: (data: EditPostFormData) => void;
  post?: Post;
  reset?: boolean;
};

const EditPostForm: React.FC<Props> = ({ onSubmit, post, reset }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [body, setBody] = useState(post?.body || "");
  function doReset() {
    setTitle("");
    setBody("");
  }
  function isValid(data: EditPostFormData): boolean {
    return data.body !== "" && data.title !== "";
  }
  function onFormSubmit(e: FormEvent<HTMLFormElement>, data: EditPostFormData) {
    e.preventDefault();
    onSubmit(data);
    if (reset) doReset();
  }

  return (
    <form
      className="bg-white px-8 pt-6 pb-8 mb-4"
      onSubmit={e => onFormSubmit(e, { title, body })}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Your title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="body"
        >
          Body
        </label>
        <textarea
          className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="body"
          rows={10}
          placeholder="Your body"
          value={body}
          onChange={e => setBody(e.target.value)}
          required
        />
      </div>

      <div className="flex md:justify-end">
        <button
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-grow md:flex-grow-0 ${
            !isValid({ title, body })
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
          disabled={!isValid({ title, body })}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

EditPostForm.defaultProps = { reset: true };
export { EditPostForm };
