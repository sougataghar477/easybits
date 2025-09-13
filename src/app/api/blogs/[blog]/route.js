import { ObjectId } from "mongodb";
import db from "@/utils/mongo";

// GET route handler for fetching a single blog by ID
export async function GET(req, { params }) {
  // Extract blog ID from route parameters
  const id = params.blog;

  // Access the "blogs" collection in MongoDB
  const blogsCollection = db.collection("blogs");

  try {
    // Find a single blog document by its ObjectId
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });

    // Return blog data as JSON response
    return Response.json({ ...blog });
  } catch (error) {
    // If there's an error, return null response
    return new Response.json(null);
  }
}
