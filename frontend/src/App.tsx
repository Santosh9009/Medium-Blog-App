import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import Profile from "./pages/Profile";
import { Createblog } from "./pages/Createblog";
import PrivateRoute from "./Component/PrivateRoute";
import { Myblog } from "./pages/Myblog";
import { EditBlog } from "./Component/EditBlog";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route element={<PrivateRoute/>}>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<Createblog />} />
            <Route path="/myblog/edit" element={<EditBlog />} />
            <Route path="/myblog/:id" element={<Myblog />} />
            <Route path="/blog/:id" element={<Blog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
