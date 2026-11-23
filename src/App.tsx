import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, type MouseEvent } from "react";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from "react-router";
import IconButton from "@mui/material/IconButton";
import DehazeRoundedIcon from "@mui/icons-material/DehazeRounded";
import "./style.css";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

function App() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Container maxWidth="lg">
        <AppBar 
        position="static"
        sx={{
          backgroundColor: "#624c94"
        }}
        >
          <Toolbar>
            <DirectionsRunIcon fontSize="large" />
            <Typography
              variant="h5"
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              Personal Trainer
            </Typography>
            <IconButton
              aria-label="Open navigation menu"
              onClick={handleOpen}
              sx={{ marginLeft: "auto" }}
            >
              <DehazeRoundedIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem component={Link} to="/" onClick={handleClose}>
                Home
              </MenuItem>
              <MenuItem component={Link} to="/trainings" onClick={handleClose}>
                Trainings
              </MenuItem>
              <MenuItem component={Link} to="/customers" onClick={handleClose}>
                Customers
              </MenuItem>
              <MenuItem component={Link} to="/calendar" onClick={handleClose}>
                Calendar
              </MenuItem>
              <MenuItem component={Link} to="/statistics" onClick={handleClose}>
                Statistics
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
