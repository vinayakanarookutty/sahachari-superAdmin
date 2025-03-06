import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

// Delete action
const handleDelete = (id, setServices) => {
  axios
    .delete(`http://127.0.0.1:5000/api/delete_service/${id}`)
    .then((response) => {
      setServices((prevServices) => prevServices.filter((service) => service.objid !== id));
      console.log("Service deleted successfully:", response);
    })
    .catch((error) => {
      console.error("Error deleting service:", error);
    });
};

// Delete button component
const DeleteButton = ({ id, setServices }) => (
  <IconButton color="error" onClick={() => handleDelete(id, setServices)}>
    <DeleteIcon />
  </IconButton>
);

function ViewServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch services data
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/view_services")
      .then((response) => {
        const formattedServices = response.data.map((service, index) => ({
          id: index + 1,
          name: service.name,
          contact: service.contact,
          description: service.description || "NIL",
          objid: service._id,
        }));
        setServices(formattedServices);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching services", error));
  }, []);

  // Columns definition with Delete button rendering
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Service Name", width: 150 },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => <DeleteButton id={params.row.objid} setServices={setServices} />,
    },
  ];

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
