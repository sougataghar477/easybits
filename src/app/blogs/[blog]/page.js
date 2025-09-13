"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// This page is forced to be dynamic so it always fetches fresh data
export const dynamic = "force-dynamic";

export default function Blog() {
  // blogDetails will hold the blog data fetched from the API
  const [blogDetails, setBlogDetails] = useState(null);

  // loading flag to show a "loading..." message until the API call finishes
  const [loading, setLoading] = useState(true);

  // Grab the blog ID (slug/param) from the URL
  const { blog } = useParams();

  // Whenever blog param changes, fetch blog data from the backend
  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${blog}`)
      .then((r) => r.json())
      .then((d) => setBlogDetails(d)) // store the blog data
      .catch(() => setBlogDetails(null)) // in case of error, set null
      .finally(() => setLoading(false)); // stop loading spinner/message
  }, [blog]);

  // If still loading, show a message
  if (loading) {
    return <p className="mt-4 text-gray-500">Loading blog...</p>;
  }

  // If loading is done but no blog found, show an error
  if (!loading && !blogDetails) {
    return <h1>Invalid Blog ID</h1>;
  }

  // Otherwise, display the blog details
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

      {/* Static placeholder image (can replace with dynamic later) */}
      <img
        src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="blog image"
      />

      {/* The actual blog content */}
      <p className="text-xl">{blogDetails.content}</p>
    </>
  );
}
