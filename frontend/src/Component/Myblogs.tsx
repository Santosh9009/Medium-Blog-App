import { useMyblogs } from "../hooks";
import { MyblogCard } from "./MyblogCard";
import { Skeleton } from "./Sketons/BlogsSkeleton";

export const Myblogs = () => {
  const { blogs, loading } = useMyblogs();

  if (loading) {
    return (
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="">
      <div className="text-center font-medium text-3xl">MyBlogs</div>
      {blogs.map((e,i) => (
        <MyblogCard key={i}
          authorname={e.author.name}
          title={e.title}
          content={e.content}
          publishDate={e.publishDate}
          id={e.id}
        />
      ))}
    </div>
  );
};





