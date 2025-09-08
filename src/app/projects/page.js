export const dynamic = "force-dynamic";
export default async function Projects(){
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`)
      const data = await res.json();
    return <>
    <h1 className="font-bold text-4xl">Projects</h1>
    <div className="grid md:grid-cols-2 gap-4">
        {data?.projects?.map((p)=> <div className="card-shadow dark:bg-[#333] p-4 rounded-4xl mt-4 dark:text-white" key={p._id}>
            <p className="font-bold">{p.name}</p>
            <p>{p.description}</p>
        </div>)}
    </div>
    </>
}