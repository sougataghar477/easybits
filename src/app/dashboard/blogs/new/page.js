'use client';
import { useState } from "react";
import { toast } from 'react-toastify';

export default function NewBlog() {
    // State for form fields: name, author, content
    const [form, setForm] = useState({ name: "", author: "", content:""});
    // Loading state to disable/indicate submission in progress
    const [loading, setLoading] = useState(false);

    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault(); // prevent default form reload
      setLoading(true);

      // Send POST request to create new blog
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Spread form values and include date
        body: JSON.stringify({ ...form, date: new Date() }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log(data); // Debug: log response
            toast.success("Blog created successfully!"); // show success notification
            // Reset form fields
            setForm({ name: "", author: "", date:"", content:""});
          } 
        })
        .catch((err) => {
          console.error("Create failed:", err);
          toast.error("Failed to create Blog"); // show error notification
        })
        .finally(() => setLoading(false)); // reset loading state
    };

    return (
      <>
        <h1 className="text-4xl font-bold">Create New Blog</h1>
        <form onSubmit={handleSubmit}>
          {/* Blog name input */}
          <div>
            <input 
              value={form.name} 
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} 
              required 
              className="mt-4 border w-full p-2 rounded-lg" 
              name="name" 
              type="text" 
              placeholder="Blog name" 
            />
          </div>

          {/* Author input */}
          <div>
            <input 
              value={form.author} 
              onChange={e => setForm(prev => ({ ...prev, author: e.target.value }))} 
              required 
              className="mt-4 border w-full p-2 rounded-lg" 
              name="name" 
              type="text" 
              placeholder="Author name" 
            />
          </div>   

          {/* Blog content input */}
          <div>
            <textarea 
              value={form.content} 
              onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))} 
              required 
              className="mt-4 border w-full p-2 rounded-lg" 
              name="name" 
              type="text" 
              placeholder="Blog content" 
            />
          </div>

          {/* Submit button */}
          <button 
            className="mt-4 py-2 px-4 bg-green-700 text-white rounded-lg" 
            type="submit"
          >
            Create Blog
          </button>
        </form>
      </>
    );
}
