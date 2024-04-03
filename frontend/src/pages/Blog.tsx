import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { blog, loading } = useBlog(id || " ");

  if (loading) {
    <div>loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 scroll">
      <div className="col-span-2 flex flex-col justify-start items-center py-20 font-serif">
        <div className="flex flex-col gap-10 max-w-4xl mx-auto px-10">
          <div>
            <div className="font-extrabold text-3xl lg:text-6xl mb-2">
              {blog?.title}
            </div>
            <div className="text-lg lg:text-xl">
              Posted on{" "}
              {blog?.publishDate === undefined
                ? "Dec 23, 2023"
                : blog?.publishDate}
            </div>
          </div>
          <div className="text-gray-700 text-lg lg:text-lg lg:leading-loose">
            {blog?.content}
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="h-full flex flex-col justify-start items-start my-40 mx-10 gap-5 font-medium">
          <div>
            Author
          </div>
          <div className="flex gap-5 items-center">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="font-semibold text-2xl lg:text-3xl">
            {blog?.author.name || "Anonymous"}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
