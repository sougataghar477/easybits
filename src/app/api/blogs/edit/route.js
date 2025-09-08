import { ObjectId } from "mongodb";
import db from "@/utils/mongo";

export async function PUT(req) {
  const body = await req.json();
  const { id, name, author, date, content } = body;

  if (!id) {
    return Response.json({ error: "Blog ID is required" }, { status: 400 });
  }

  const blogsCollection = db.collection("blogs");

  try {
    const result = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, author, date, content } }
    );

    return Response.json({ success: true, updatedId: id });
  } catch (err) {
    console.error("Error updating blog:", err);
    return Response.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}
