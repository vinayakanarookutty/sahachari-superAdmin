import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from "axios"; // Ensure axios is installed

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "customer", headerName: "Customer", width: 200 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "total", headerName: "Total Amount", width: 150 },
  { field: "date", headerName: "Date", width: 180 },
];

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/orders") // Adjust API endpoint
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%", p: 3 }}>
      <Typography variant="h5" gutterBottom>Orders</Typography>
      <DataGrid 
        rows={orders} 
        columns={columns} 
        pageSize={5} 
        checkboxSelection 
      />
    </Box>
  );
}

export default Orders;
