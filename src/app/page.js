import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <h1 className='my-4 text-4xl font-bold'>Welcome to my portfolio website</h1>
      <p>Please check out the links in the navbar</p>
      <img className="my-4 rounded-2xl" src={'/ivo-sousa-martins-CHNFh_mzuEc-unsplash.jpg'} alt="image of sea"/>
    </div>
  );
}
