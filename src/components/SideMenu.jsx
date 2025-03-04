import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function SideMenu({ open, toggleDrawer }) {
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    toggleDrawer();
    navigate(path);
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? 0 : 0,
        flexShrink: 0,
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          width: open ? 150 : 0,
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
          <ListItemButton onClick={() => handleMenuClick("/")}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick("/orders")}>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick("/users")}>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick("/admin")}>
            <ListItemText primary="Admins" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick("/products")}>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick("/delivery")}>
            <ListItemText primary="Delivery" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick("/advertisements")}>
            <ListItemText primary="Advertisements" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick("/view_service")}>
            <ListItemText primary="View Services" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick("/add_service")}>
            <ListItemText primary="Add Service" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SideMenu;
