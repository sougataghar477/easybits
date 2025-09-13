"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]); // state to store fetched blogs
  const cardsRef = useRef([]); // reference array to target each blog card for animations

  // Fetch all blogs on mount
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data?.blogs || [])) // set blogs if found, else empty array
      .catch((err) => console.error("Failed to load blogs:", err));
  }, []);

  // Function to handle blog deletion
  const handleDeletion = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/delete`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }), // send blog ID for deletion
        }
      );

      const result = await res.json();

      if (result.success) {
        // remove the deleted blog from state
        setBlogs((prev) => prev.filter((blog) => blog.id !== result.deletedId));
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Something went wrong"); // show error to user
    }
  };

  // Animate blog cards with GSAP when blogs update
  useGSAP(() => {
    cardsRef?.current?.forEach((el, i) =>
      gsap.fromTo(
        el,
        { opacity: 0, x: 50 }, // starting state
        { opacity: 1, x: 0, duration: 0.8, delay: 0.2 * i, ease: "power3.out" } // animation effect
      )
    );
  }, [blogs]);

  return (
    <>
      <h1 className="font-bold text-4xl mb-4">Blogs</h1>

      {/* Button to navigate to "Create New Blog" page */}
      <Link href={'/dashboard/blogs/new'}>
        <button className="px-4 py-2 bg-green-700 text-white rounded-lg my-4">Create New Blog</button>
      </Link>

      {/* Blog list grid */}
      <div className="grid items-stretch gap-4 md:grid-cols-2">
        {blogs &&
          blogs.map((blog, i) => (
            <div
              key={blog.id}
              ref={(el) => (cardsRef.current[i] = el)} // attach ref for GSAP animations
              className="card-shadow p-4 rounded-4xl mt-4 h-full"
            >
              <p className="text-3xl">{blog.name}</p>
              <p>
                by <span className="italic">{blog.author}</span>
              </p>
              <p>
                on{" "}
                <span className="font-bold">
                  {new Date(blog.date).toLocaleDateString()} {/* format date */}
                </span>
              </p>

              {/* Edit blog button */}
              <Link href={`/dashboard/blogs/${blog._id}`}>
                <button className="px-6 py-2 mr-2 bg-green-700 text-white rounded-lg">
                  Edit
                </button>
              </Link>

              {/* Delete blog button */}
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
