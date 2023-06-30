import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Article from "./components/Article";
import Contact from "./components/Contact";
import Display from "./components/Display";
import AppBar from "./components/MyAppBar";
import Drawer from "./components/MyDrawer";
import PageNotFound from "./components/PageNotFound";

function App() {
  const [drawer, setDrawer] = useState(false);

  return (
    <Router>
      <div className="App">
        {/* AppBar */}
        <AppBar setDrawer={setDrawer} />

        {/* SwipeableDrawer */}
        <Drawer drawer={drawer} setDrawer={setDrawer} />

        <Routes>
          <Route path="/" element={<Display />} />
          <Route path="/articles" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
