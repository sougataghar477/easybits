"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardProjects() {
  const [projects, setProjects] = useState([]);

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`);
        const data = await res.json();
        setProjects(data?.projects || []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  // Delete handler
  const handleDeletion = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/delete`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  return (
    <>
      <h1 className="font-bold text-4xl">Projects</h1>
      <div className="grid md:grid-cols-2 gap-4 items-stretch">
        {projects.map((p) => (
          <div
            key={p._id}
            className="card-shadow p-4 rounded-4xl mt-4 h-full"
          >
            <p className="font-bold">{p.name}</p>
            <p>{p.description}</p>
            <div className="mt-2 flex gap-2">
              <Link href={`/dashboard/projects/${p._id}`}>
                <button className="px-4 py-2 bg-green-700 text-white rounded-lg">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDeletion(p._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
