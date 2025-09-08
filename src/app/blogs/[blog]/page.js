"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export const dynamic = "force-dynamic"; // ✅ prevents build error

export default function Blog() {
  const [blogDetails, setBlogDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { blog } = useParams();

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
    <>
      <h1 className="text-4xl font-bold mt-4">{blogDetails.name}</h1>
      <p>
        by <span className="italic">{blogDetails.author}</span>
      </p>
      <p>
        on{" "}
        <span className="font-bold italic">
          {new Date(blogDetails.date).toLocaleDateString()}
        </span>
      </p>
      <img
        src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="blog image"
      />
      <p className="text-xl">{blogDetails.content}</p>
    </>
  );
}
