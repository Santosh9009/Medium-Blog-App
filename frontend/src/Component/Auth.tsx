

export const Auth = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-3 justify-center md:w-[65%] lg:w-[45%]">
        <div className="w-full font-extrabold text-3xl lg:text-4xl text-center inline-block">Create an account</div>
        <div className=" font-medium text-base md:text-lg text-center text-slate-500 mb-5">Already have an account? Login</div>

        <div>
         <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm md:text-lg font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your username"
              required
            />
          </div>
      <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm md:text-lg font-bold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your username"
              required
            />
          </div>
      <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm md:text-lg font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              
              required
            />
          </div>
          </div>
    
    
          <button className="w-full bg-black px-6 py-3 text-white font-medium text-lg rounded-md">Signup</button>
      </div>
    </div>
  )
}

