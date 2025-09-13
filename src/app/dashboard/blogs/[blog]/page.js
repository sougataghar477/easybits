"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function Blog() {
  // store blog details (name, author, date, content)
  const [blogDetails, setBlogDetails] = useState({
    name: "",
    author: "",
    date: "",
    content: "",
  });

  // track loading state
  const [loading, setLoading] = useState(true);

  // track if fields are editable
  const [editable, setEditable] = useState(false);

  // get blog id from URL params
  const { blog } = useParams();

  // handle blog update submission
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
          toast.success("Blog updated successfully!"); // success notification
        }
      })
      .catch((err) => {
        console.error("Update failed:", err);
        toast.error("Failed to update blog"); // error notification
      });
  };

  // fetch blog details when blog param changes
  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${blog}`)
      .then((r) => r.json())
      .then((d) => setBlogDetails(d))
      .catch(() => setBlogDetails(null))
      .finally(() => setLoading(false));
  }, [blog]);

  // show loading state
  if (loading) {
    return <p className="mt-4 text-gray-500">Loading blog...</p>;
  }

  // show invalid message if blog not found
  if (!loading && !blogDetails) {
    return <h1>Invalid Blog ID</h1>;
  }

  // render blog form (editable when checkbox is checked)
  return (
    <form onSubmit={handleSubmit}>
      {/* Blog name field */}
      <h2 className="text-4xl mt-4">Blog Name:</h2>
      <textarea
        className="text-4xl mt-2 w-full border p-2 rounded-lg"
        value={blogDetails.name}
        onChange={(e) =>
          setBlogDetails((prev) => ({ ...prev, name: e.target.value }))
        }
        disabled={!editable}
      />

      {/* Author field */}
      <h2 className="text-4xl mt-4">Author Name:</h2>
      <input
        className="text-xl mt-2 w-full border p-2 rounded-lg"
        value={blogDetails.author || ""}
        onChange={(e) =>
          setBlogDetails((prev) => ({ ...prev, author: e.target.value }))
        }
        disabled={!editable}
      />

      {/* Date field */}
      <h2 className="text-4xl mt-4">Date:</h2>
      <input
        className="text-xl mt-2 w-full border p-2 rounded-lg"
        value={blogDetails.date || ""}
        onChange={(e) =>
          setBlogDetails((prev) => ({ ...prev, date: e.target.value }))
        }
        disabled={!editable}
      />

      {/* Content field */}
      <h2 className="text-4xl mt-4">Content:</h2>
      <textarea
        className="text-xl mt-2 w-full border p-2 rounded-lg"
        value={blogDetails.content || ""}
        onChange={(e) =>
          setBlogDetails((prev) => ({ ...prev, content: e.target.value }))
        }
        disabled={!editable}
      />

      {/* Edit toggle checkbox */}
      <div className="mt-4">
        <input
          type="checkbox"
          checked={editable}
          onChange={() => setEditable((prev) => !prev)}
        />
        <span className="ml-2">Edit</span>
      </div>

      {/* Submit button (only works if editable is true) */}
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
