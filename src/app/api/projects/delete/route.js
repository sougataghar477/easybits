import { ObjectId } from "mongodb";
import db from "@/utils/mongo";

export async function DELETE(req) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return Response.json({ error: "Project ID is required" }, { status: 400 });
  }

  const projectsCollection = db.collection("projects");

  try {
    const result = await projectsCollection.deleteOne({ _id: new ObjectId(id) });

    return Response.json({ success: true, deletedId: id });
  } catch (err) {
    console.error("Error deleting project:", err);
    return Response.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
