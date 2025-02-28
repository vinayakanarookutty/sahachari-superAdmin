import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { width } from '@mui/system';

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "totalOrders", headerName: "Total Orders", width: 150 },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => (
      <Button variant="contained" color="primary" >
        View orders
      </Button>
    ),
  },
];

function Delivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/get-delivery-details-super")
      .then((response) => {
        const formattedDeliveries = response.data.map((delivery, index) => ({
          id: index + 1,
          name: delivery.name,
          totalOrders: delivery.orders.length,
        }));
        setDeliveries(formattedDeliveries);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching delivery data:", error));
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Delivery
      </Typography>
      <DataGrid rows={deliveries} columns={columns} pageSize={5} loading={loading} />
    </Box>
  );
}

export default Delivery;
