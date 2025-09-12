"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const dynamic = "force-dynamic";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`);
      const data = await res.json();
      setBlogs(data.blogs || []);
    };
    fetchBlogs();
  }, []);

useGSAP(() => {
cardsRef?.current?.forEach((el,i) =>
  gsap.fromTo(el,{ opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 0.8, delay: 0.2*i, ease: "power3.out" })
)
}, [blogs]);


  return (
    <>
      <h1 className="font-bold text-4xl">Blogs</h1>
      <div className="grid items-stretch gap-4 md:grid-cols-2">
        {blogs.map((blog, i) => (
          <Link key={blog?.id} href={`/blogs/${blog?.id}`}>
            <div
              ref={(el) => (cardsRef.current[i] = el)}
              className="card-shadow p-4 rounded-4xl mt-4 h-full"
            >
              <p className="text-3xl">{blog?.name}</p>
              <p>
                by <span className="italic">{blog?.author}</span>
              </p>
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
