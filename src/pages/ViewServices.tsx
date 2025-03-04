import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Service Name", width: 150 },
  { field: "contact", headerName: "Contact", width: 150 },
  { field: "description", headerName: "Description", width: 250 },
];

function ViewServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/view_services")
      .then((response) => {
        const formattedServices = response.data.map((service, index) => {
          return {
            id: index + 1,
            name: service.name,
            contact: service.contact,
            description: service.description || "NIL",
          };
        });
        setServices(formattedServices);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching services", error));
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Services
      </Typography>
      <DataGrid
        rows={services}
        columns={columns}
        
        loading={loading}
      />
    </Box>
  );
}

export default ViewServices;
