import db from "@/utils/mongo";
export async function GET() {
  const blogsCollection =db.collection("blogs");
  const blogs = (await blogsCollection.find().toArray()).map(blog => ({
  id: blog._id.toString(),
  name: blog.name,
  author: blog.author,
  date: blog.date
}));

  return Response.json({ blogs})
}