import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 180; // Reduced sidebar width

function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          position: "fixed",
          height: "100vh",
          top: 64, // Ensures it doesn't overlap the navbar
        },
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/orders">
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/users">
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/products">
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/store-owners">
            <ListItemText primary="Store Owners" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/delivery">
            <ListItemText primary="Delivery" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/advertisements">
            <ListItemText primary="Advertisements" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SideMenu;
