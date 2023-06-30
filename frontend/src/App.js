import ArticleIcon from "@mui/icons-material/Article";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import React, { useState } from "react";
import "./App.css";
import Display from "./components/Display";
import Article from "./components/Article";
import About from "./components/About";
import Contact from "./components/Contact";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const drawerList = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Articles", icon: <ArticleIcon />, path: "/articles" },
  { label: "About", icon: <InfoIcon />, path: "/about" },
  { label: "Contact us", icon: <CallSharpIcon />, path: "/contact" },
];

function App() {
  const [drawer, setDrawer] = useState(false);
  const [focusedItem, setFocusedItem] = useState(0);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedItem((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedItem((prev) =>
        prev < drawerList.length - 1 ? prev + 1 : prev
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      setDrawer(false);
    } else if (event.key === "esc") {
      setDrawer(false);
    }
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => {}}
      onKeyDown={handleKeyDown}
    >
      <List>
        {drawerList.map((item, index) => (
          <ListItem
            tabIndex={index}
            onClick={() => {
              setDrawer(false);
            }}
            sx={{
              backgroundColor:
                focusedItem === index ? "#e0e0e0" : "transparent",
            }}
            onMouseOver={() => setFocusedItem(index)}
          >
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Router>
      <div className="App" tabIndex={-1} onKeyDown={handleKeyDown}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                MernFern
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>

        <SwipeableDrawer
          anchor={"left"}
          open={drawer}
          onClose={() => setDrawer(false)}
          onOpen={() => setDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>

        <Routes>
          <Route path="/" element={<Display />} />
          <Route path="/articles" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
