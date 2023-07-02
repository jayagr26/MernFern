import ArticleIcon from "@mui/icons-material/Article";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const drawerList = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Articles", icon: <ArticleIcon />, path: "/articles" },
  { label: "About", icon: <InfoIcon />, path: "/about" },
  { label: "Contact us", icon: <CallSharpIcon />, path: "/contact" },
];

const MyDrawer = ({ drawer, setDrawer }) => {
  const [focusedItem, setFocusedItem] = useState(0);
  const navigate = useNavigate();

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
      navigate(drawerList[focusedItem].path);
      setDrawer(false);
    } else if (event.key === "esc") {
      setDrawer(false);
    }
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onKeyDown={handleKeyDown}>
      <List>
        {drawerList.map((item, index) => (
          <ListItem
            key={item.label}
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
    <div tabIndex={-1} onKeyDown={handleKeyDown}>
      <SwipeableDrawer
        anchor={"left"}
        open={drawer}
        onClose={() => setDrawer(false)}
        onOpen={() => setDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
};

export default MyDrawer;
