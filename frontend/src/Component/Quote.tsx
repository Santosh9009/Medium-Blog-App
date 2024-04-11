import '../App.css'
export const Quote = () => {
  return (
    <div className="h-screen bg-gray-200 flex items-center md:px-16 lg:px-28">
      <div className="w-full flex flex-col items-center ">
        <div>
          <div className="font-bold md:text-xl lg:text-3xl max-w-2xl">
            "The customer service i recieved was exceptional. The support team
            went above and beyong to address my concerns."
          </div>

          <div className="font-semibold text-base lg:text-xl mt-7">Jules Winnfield</div>
          <div className="text-gray-500 text-base lg:text-xl font-medium ">CEO, Acme Inc</div>
        </div>
      </div>
    </div>
  );
};
