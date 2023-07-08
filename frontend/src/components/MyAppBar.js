import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import AuthService from "../services/auth.service";

const MyAppBar = ({ setDrawer }) => {
  const { loggedin, setLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  return (
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
          {loggedin ? (
            <Button
              color="inherit"
              onClick={() => {
                AuthService.logout();
                setLoggedIn(false);
                navigate("/login");
              }}
            >
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MyAppBar;
