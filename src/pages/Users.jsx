import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "role", headerName: "Role", width: 130 },
  { field: "createdAt", headerName: "Registered On", width: 180 },
];

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users") // Adjust API endpoint
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%", p: 3 }}>
      <Typography variant="h5" gutterBottom>Users</Typography>
      <DataGrid 
        rows={users} 
        columns={columns} 
        pageSize={5} 
        checkboxSelection 
      />
    </Box>
  );
}

export default Users;
