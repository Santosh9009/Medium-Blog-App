import { useState } from "react";
import { signuptype } from "@santosh_pati/medium-common";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { getRandomColor } from "../hooks/Functions";
import "../App.css";
import { toast } from "react-toastify";
import img from "../assets/icons8-back-50.png";
import eye from "../assets/icons8-view-48.png";
import cross from "../assets/icons8-cross-50.png";
import { Spinner } from "./Spinner";

export const Auth = ({ type }: { type: "Signup" | "Signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signuptype>({
    email: "",
    name: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading ,setLoading] = useState(false);

  async function Sendrequest(e: React.FormEvent) {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    try {
      if (type==="Signup" && postInputs.password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "Signup" ? "signup" : "signin"}`,
        type==="Signup"?postInputs:{email:postInputs.email,password:postInputs.password}
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      localStorage.setItem("color", getRandomColor());
      navigate("/blogs");
      setTimeout(() => toast.success(`${type} Successfully!`), 500);
    } catch (e) {
      setTimeout(() => toast.error(`${type} Failed!`), 500);
    }
    setLoading(false)
  }

  if(loading){
    return <div><Spinner/></div>
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center fade-in">
        <Link to={"/"} className=" w-11 h-11 md:w-16 md:h-16 absolute top-5 left-5 hover:scale-110 duration-200">
          <img src={img} alt="" />
        </Link>
        <form
          onSubmit={Sendrequest}
          className="flex flex-col gap-3 justify-center md:w-[65%] lg:w-[45%]"
        >
          <div className="w-full font-extrabold text-3xl lg:text-4xl text-center inline-block">
            {type === "Signup" ? "Create an account" : "Login to the account"}
          </div>

          <div className="font-medium text-base md:text-lg text-center text-slate-500 mb-5">
            {type === "Signup"
              ? "Already have an account ?"
              : "Don't have an account ?"}
            <Link
              className="underline text-blue-500"
              to={type === "Signup" ? "/signin" : "/signup"}
            >
              {type === "Signup" ? " Login" : " Sign up"}
            </Link>
          </div>

          {type === "Signup" && (
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
                minLength={1}
                className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your username"
                onChange={(e) => {
                  setPostInputs((c) => ({
                    ...c,
                    name: e.target.value,
                  }));
                }}
                required
              />
            </div>
          )}
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
              minLength={5}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  email: e.target.value,
                }));
              }}
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
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                minLength={5}
                className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => {
                  setPostInputs((c) => ({
                    ...c,
                    password: e.target.value,
                  }));
                }}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <img className="w-6 h-6 md:w-8 md:h-8" src={cross} alt="" />
                ) : (
                 <img className="w-6 h-6 md:w-8 md:h-8" src={eye} alt="" />
                )}
              </button>
            </div>
          </div>

          {type === "Signup" && (
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm md:text-lg font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                minLength={5}
                className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black px-6 py-3 text-white font-medium text-lg rounded-md active:bg-blue-500 duration-200"
          >
            {type === "Signup" ? "Sign up" : "Sign in"}
          </button>
        </form>
      </div>
    </>
  );
};
