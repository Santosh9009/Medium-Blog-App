import { useEffect } from "react";
import BlogCard from "../Component/BlogCard"
import { BlogsSkeleton } from "../Component/Sketons/BlogsSkeleton";
import { useBlogs } from "../hooks"


export const Blogs = () => {
  const {loading, blogs} = useBlogs();

  useEffect(()=>{
    console.log(blogs)
  })

  if(loading){
    return <div><BlogsSkeleton/></div>
  }
  

  return (
    <div>
     {blogs && blogs.map((e,index)=><BlogCard key={index} title={e.title} content={e.content} publishDate={e.publishDate} authorname={e.author.name} id={e.id}/>)}
    </div>
  )
}

