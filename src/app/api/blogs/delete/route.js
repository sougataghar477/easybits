import { ObjectId } from "mongodb";
import db from "@/utils/mongo";

// DELETE route handler for removing a blog by ID
export async function DELETE(req) {
  // Parse the request body to extract the blog ID
  const body = await req.json();
  const { id } = body;

  // Validate if ID is provided
  if (!id) {
    return Response.json({ error: "Blog ID is required" }, { status: 400 });
  }

  // Access the "blogs" collection from the database
  const blogsCollection = db.collection("blogs");

  try {
    // Attempt to delete the blog document matching the provided ID
    const result = await blogsCollection.deleteOne({ _id: new ObjectId(id) });

    // Return a success response with the deleted ID
    return Response.json({ success: true, deletedId: id });
  } catch (err) {
    // Log error for debugging purposes
    console.error("Error deleting blog:", err);

    // Return error response if deletion fails
    return Response.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
