import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useRecoilState } from "recoil";
import { UserState } from "../Store/Atoms";
import { toast } from 'react-toastify';
import '../App.css'
type User = {
  name: string;
  email: string;
  password: string;
};

export const ProfileComp = () => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useRecoilState(UserState);
  const [newUser, setNewUser] = useState<User>({ ...user }); // Initialize with current user data
  const navigate = useNavigate();

  const handleEdit = () => {
    setNewUser({ ...user }); // Reset new user data to current user data
    setEditing(true);
  };

  const handleSave = () => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.put(`${BACKEND_URL}/api/v1/user/me/update`, newUser, {
      headers: headers,
    }).then(() => {
      setUser(newUser); // Update UserState with new user data
      setEditing(false);
      toast.success("Updated Successfully");
    }).catch((error) => {
      console.log(error);
      toast.error("Update Failed");
    });
  };

  const handleCancel = () => {
    setEditing(false);
    // Reset the newUser state to current user data if canceling edit
    setNewUser({ ...user });
  };


  return (
    <>
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          User Profile
        </h2>
      </div>
      <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            {editing ? (
              <input
                id="name"
                name="name"
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            ) : (
                <p className="mt-1">{user.name}</p>
              )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            {editing ? (
              <input
                id="email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            ) : (
                <p className="mt-1">{user.email}</p>
              )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            {editing ? (
              <input
                id="password"
                name="password"
                type="text"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            ) : (
                <p className="mt-1">
                  {user.password.substring(0, 3)}{" "}
                  {user.password.substring(3).replace(/./g, "*")}
                </p>
              )}
          </div>
          <div className="flex justify-between">
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </>
            ) : (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit
                </button>
              )}
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("color");
                navigate("/signin")
                toast.info('Logout!');
              }}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
