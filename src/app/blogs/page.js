"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Force this page to be dynamic (always fresh data)
export const dynamic = "force-dynamic";

export default function Blogs() {
  // Store the list of blogs fetched from the backend
  const [blogs, setBlogs] = useState([]);

  // Keep refs to all blog card elements so GSAP can animate them
  const cardsRef = useRef([]);

  // Fetch blogs from the API once the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`);
      const data = await res.json();
      setBlogs(data.blogs || []); // fallback to empty array if no blogs
    };
    fetchBlogs();
  }, []);

  // Animate each blog card when blogs data changes
  useGSAP(() => {
    cardsRef?.current?.forEach((el, i) =>
      gsap.fromTo(
        el,
        { opacity: 0, x: 50 }, // start off invisible and shifted right
        {
          opacity: 1,
          x: 0, // slide into place
          duration: 0.8,
          delay: 0.2 * i, // staggered animation (each card slightly after previous)
          ease: "power3.out",
        }
      )
    );
  }, [blogs]);

  return (
    <>
      {/* Page heading */}
      <h1 className="font-bold text-4xl">Blogs</h1>

      {/* Grid of blog cards */}
      <div className="grid items-stretch gap-4 md:grid-cols-2">
        {blogs.map((blog, i) => (
          <Link key={blog?.id} href={`/blogs/${blog?.id}`}>
            <div
              // Assign ref for GSAP animation
              ref={(el) => (cardsRef.current[i] = el)}
              className="card-shadow p-4 rounded-4xl mt-4 h-full"
            >
              {/* Blog title */}
              <p className="text-3xl">{blog?.name}</p>

              {/* Blog author */}
              <p>
                by <span className="italic">{blog?.author}</span>
              </p>

              {/* Blog date */}
              <p>
                on{" "}
                <span className="font-bold">
                  {new Date(blog?.date).toLocaleDateString()}
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
