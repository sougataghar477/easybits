import db from "@/utils/mongo";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description } = body;

    const projectCollection = db.collection("projects");

    const result = await projectCollection.insertOne({
      name,
      description,
    });

    return Response.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (err) {
    console.error("Error creating project:", err);
    return Response.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
