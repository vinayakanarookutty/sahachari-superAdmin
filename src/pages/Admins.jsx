import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "logo",
    headerName: "Logo",
    width: 100,
    renderCell: (params) => (
      <img src={params.value} alt="logo" style={{ width: "50px", height: "50px" }} />
    ),
  },
  { field: "name", headerName: "Name", width: 100 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "address", headerName: "Address", width: 250 },
  { field: "phno", headerName: "Phone Number", width: 180 },
  { field: "pincode", headerName: "Pin Code", width: 90 },
  { field: "category", headerName: "Category", width: 90 },
];

function Admins() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/get-admin-details-super")
      .then((response) => {
        const formattedUsers = response.data.map((admin, index) => {
          return {
            id: index + 1,
            logo: admin.logo || "default_logo_url", // Replace with actual logo URL or a default logo URL
            name: admin.name,
            email: admin.email,
            address: admin.address || "NIL",
            phno: admin.phno || "NIL",
            pincode: admin.servicablePincode,
            category: admin.category,
          };
        });
        setUsers(formattedUsers);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching users", error));
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Admins
      </Typography>
      <DataGrid rows={users} columns={columns} pageSize={5} loading={loading} />
    </Box>
  );
}

export default Admins;
