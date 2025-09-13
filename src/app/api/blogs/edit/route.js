import { ObjectId } from "mongodb";
import db from "@/utils/mongo";

// PUT route handler for updating a blog by ID
export async function PUT(req) {
  // Parse request body to extract fields
  const body = await req.json();
  const { id, name, author, date, content } = body;

  // Validate if ID is provided
  if (!id) {
    return Response.json({ error: "Blog ID is required" }, { status: 400 });
  }

  // Access the "blogs" collection from the database
  const blogsCollection = db.collection("blogs");

  try {
    // Update the blog document with the given ID
    const result = await blogsCollection.updateOne(
      { _id: new ObjectId(id) }, // Find blog by ObjectId
      { $set: { name, author, date, content } } // Set new field values
    );

    // Return success response with updated ID
    return Response.json({ success: true, updatedId: id });
  } catch (err) {
    // Log error for debugging
    console.error("Error updating blog:", err);

    // Return error response if update fails
    return Response.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}
