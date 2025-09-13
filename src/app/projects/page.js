"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Ensure this page always runs dynamically on server requests
export const dynamic = "force-dynamic";

export default function Projects() {
  // State to store list of projects
  const [projects, setProjects] = useState([]);

  // Ref array to keep references for each project card (for GSAP animations)
  const cardsRef = useRef([]);

  // Fetch projects from API when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`);
      const data = await res.json();
      setProjects(data.projects || []); // Fallback to empty array if no data
    };
    fetchProjects();
  }, []);

  // Run GSAP animation when projects state updates
  useGSAP(() => {
    cardsRef?.current?.forEach((el, i) =>
      gsap.fromTo(
        el,
        { opacity: 0, x: 50 }, // Initial state: hidden + shifted right
        { opacity: 1, x: 0, duration: 0.8, delay: 0.2 * i, ease: "power3.out" } // Animate into view
      )
    );
  }, [projects]);

  return (
    <>
      {/* Page heading */}
      <h1 className="font-bold text-4xl">Projects</h1>

      {/* Grid of project cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {projects?.map((p, i) => (
          <div
            // Assign ref for GSAP animation
            ref={(el) => (cardsRef.current[i] = el)}
            className="card-shadow p-4 rounded-4xl mt-4"
            key={p._id}
          >
            {/* Project name */}
            <p className="font-bold">{p.name}</p>
            {/* Project description */}
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
