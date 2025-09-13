'use client';
import { useState } from "react";
import { toast } from "react-toastify";

export default function NewProject() {
    const [form, setForm] = useState({ name: "", description: "" }); // state to store project form data
    const [loading, setLoading] = useState(false); // loading state to disable form during request

    // Handle project creation form submission
    const handleSubmit = (e) => {
      e.preventDefault(); // prevent default form submission
      setLoading(true); // set loading to true when request starts

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // send form data as JSON
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("Project created successfully!"); // success notification
            setForm({ name: "", description: "" }); // reset form fields
          } 
        })
        .catch((err) => {
          console.error("Create failed:", err);
          toast.error("Failed to create project"); // error notification
        })
        .finally(() => setLoading(false)); // stop loading regardless of success/failure
    };

    return (
      <>
        <h1 className="text-4xl font-bold">Create New Project</h1>
        <form onSubmit={handleSubmit}>
          {/* Input field for project name */}
          <div>
            <input 
              value={form.name} 
              onChange={e => setForm(prev => ({...prev,name:e.target.value}))} 
              required 
              className="mt-4 border w-full p-2 rounded-lg" 
              name="name" 
              type="text" 
              placeholder="Project name" 
            />
          </div>  
          
          {/* Textarea for project description */}
          <div>
            <textarea 
              value={form.description} 
              onChange={e => setForm(prev => ({...prev,description:e.target.value}))} 
              required 
              className="mt-4 border w-full p-2 rounded-lg" 
              name="name" 
              type="text" 
              placeholder="Project description" 
            />
          </div>

          {/* Submit button */}
          <button 
            className="mt-4 py-2 px-4 bg-green-700 text-white rounded-lg" 
            type="submit"
          >
            Create Project
          </button>
        </form>
      </>
    );
}
