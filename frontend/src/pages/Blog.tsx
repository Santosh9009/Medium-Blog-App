import { useParams } from "react-router-dom";
import { Spinner } from "../Component/Spinner";
import { useBlog } from "../hooks";

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const {blog, loading} = useBlog(id || "");

  if (loading) {
    return (
      <div>
        <Spinner/>
      </div>
    );
  }

  return (
    <>
    <div className="grid md:grid-cols-3 px-5 fade-in">
      <div className="col-span-2 flex flex-col justify-start items-center py-20 font-serif">
        <div className="flex flex-col gap-10 max-w-4xl mx-auto px-5">
          <div>
            <div className="font-extrabold text-3xl lg:text-6xl mb-2">
              {blog?.title}
            </div>
            <div className="text-lg lg:text-xl">
              Posted on{" "}
              {!blog?.publishDate ? '25 Dec, 2023':blog.publishDate}
            </div>
            <div className="flex gap-5 items-center md:invisible">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="font-semibold text-xl lg:text-3xl">
                {blog?.author.name || "Anonymous"}
              </div>
            </div>
          </div>
          <div className="text-gray-700 text-lg lg:text-lg lg:leading-loose">
            {blog?.content}
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="md:visible invisible h-full flex flex-col justify-start items-start my-40 gap-3 font-medium px-auto overflow-hidden">
          <div>Author</div>
          <div className="flex gap-5 items-center">
            <div className="md:w-5 md:h-5 bg-gray-300 rounded-full"></div>
            <div className="font-semibold text-xl lg:text-3xl">
              {blog?.author.name || "Anonymous"}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
