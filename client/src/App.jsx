import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateBlog from "./pages/CreateBlog";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import GlobalLoader from "./components/GlobalLoader";
import { setLoader } from "./api/axios";
import { useEffect } from "react";
import { useLoader } from "./context/LoaderContext";

function App() {
  const { showLoader, hideLoader } = useLoader();
  useEffect(() => {
    setLoader({ showLoader, hideLoader });
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <GlobalLoader />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
