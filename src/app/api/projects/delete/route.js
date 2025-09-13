import { ObjectId } from "mongodb";
import db from "@/utils/mongo";

// DELETE route handler for deleting a project by ID
export async function DELETE(req) {
  // Parse the request body to get the project ID
  const body = await req.json();
  const { id } = body;

  // Return an error if no ID is provided
  if (!id) {
    return Response.json({ error: "Project ID is required" }, { status: 400 });
  }

  // Access the "projects" collection from the database
  const projectsCollection = db.collection("projects");

  try {
    // Delete the project document with the matching ObjectId
    const result = await projectsCollection.deleteOne({ _id: new ObjectId(id) });

    // Return success response with the deleted project ID
    return Response.json({ success: true, deletedId: id });
  } catch (err) {
    // Log and return an error response if deletion fails
    console.error("Error deleting project:", err);
    return Response.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
