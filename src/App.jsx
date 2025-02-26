import React, { useState } from "react";
import { Typography, AppBar, Toolbar, Button, Box, CssBaseline, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideMenu from "./components/SideMenu"; 
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Admins from "./pages/Admins";
import Products from "./pages/Products";
import Delivery from "./pages/Delivery";
import Advertisements from "./pages/Advertisements";

const drawerWidth = 180; 

function App() {
  const [open, setOpen] = useState(true); // Sidebar state

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Router>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sahachari SuperAdmin
          </Typography>
          
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex" }}>
        <SideMenu open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: open ? `${drawerWidth}px` : "0px", 
            mt: "64px",
            transition: "margin 0.3s ease",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/admin" element={<Admins />} />
            <Route path="/products" element={<Products />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/advertisements" element={<Advertisements />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
