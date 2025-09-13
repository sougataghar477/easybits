import { ObjectId } from "mongodb";
import db from "@/utils/mongo";

// GET route handler for fetching a single project by ID
export async function GET(req, { params }) {
  const { project } = params; // Extract project ID from route parameters

  // Access the "projects" collection from the database
  const projectCollection = db.collection("projects");

  try {
    // Find a single project document matching the given ObjectId
    const projectData = await projectCollection.findOne({ _id: new ObjectId(project) });

    // Return the project data as JSON response with status 200
    return new Response(JSON.stringify(projectData), { status: 200 });
  } 
  catch (error) {
    // If an error occurs (e.g., invalid ObjectId), return error response
    return new Response(JSON.stringify({ error: "Invalid project ID" }), { status: 400 });
  }
}
