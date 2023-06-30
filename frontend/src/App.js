import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
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
import React, { useEffect, useState } from "react";
import "./App.css";
import Display from "./components/Display";

function App() {
  const [drawer, setDrawer] = useState(false);
  const [focusedItem, setFocusedItem] = useState(0);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedItem((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedItem((prev) => (prev < 1 ? prev + 1 : prev));
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
        <ListItem
          tabIndex={0}
          onClick={() => {
            setDrawer(false);
          }}
          sx={{
            backgroundColor: focusedItem === 0 ? "#e0e0e0" : "transparent",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem
          tabIndex={1}
          onClick={() => {
            setDrawer(false);
          }}
          sx={{
            backgroundColor: focusedItem === 1 ? "#e0e0e0" : "transparent",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Articles" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
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

      <Display content="Hello World" />
    </div>
  );
}

export default App;
