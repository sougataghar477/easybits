import db from "@/utils/mongo";

// GET route handler for fetching all blogs
export async function GET() {
  // Access the "blogs" collection from the database
  const blogsCollection = db.collection("blogs");

  // Fetch all blogs from the collection, convert cursor to array,
  // and map each blog document to return only selected fields
  const blogs = (await blogsCollection.find().toArray()).map(blog => ({
    id: blog._id.toString(), // Convert ObjectId to string for frontend use
    name: blog.name,         // Blog name
    author: blog.author,     // Blog author
    date: blog.date          // Blog date
  }));

  // Return the list of blogs as a JSON response
  return Response.json({ blogs });
}
