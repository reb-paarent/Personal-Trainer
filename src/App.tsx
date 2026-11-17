import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from 'react-router';

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6">Personal Trainer</Typography>
          </Toolbar>
        </AppBar>
        <nav className="nav">
          <Link to={"/"}>Home</Link>
          <Link to={"/trainings"}>Trainings</Link>
          <Link to={"/customers"}>Customers</Link>
        </nav>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
