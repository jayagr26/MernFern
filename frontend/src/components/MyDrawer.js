import ArticleIcon from "@mui/icons-material/Article";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const drawerList = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Articles", icon: <ArticleIcon />, path: "/articles" },
  { label: "Contact us", icon: <CallSharpIcon />, path: "/contact" },
  { label: "About", icon: <InfoIcon />, path: "/about" },
  { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

const MyDrawer = ({ drawer, setDrawer }) => {
  const [focusedItem, setFocusedItem] = useState(-1);
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

  const handleMouseMove = (event) => {
    const mouseX = event.clientX;
    if (mouseX <= 5) {
      setDrawer(true);
    }
    if (mouseX >= 250) {
      setDrawer(false);
    }
  };

  const list = () => (
    <Box
      sx={{
        height: "100%",
        width: 250,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
      onKeyDown={handleKeyDown}
    >
      <div
        style={{
          backgroundColor: "#d7e2f5",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{
            borderRadius: "50%",
            maxHeight: "120px",
            margin: "10px",
          }}
          src="./prof-img.jpg"
        ></img>
        <div></div>
        <Button>Profile</Button>
      </div>
      <List
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 0,
        }}
      >
        {drawerList.map((item, index) => (
          <ListItem
            key={item.label}
            tabIndex={index}
            onClick={() => {
              setDrawer(false);
            }}
            sx={{
              mt: index === 2 ? "auto" : 0,
              backgroundColor:
                focusedItem === index ? "#d7e2f5" : "transparent",
            }}
            onMouseOver={() => setFocusedItem(index)}
            onMouseLeave={() => setFocusedItem(-1)}
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
    <div tabIndex={-1} onKeyDown={handleKeyDown} onMouseMove={handleMouseMove}>
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
