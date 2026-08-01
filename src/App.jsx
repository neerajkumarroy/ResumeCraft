import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Landing from "./pages/Landing.jsx";
import Templates from "./pages/Templates.jsx";
import Editor from "./pages/Editor.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PreviewOnly from "./pages/PreviewOnly.jsx";
import NotFound from "./pages/NotFound.jsx";

const SiteLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SiteLayout>
            <Landing />
          </SiteLayout>
        }
      />
      <Route
        path="/templates"
        element={
          <SiteLayout>
            <Templates />
          </SiteLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <SiteLayout>
            <Dashboard />
          </SiteLayout>
        }
      />
      <Route path="/preview/:templateId" element={<PreviewOnly />} />
      <Route path="/editor/:resumeId" element={<Editor />} />
      <Route
        path="*"
        element={
          <SiteLayout>
            <NotFound />
          </SiteLayout>
        }
      />
    </Routes>
  );
}

export default App;
