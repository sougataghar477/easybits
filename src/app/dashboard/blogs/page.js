"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data?.blogs || []))
      .catch((err) => console.error("Failed to load blogs:", err));
  }, []);

  const handleDeletion = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/delete`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );

      const result = await res.json();

      if (result.success) {
        setBlogs((prev) => prev.filter((blog) => blog.id !== result.deletedId));
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Something went wrong");
    }
  };

useGSAP(() => {
cardsRef?.current?.forEach((el,i) =>
  gsap.fromTo(el,{ opacity: 0, x: 50 }, // starting state
    { opacity: 1, x: 0, duration: 0.8, delay: 0.2*i, ease: "power3.out" })
)
}, [blogs]);


  return (
    <>
      <h1 className="font-bold text-4xl mb-4">Blogs</h1>
      <Link href={'/dashboard/blogs/new'}>
        <button className="px-4 py-2 bg-green-700 text-white rounded-lg my-4">Create New Blog</button>
      </Link>
      <div className="grid items-stretch gap-4 md:grid-cols-2">
        {blogs &&
          blogs.map((blog, i) => (
            <div
              key={blog.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="card-shadow p-4 rounded-4xl mt-4 h-full"
            >
              <p className="text-3xl">{blog.name}</p>
              <p>
                by <span className="italic">{blog.author}</span>
              </p>
              <p>
                on{" "}
                <span className="font-bold">
                  {new Date(blog.date).toLocaleDateString()}
                </span>
              </p>

              <Link href={`/dashboard/blogs/${blog._id}`}>
                <button className="px-6 py-2 mr-2 bg-green-700 text-white rounded-lg">
                  Edit
                </button>
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
