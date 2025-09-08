import { ObjectId } from "mongodb";
import db from "@/utils/mongo";
export async function GET(req,{params}) {
  const id = params.blog;
  const blogsCollection =db.collection("blogs");
    try {
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    return Response.json({ ...blog})
    }
  catch (error) {
    return new Response.json(null)
  }
}
// removed env variables from vercel