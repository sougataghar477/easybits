import db from "@/utils/mongo";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, author,date,content } = body;

    const blogsCollection = db.collection("blogs");

    const result = await blogsCollection.insertOne({
      name,
      author,
      date,
      content
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
