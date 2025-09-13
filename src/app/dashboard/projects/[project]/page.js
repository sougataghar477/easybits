"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function DashboardProject() {
  const [form, setForm] = useState({ name: "", description: "" }); // state to hold project details
  const [loading, setLoading] = useState(true); // loading indicator for fetch
  const [editable,setEditable] = useState(false); // toggle whether fields are editable
  const { project } = useParams(); // get project ID from URL params

  // Handle project update form submission
  const handleSubmit = async (e)=>{
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: project, // project ID from params
        name: form.name, // updated project name
        description: form.description, // updated project description
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Project updated successfully!"); // success notification
        }
      })
      .catch((err) => {
        console.error("Update failed:", err);
        toast.error("Failed to update project"); // error notification
      })
  }

  // Fetch project details when component mounts or project param changes
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${project}`)
      .then((r) => r.json())
      .then((d) => setForm(d)) // populate form with fetched project data
      .catch(err => setForm({name: "", description: ""})) // fallback if fetch fails
      .finally(() => setLoading(false)); // stop loading
  }, [project]);

  // Show loading indicator while fetching data
  if (loading) return <h1>Loading...</h1>;

  // If no valid project data, show error message
  if (!loading && !form?.name && !form?.description) {
    return <h1 className="text-red-600 font-bold">Invalid Project ID</h1>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold">View or Edit Project</h1>
      <form onSubmit={handleSubmit}>
        {/* Input for project name */}
        <input
          className="w-full border mt-4 px-4 py-2 rounded-xl"
          type="text"
          value={form.name || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {/* Textarea for project description */}
        <textarea
          className="w-full block border mt-4 px-4 py-2 rounded-xl"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        {/* Checkbox to enable/disable editing */}
        <input checked={editable} onChange={()=> setEditable(prev=> !prev)} className="mt-4" type="checkbox"/><span>Edit</span>
        {/* Submit button is disabled until 'Edit' is checked */}
        <button className="block mt-4 rounded-lg cursor-pointer bg-green-700 px-4 py-2 text-white disabled:bg-green-400 disabled:cursor-auto" disabled={!editable} type="submit">Submit</button>
      </form>
    </>
  );
}
