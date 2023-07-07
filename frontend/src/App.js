import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import About from "./pages/AboutPage";
import Article from "./pages/ArticlePage";
import Contact from "./pages/ContactPage";
import Display from "./components/Display";
import AppBar from "./components/MyAppBar";
import Drawer from "./components/MyDrawer";
import PageNotFound from "./pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";

function App() {
  const [drawer, setDrawer] = useState(false);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="app">
          {/* AppBar */}
          <AppBar setDrawer={setDrawer} />

          {/* SwipeableDrawer */}
          <Drawer drawer={drawer} setDrawer={setDrawer} />

          <div className="content">
            <Routes>
              <Route path="/" element={<Display />} />
              <Route path="/articles" element={<Article />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
