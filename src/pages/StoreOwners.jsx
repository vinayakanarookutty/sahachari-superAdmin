import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "owner_name", headerName: "Store Owner", width: 200 },
  { field: "store_name", headerName: "Store Name", width: 200 },
  { field: "contact", headerName: "Contact", width: 150 },
];

function StoreOwners() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://api.example.com/store-owners")
      .then((response) => {
        setOwners(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching store owners:", error));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Store Owners
      </Typography>
      <DataGrid rows={owners} columns={columns} pageSize={5} loading={loading} />
    </Box>
  );
}

export default StoreOwners;
