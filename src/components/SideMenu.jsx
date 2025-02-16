import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

function SideMenu({ open, toggleDrawer }) {
  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? 180 : 0,
        flexShrink: 0,
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          width: open ? 180 : 0,
          overflowX: "hidden",
        },
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={toggleDrawer}>
            <ListItemText primary="Close Menu" />
          </ListItemButton>
        </ListItem>
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
