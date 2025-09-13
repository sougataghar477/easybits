import db from "@/utils/mongo";

// POST route handler for creating a new project
export async function POST(req) {
  try {
    // Parse the request body to get project name and description
    const body = await req.json();
    const { name, description } = body;

    // Access the "projects" collection from the database
    const projectCollection = db.collection("projects");

    // Insert a new project document into the collection
    const result = await projectCollection.insertOne({
      name,
      description,
    });

    // Return success response with the inserted project ID
    return Response.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (err) {
    // Log and return an error response if creation fails
    console.error("Error creating project:", err);
    return Response.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
