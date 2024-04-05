import { useState } from "react";
import { signuptype } from "@santosh_pati/medium-common";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { getRandomColor } from "../assets/Color"

export const Auth = ({ type }: { type: "Signup" | "Signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signuptype>({
    email: "",
    name: "",
    password: "",
  });

  async function Sendrequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "Signup" ? "signup" : "signin"}`,postInputs);
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      localStorage.setItem('color',getRandomColor())
      navigate("/blogs");
    } catch (e) {
      alert("Signup failed");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-3 justify-center md:w-[65%] lg:w-[45%]">
        <div className="w-full font-extrabold text-3xl lg:text-4xl text-center inline-block">
          Create an account
        </div>

        <div className=" font-medium text-base md:text-lg text-center text-slate-500 mb-5">
          {type === "Signup"
            ? "Already have an account ?"
            : "Dont have an account ?"}
          <Link
            className="underline text-blue-500"
            to={type === "Signup" ? "/signin" : "/signup"}
          >
            {type === "Signup" ? " Login" : " Sign up"}
          </Link>
        </div>

        <div>
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
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your username"
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
            <input
              id="password"
              type="password"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }));
              }}
              required
            />
          </div>
        </div>

        <button onClick={Sendrequest} className="w-full bg-black px-6 py-3 text-white font-medium text-lg rounded-md active:bg-blue-500">
          {type === "Signup" ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};
