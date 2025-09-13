import { ObjectId } from "mongodb";
import db from "@/utils/mongo";

// PUT route handler for updating a project by ID
export async function PUT(req) {
    // Parse the request body to get project ID, name, and description
    const body = await req.json();
    const { id, name, description } = body;

    // Return an error if no ID is provided
    if (!id) {
      return Response.json({ error: "Project ID is required" }, { status: 400 });
    }

    // Access the "projects" collection from the database
    const projectCollection = db.collection("projects");

    try {
        // Update the project document with the matching ObjectId
        const result = await projectCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { name, description } }
        );

        // Return success response with the updated project ID
        return Response.json({ success: true, updatedId: id });
    } catch (err) {
        // Log and return an error response if update fails
        console.error("Error updating project:", err);
        return Response.json({ error: "Failed to update project" }, { status: 500 });
    }
}
