"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function DashboardProject() {
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [editable,setEditable] = useState(false);
  const { project } = useParams();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: project,
        name: form.name,
        description: form.description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Project updated successfully!");
        }
      })
      .catch((err) => {
        console.error("Update failed:", err);
        toast.error("Failed to update project");
      })
  }
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${project}`)
      .then((r) => r.json())
      .then((d) => setForm(d))
      .catch(err => setForm({name: "", description: ""}))
      .finally(() => setLoading(false));
  }, [project]);

  if (loading) return <h1>Loading...</h1>;

  if (!loading && !form?.name && !form?.description) {
    return <h1 className="text-red-600 font-bold">Invalid Project ID</h1>;
  }
  return (
    <>
      <h1 className="text-4xl font-bold">View or Edit Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full border mt-4 px-4 py-2 rounded-xl"
          type="text"
          value={form.name || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <textarea
          className="w-full block border mt-4 px-4 py-2 rounded-xl"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input checked={editable} onChange={()=> setEditable(prev=> !prev)} className="mt-4" type="checkbox"/><span>Edit</span>
        <button className="block mt-4 rounded-lg cursor-pointer bg-green-700 px-4 py-2 text-white disabled:bg-green-400 disabled:cursor-auto" disabled={!editable} type="submit">Submit</button>
      </form>
    </>
  );
}
