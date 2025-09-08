'use client';
import { useState } from "react";
export default function NewBlog() {
    const [form, setForm] = useState({ name: "", author: "",content:""});
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...form,date:new Date()}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Project created successfully!");
          setForm({ name: "", author: "",date:"",content:""});
        } 
      })
      .catch((err) => {
        console.error("Create failed:", err);
        alert("Failed to create project");
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
    <h1 className="text-4xl font-bold">Create New Blog</h1>
    <form onSubmit={handleSubmit}>
      <div>
      <input onChange={e => setForm(prev => ({...prev,name:e.target.value}))} required className="mt-4 border w-full p-2 rounded-lg" name="name" type="text" placeholder="Blog name" />
      </div>
      <div>
      <input onChange={e => setForm(prev => ({...prev,author:e.target.value}))} required className="mt-4 border w-full p-2 rounded-lg" name="name" type="text" placeholder="Author name" />
      </div>   
      <div>
      <textarea onChange={e => setForm(prev => ({...prev,content:e.target.value}))} required className="mt-4 border w-full p-2 rounded-lg" name="name" type="text" placeholder="Blog content" />
      </div>
      <button className="mt-4 py-2 px-4 bg-green-700 text-white rounded-lg" type="submit">Create Blog</button>
    </form>
    </>
  );
}
