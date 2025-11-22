import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout.jsx";
import ScrollToTop from "./components/ScrollTopTop.jsx"; // <-- matches your file name

import Login from "./pages/Login.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

import AdminLayout from "./admin/AdminLayout.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import Leads from "./admin/Leads.jsx";
import Projects from "./admin/Projects.jsx";
import Posts from "./admin/Posts.jsx";
import Users from "./admin/Users.jsx"; // enable when file exists

import Contact from "./pages/Contact.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import ProjectView from "./pages/ProjectView.jsx";
import Blog from "./pages/Blog.jsx";
import PostView from "./pages/PostView.jsx";

// Optional features (uncomment when files exist)
import RequestReset from "./pages/RequestReset.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

import TestMarkdown from "./test-markdown.jsx"; 
import Services from "./pages/Services.jsx";
import Pricing from "./pages/Pricing.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";


//import SEO from "./components/SEO.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* ================= PUBLIC AREA ================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectView />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<PostView />} />

          <Route path="/contact" element={<Contact />} />

          {/* Markdown test page */}
          <Route path="/test-md" element={<TestMarkdown />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          
          <Route path="/forgot" element={<RequestReset />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />

          
        </Route>


        {/* ================= ADMIN AREA ================= */}
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="projects" element={<Projects />} />
          <Route path="posts" element={<Posts />} />
           <Route path="users" element={<Users />} /> 
        </Route>


        {/* ================= FALLBACK ================= */}
       
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
