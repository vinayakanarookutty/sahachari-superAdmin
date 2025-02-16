import React from "react";
import { Typography, AppBar, Toolbar, Button, Box, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideMenu from "./components/SideMenu"; 

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Products from "./pages/Products";
import StoreOwners from "./pages/StoreOwners";
import Delivery from "./pages/Delivery";
import Advertisements from "./pages/Advertisements";

const drawerWidth = 180; 

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1201 }}> 
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sahachari SuperAdmin
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: `${drawerWidth}px`, 
            mt: "64px", 
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/store-owners" element={<StoreOwners />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/advertisements" element={<Advertisements />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
