export const dynamic = "force-dynamic";
import Link from "next/link";
export default async function Blogs(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`)
    const data = await res.json();
    return <>
    <h1 className="font-bold text-4xl">Blogs</h1>
            <div className="grid items-stretch gap-4 md:grid-cols-2">
            {data?.blogs?.map((blog => <Link key={blog?.id} href={`/blogs/${blog?.id}`}>
            <div  className="card-shadow p-4 rounded-4xl mt-4 h-full dark:bg-[#333] dark:text-white">
                <p className="text-3xl">{blog?.name}</p>
                <p>by <span className="italic">{blog?.author}</span></p>
                <p>on <span className="font-bold">{new Date(blog?.date).toLocaleDateString()}</span></p>
            </div>
            </Link>))}
            </div>
    </>
}