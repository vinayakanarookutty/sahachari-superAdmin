import React from "react";
import { Typography, Box, Grid, Paper, IconButton } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CampaignIcon from "@mui/icons-material/Campaign";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { Link } from "react-router-dom"; // Import the Link component

const sections = [
  { title: "Users", icon: <PeopleIcon fontSize="large" />, path: "/users" },
  { title: "Admin", icon: <AdminPanelSettingsIcon fontSize="large" />, path: "/admin" },
  { title: "Orders", icon: <ShoppingCartIcon fontSize="large" />, path: "/orders" },
  { title: "Products", icon: <InventoryIcon fontSize="large" />, path: "/products" },
  { title: "Delivery", icon: <LocalShippingIcon fontSize="large" />, path: "/delivery" },
  { title: "Advertisement", icon: <CampaignIcon fontSize="large" />, path: "/advertisements" },
  { title: "View Services", icon: <VisibilityIcon fontSize="large" />, path: "/view_service" },
  { title: "Add Services", icon: <AddBoxIcon fontSize="large" />, path: "/add_service" }
];


function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to the SuperAdmin Dashboard.
      </Typography>
      <Grid container spacing={3}>
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {/* Wrap the entire Paper component with Link */}
            <Link to={section.path} style={{ textDecoration: "none" }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: "center",
                  backgroundColor: "#f5f5f5",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                  cursor: "pointer", // Indicating it's clickable
                }}
              >
                <IconButton sx={{ mb: 1 }} size="large">
                  {section.icon}
                </IconButton>
                <Typography variant="h6">{section.title}</Typography>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
