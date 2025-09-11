"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function Blog() {
  const [blogDetails, setBlogDetails] = useState({
    name: "",
    author: "",
    date: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);
  const { blog } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: blog, // comes from useParams
        name: blogDetails.name,
        author: blogDetails.author,
        date: blogDetails.date,
        content: blogDetails.content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Blog updated successfully!");
        } 
      })
      .catch((err) => {
        console.error("Update failed:", err);
        toast.error("Failed to update blog");
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${blog}`)
      .then((r) => r.json())
      .then((d) => setBlogDetails(d))
      .catch(() => setBlogDetails(null))
      .finally(() => setLoading(false));
  }, [blog]);

  if (loading) {
    return <p className="mt-4 text-gray-500">Loading blog...</p>;
  }
  if (!loading && !blogDetails) {
    return <h1>Invalid Blog ID</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-4xl mt-4">Blog Name:</h2>
      <textarea
        className="text-4xl mt-2 w-full border p-2 rounded-lg"
        value={blogDetails.name}
        onChange={(e) =>
          setBlogDetails((prev) => ({ ...prev, name: e.target.value }))
        }
        disabled={!editable}
      />

      <h2 className="text-4xl mt-4">Author Name:</h2>
      <input
        className="text-xl mt-2 w-full border p-2 rounded-lg"
        value={blogDetails.author || ""}
        onChange={(e) =>
          setBlogDetails((prev) => ({ ...prev, author: e.target.value }))
        }
        disabled={!editable}
      />

      <h2 className="text-4xl mt-4">Date:</h2>
      <input
        className="text-xl mt-2 w-full border p-2 rounded-lg"
        value={blogDetails.date || ""}
        onChange={(e) =>
          setBlogDetails((prev) => ({ ...prev, date: e.target.value }))
        }
        disabled={!editable}
      />

      <h2 className="text-4xl mt-4">Content:</h2>
      <textarea
        className="text-xl mt-2 w-full border p-2 rounded-lg"
        value={blogDetails.content || ""}
        onChange={(e) =>
          setBlogDetails((prev) => ({ ...prev, content: e.target.value }))
        }
        disabled={!editable}
      />

      <div className="mt-4">
        <input
          type="checkbox"
          checked={editable}
          onChange={() => setEditable((prev) => !prev)}
        />
        <span className="ml-2">Edit</span>
      </div>

      <button
        className="block mt-4 rounded-lg cursor-pointer bg-green-700 px-4 py-2 text-white disabled:bg-green-400 disabled:cursor-auto"
        disabled={!editable}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
