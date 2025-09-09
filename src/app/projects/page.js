"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const dynamic = "force-dynamic";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`);
      const data = await res.json();
      setProjects(data.projects || []);
    };
    fetchProjects();
  }, []);

useGSAP(() => {
cardsRef?.current?.forEach((el,i) =>
  gsap.fromTo(el,{ opacity: 0, x: 50 }, // starting state
    { opacity: 1, x: 0, duration: 0.8, delay: 0.2*i, ease: "power3.out" })
)
}, [projects]);
 

  return (
    <>
      <h1 className="font-bold text-4xl">Projects</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {projects?.map((p, i) => (
          <div
            ref={(el) => (cardsRef.current[i] = el)}
            className="card-shadow p-4 rounded-4xl mt-4"
            key={p._id}
          >
            <p className="font-bold">{p.name}</p>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
