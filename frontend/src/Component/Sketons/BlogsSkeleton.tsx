export const BlogsSkeleton = () => {
  return <div>
      <Skeleton/>
      <Skeleton/>
      <Skeleton/>
      <Skeleton/>
  </div>;
};

function Skeleton() {
  return (
    <>
    <div className="flex flex-col gap-1 my-5 w-[70%] mx-auto">
      <div className="flex items-center gap-2">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full mr-2">
          <span className="font-medium text-gray-600"></span>
        </div>

        <div className="bg-gray-200 w-20 h-4"></div>
        <div className="w-[.2rem] h-[.2rem] rounded-full bg-slate-500"></div>

        <div className="bg-gray-200 w-20 h-4"></div>
      </div>

      <div className="font-bold text-3xl bg-gray-200 h-8"></div>

      <div className="text-xl font-serif text-gray-700 bg-gray-200 h-32"></div>

      <div className="text-slate-500 font-medium my-5 bg-gray-200 h-4"></div>
      <div className="bg-slate-200 h-[.15rem]"></div>
    </div>
    </>
  );
}
