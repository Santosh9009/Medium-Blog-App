export const BlogSkeleton = () => {
  return (
    <div className="grid md:grid-cols-3 px-5">
  <div className="col-span-2 flex flex-col justify-start items-center py-20 font-serif">
    <div className="flex flex-col gap-10 max-w-4xl mx-auto pr-5">
      <div>
        <div className="w-56 h-12 bg-gray-100 mb-4"></div>
        <div className="w-3/4 h-8 bg-gray-200 mb-3"></div>
        <div className="flex gap-5 items-center md:invisible">
          <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
          <div className="w-3/4 h-8 bg-gray-200"></div>
        </div>
      </div>
      <div className="w-full h-96 bg-gray-200"></div>
    </div>
  </div>
  <div className="col-span-1">
    <div className="md:visible invisible h-full flex flex-col justify-start items-start my-40 gap-3 font-medium px-auto overflow-hidden">
      <div className="w-24 h-8 bg-gray-100"></div>
      <div className="w-40 flex gap-5 items-center">
        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        <div className="w-3/4 h-8 bg-gray-200"></div>
      </div>
    </div>
  </div>
</div>


  );
};
