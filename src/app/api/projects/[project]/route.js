import { ObjectId } from "mongodb";
import db from "@/utils/mongo";

export async function GET(req, { params }) {
  const { project } = params;
  const projectCollection = db.collection("projects");

  try {
    const projectData = await projectCollection.findOne({ _id: new ObjectId(project) });
    return new Response(JSON.stringify(projectData), { status: 200 });
  } 
  catch (error) {
    return new Response(JSON.stringify({ error: "Invalid project ID" }), { status: 400 });
  }
}
