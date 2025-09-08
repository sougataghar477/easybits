import { ObjectId } from "mongodb";
import db from "@/utils/mongo";

export async function DELETE(req) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return Response.json({ error: "Blog ID is required" }, { status: 400 });
  }

  const blogsCollection = db.collection("blogs");

  try {
    const result = await blogsCollection.deleteOne({ _id: new ObjectId(id) });

    return Response.json({ success: true, deletedId: id });
  } catch (err) {
    console.error("Error deleting blog:", err);
    return Response.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
