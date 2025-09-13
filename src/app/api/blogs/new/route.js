import db from "@/utils/mongo";

// POST route handler for creating a new blog
export async function POST(req) {
  try {
    // Parse request body to extract blog fields
    const body = await req.json();
    const { name, author, date, content } = body;

    // Access the "blogs" collection from the database
    const blogsCollection = db.collection("blogs");

    // Insert a new blog document into the collection
    const result = await blogsCollection.insertOne({
      name,
      author,
      date,
      content
    });

    // Return success response with the inserted document's ID
    return Response.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (err) {
    // Log error for debugging
    console.error("Error creating project:", err);

    // Return error response if insertion fails
    return Response.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
