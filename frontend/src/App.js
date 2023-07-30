import React, { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AppBar from "./components/MyAppBar";
import Drawer from "./components/MyDrawer";
import About from "./pages/AboutPage";
import Article from "./pages/ArticlePage";
import Contact from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import ProfilePage from "./pages/ProfilePage";
import Signup from "./pages/SignupPage";

export const UserContext = createContext();

function App() {
  const [drawer, setDrawer] = useState(false);
  const [loggedin, setLoggedIn] = useState(
    localStorage.getItem("user") !== null ? true : false
  );
  const queryClient = new QueryClient();

  return (
    <UserContext.Provider
      client={queryClient}
      value={{ loggedin, setLoggedIn }}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="app">
            {/* AppBar */}
            <AppBar setDrawer={setDrawer} />

            {/* SwipeableDrawer */}
            <Drawer drawer={drawer} setDrawer={setDrawer} />

            <div className="content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/articles" element={<Article />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<ProfilePage />} />

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default App;
