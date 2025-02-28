import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { width } from "@mui/system";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Name", width: 100 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "address", headerName: "Address", width: 250 },
  { field: "phno", headerName: "Phone Number", width: 180 },
  { field: "pincode", headerName: "Pin Code", width: 90 },
];

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/get-user-details-super")
      .then((response) => {
        const formattedUsers = response.data.map((user, index) => {
          return {
            id: index + 1,
            name: user.name,
            email: user.email,
            address: user.address || "NIL",
            phno: user.phoneNo || "NIL",
            pincode: user.pincode
          };
        });
        setUsers(formattedUsers);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching users",error))
  });

  return (
    <Box sx={{ height: 400, width: "100%", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>
      <DataGrid rows={users} columns={columns} pageSize={5} loading={loading} />
    </Box>
  );
}

export default Users;
