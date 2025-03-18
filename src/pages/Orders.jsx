import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Modal, Box, Button, Typography } from "@mui/material";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [users, setUsers] = useState({});
  const [admins, setAdmins] = useState({});
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/get-admin-details-super`)
      .then((response) => {
        // Convert admin list to a map { adminId: adminName }
        const adminMap = response.data.reduce((acc, admin) => {
          acc[admin._id] = admin.name; // Assuming _id is the adminId
          return acc;
        }, {});
        setAdmins(adminMap);
      })
      .catch((error) => console.error("Error fetching admins:", error));
    axios
    .get("https://d17p315up9p1ok.cloudfront.net/api/get-user-details-super")
    .then((response) => {
      // Convert users array into a map { userId: userName }
      const userMap = response.data.reduce((acc, user) => {
        acc[user._id] = user.name; // Assuming _id is the userId
        return acc;
      }, {});
      setUsers(userMap);
    })
    .catch((error) => console.error("Error fetching users:", error));
    axios
      .get("https://d17p315up9p1ok.cloudfront.net/api/get-order-details-super")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, [orders]);

  const handleOpenModal = (products) => {
    setSelectedProducts(products);
    setOpen(true);
  };


  const handleDelete = (objid) => {
    // Ask for confirmation before proceeding
    const isConfirmed = window.confirm("Are you sure you want to delete this order?");
    
    if (isConfirmed) {
      console.log(`Attempting to delete order with objid: ${objid}`);
      
      axios.delete(`https://d17p315up9p1ok.cloudfront.net/api/delete-order/${objid}`)
        .then(() => {
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order.objid !== objid)
          );
          alert("Order deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
        });
    } else {
      console.log("Order deletion cancelled");
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedProducts([]);
  };

  // Define columns
  const columns = [
    {
      field: "userId",
      headerName: "User Name",
      width: 180,
      valueGetter: (params) => users[params] || "Unknown", // Get user name by userId
    },
    { field: "totalPrice", headerName: "Total Price", width: 120 },
    { field: "address", headerName: "Address", width: 300 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      valueGetter: (params) => {
        console.log(params)
        const statusMap = { 0: "Pending", 1: "Out of Delivery", 2: "Delivered" };
        return statusMap[params] || "Unknown";
      },
    },
    {
      field: "orderedAt",
      headerName: "Ordered At",
      width: 180,
      valueGetter: (params) => new Date(params).toLocaleString(),
    },
    {
      field: "products",
      headerName: "Products",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleOpenModal(params.value)}
        >
          View More Details
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={orders.map((order) => ({ ...order, id: order._id }))}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />

      {/* Modal for displaying product details */}
      <Modal open={open} onClose={handleCloseModal}>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "white",
      boxShadow: 24,
      p: 3,
      borderRadius: 2,
    }}
  >
    <Typography variant="h6" gutterBottom>
      Product Details
    </Typography>
    
    {selectedProducts.length > 0 ? (
      selectedProducts.map((item) => (
        <Box key={item._id} sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              width={50}
              height={50}
              style={{ marginRight: 8 }}
            />
            <Typography>
              {item.product.name} (x{item.quantity})
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
            Admin: {admins[item.product.adminId] || "Unknown"} {/* Display admin name */}
          </Typography>
        </Box>
      ))
    ) : (
      <Typography>No products found</Typography>
    )}

    <Button variant="contained" color="secondary" onClick={handleCloseModal} fullWidth>
      Close
    </Button>
  </Box>
</Modal>

    </div>
  );
};

export default OrdersTable;
