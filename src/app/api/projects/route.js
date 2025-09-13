import db from "@/utils/mongo";

// GET route handler to fetch all projects
export async function GET() {
  // Access the "projects" collection from the database
  const projectCollection = db.collection("projects");

  // Retrieve all projects as an array
  const projects = await projectCollection.find().toArray();

  // Return the projects in a JSON response
  return Response.json({ projects });
}
