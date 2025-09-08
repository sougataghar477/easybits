"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data?.blogs || []))
      .catch((err) => console.error("Failed to load blogs:", err));
  }, []);

  const handleDeletion = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();

      if (result.success) {
        setBlogs((prev) => prev.filter((blog) => blog.id !== result.deletedId));
      }
    }
    catch (err) {
      console.error("Error deleting blog:", err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <h1 className="font-bold text-4xl">Blogs</h1>
      <div className="grid items-stretch gap-4 md:grid-cols-2">
        {blogs && blogs.map((blog) => (
          <div key={blog.id} className="card-shadow p-4 rounded-4xl mt-4 h-full dark:bg-amber-300">
            <p className="text-3xl">{blog.name}</p>
            <p>
              by <span className="italic">{blog.author}</span>
            </p>
            <p>
              on <span className="font-bold">{new Date(blog.date).toLocaleDateString()}</span>
            </p>
            <Link href={`/dashboard/blogs/${blog._id}`}>
              <button className="px-6 py-2 mr-2 bg-green-700 text-white rounded-lg">Edit</button>
            </Link>
            <button
              onClick={() => handleDeletion(blog.id)}
              className="px-6 py-2 bg-red-500 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
