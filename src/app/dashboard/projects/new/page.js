'use client';
import { useState } from "react";
import { toast } from "react-toastify";
export default function NewProject() {
    const [form, setForm] = useState({ name: "", description: "" });
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Project created successfully!");
          setForm({ name: "", description: "" });
        } 
      })
      .catch((err) => {
        console.error("Create failed:", err);
        toast.error("Failed to create project");
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
    <h1 className="text-4xl font-bold">Create New Project</h1>
    <form onSubmit={handleSubmit}>
      <div>
      <input value={form.name} onChange={e => setForm(prev => ({...prev,name:e.target.value}))} required className="mt-4 border w-full p-2 rounded-lg" name="name" type="text" placeholder="Project name" />
      </div>  
      <div>
      <textarea value={form.description} onChange={e => setForm(prev => ({...prev,description:e.target.value}))} required className="mt-4 border w-full p-2 rounded-lg" name="name" type="text" placeholder="Project description" />
      </div>
      <button className="mt-4 py-2 px-4 bg-green-700 text-white rounded-lg" type="submit">Create Project</button>
    </form>
    </>
  );
}
