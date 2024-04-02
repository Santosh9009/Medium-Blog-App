import Appbar from "../Component/Appbar"
import BlogCard from "../Component/BlogCard"
import { useBlogs } from "../hooks"


export const Blogs = () => {
  const {loading, blogs} = useBlogs();

  if(loading){
    return <div>loading...</div>
  }

  return (
    <div className="">
      <Appbar authorname={'someone'}/>
     {blogs && blogs.map((e,index)=><BlogCard key={index} title={e.title} content={e.content} publishDate={e.publishDate} authorname={e.author.name}/>)}
    </div>
  )
}

