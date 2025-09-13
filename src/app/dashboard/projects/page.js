"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function DashboardProjects() {
  const [projects, setProjects] = useState([]); // state to store list of projects
  const cardsRef = useRef([]); // refs to attach animation targets

  
  useEffect(() => {
    // fetch projects from API when component mounts
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`);
        const data = await res.json();
        setProjects(data?.projects || []); // update state with projects
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };
    fetchProjects();
  }, []);

  // animate project cards when projects state updates
  useGSAP(() => {
    cardsRef?.current?.forEach((el,i) =>
      gsap.fromTo(
        el,
        { opacity: 0, x: 50 }, // initial state
        { opacity: 1, x: 0, duration: 0.8, delay: 0.2*i, ease: "power3.out" } // animation
      )
    )
  }, [projects]);


  // handle project deletion
  const handleDeletion = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/delete`, {
        method: "DELETE", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }), // send project id to delete
      });

      const data = await res.json();

      if (data.success) {
        // remove deleted project from state
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  return (
    <>
      <h1 className="font-bold text-4xl">Projects</h1>

      {/* button to navigate to project creation page */}
      <Link href={'/dashboard/projects/new'}>
        <button className="px-4 py-2 bg-green-700 text-white rounded-lg my-4">
          Create New Project
        </button>
      </Link>

      {/* grid of project cards */}
      <div className="grid md:grid-cols-2 gap-4 items-stretch">
        {projects.map((p, i) => (
          <div
            key={p._id}
            ref={(el) => (cardsRef.current[i] = el)} // attach ref for animation
            className="card-shadow p-4 rounded-4xl mt-4 h-full"
          >
            <p className="font-bold">{p.name}</p>
            <p>{p.description}</p>

            {/* buttons for editing or deleting project */}
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
