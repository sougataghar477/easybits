import { ObjectId } from "mongodb";
import db from "@/utils/mongo";

export async function PUT(req) {
    const body = await req.json();
    const { id, name, description } = body;
    if (!id) {
      return Response.json({ error: "Project ID is required" }, { status: 400 });
    }
    const projectCollection = db.collection("projects");
    try {
    const result = await projectCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, description } }
    );
    return Response.json({ success: true, updatedId: id });
  } catch (err) {
    console.error("Error updating project:", err);
    return Response.json({ error: "Failed to update project" }, { status: 500 });
  }
}
