import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "item",
    headerName: "Item",
    width: 100,
    renderCell: (params) => (
      <img
        src={params.value}
        alt="item"
        style={{ width: "50px", height: "50px" }}
      />
    ),
  },
  { field: "category", headerName: "Category", width: 90 },
  { field: "customer", headerName: "Customer", width: 200 },
  { field: "seller", headerName: "Seller", width: 200 },
  { field: "quantity", headerName: "Quantity", width: 90 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "status", headerName: "Status", width: 90 },
  { field: "total", headerName: "Total Amount", width: 100 },
  { field: "date", headerName: "Date", width: 180 },
];

function Orders() {
  const [orders, setOrders] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [isAdminsLoaded, setIsAdminsLoaded] = useState(false);

  useEffect(() => {
    // Fetch admin details
    axios.get("http://127.0.0.1:5000/api/get-admin-details-super")
      .then((response) => {
        setAdmins(response.data);
        setIsAdminsLoaded(true);  
      })
      .catch((error) => console.error("Error fetching admin details:", error));

      // Fetch user details
  axios.get("http://127.0.0.1:5000/api/get-user-details-super")
    .then((response) => {
      setUsers(response.data)
  })
  .catch((error) => console.error("Error in fetching users: ",error)) 

  }, []);

   

  useEffect(() => {
    // Fetch orders only if admins are loaded
    if (isAdminsLoaded) {
      axios.get("http://127.0.0.1:5000/api/get-order-details-super")
        .then((response) => {
          const formattedOrders = response.data.map((order, index) => {
            const product = order.products[0].product;
            const admin = admins.find(admin => admin._id === product.adminId);
            const user = users.find(user => user._id === order.userId)
            
            return {
              id: index + 1,
              item: product.images[0], // Using the first image of the product
              category: product.category,
              customer: user ? user.name : "unknown",
              seller: admin ? admin.name : "unknown",
              quantity: order.products[0].quantity, 
              address: order.address,
              status: getOrderStatus(order.status),
              total: order.totalPrice,
              date: new Date(order.orderedAt).toLocaleString(),
            };
          });
          setOrders(formattedOrders);
        })
        .catch((error) => console.error("Error fetching orders:", error));
    }
  }, [isAdminsLoaded, admins]);

  const getOrderStatus = (statusCode) => {
    switch (statusCode) {
      case 0:
        return "Pending";
      case 1:
        return "Out for delivery";
      case 2:
        return "Delivered";
      case 3:
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  return (
    <Box sx={{ height: 400, width: "100%", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Orders
      </Typography>
      <DataGrid rows={orders} columns={columns} pageSize={5} />
    </Box>
  );
}

export default Orders;
