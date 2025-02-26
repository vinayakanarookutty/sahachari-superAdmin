import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from "axios"; 


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
    axios.get("http://127.0.0.1:5000/api/get-order-details-super") 
      .then((response) => {
        const formattedOrders = response.data.map((order) => {
          return {
            id: order._id,  
            customer: order.userId, 
            status: getOrderStatus(order.status), 
            total: order.totalPrice,
            date: new Date(order.orderedAt).toLocaleString(), 
          };
        });
        setOrders(formattedOrders);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);


  const getOrderStatus = (statusCode) => {
    switch (statusCode) {
      case 0:
        return "Pending";
      case 1:
        return "Completed";
      default:
        return "Unknown";
    }
  };

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
