import { EditPostForm, EditPostFormData } from "../../components/EditPostForm";

async function sendData(data: EditPostFormData) {
  const res = await fetch("/api/post", {
    method: "POST",
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

function AddNewPage() {
  async function onFormSubmit(data: EditPostFormData) {
    try {
      sendData(data);
      alert("Post created successfully!");
    } catch (error) {
      alert("Something went wrong :/");
    }
  }

  return (
    <section className="m-4">
      <EditPostForm onSubmit={onFormSubmit} />
    </section>
  );
}

export default AddNewPage;
