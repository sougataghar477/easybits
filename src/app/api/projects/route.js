import db from "@/utils/mongo";
export async function GET() {
  const projectCollection =db.collection("projects");
  const projects =await projectCollection.find().toArray();
  return Response.json({ projects})
}