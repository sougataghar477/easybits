import Link from "next/link"
export default function Dashboard(){
    return <>
    <h1 className="text-4xl underline"><Link href={'/dashboard/projects'}>Go To Projects</Link></h1>
    <h1 className="text-4xl underline"><Link href={'/dashboard/blogs'}>Go To Blogs</Link></h1>
    </>
}