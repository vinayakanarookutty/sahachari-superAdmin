import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "totalOrders", headerName: "Total Orders", width: 150 },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => (
      <Button variant="contained" color="primary" onClick={() => params.api.setRowMode(params.id, 'viewDetails')}>
        View orders
      </Button>
    ),
  },
];

function Delivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/get-delivery-details-super")
      .then((response) => {
        const formattedDeliveries = response.data.map((delivery, index) => ({
          id: index + 1,
          name: delivery.name,
          totalOrders: delivery.orders.length,
          ...delivery
        }));
        setDeliveries(formattedDeliveries);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching delivery data:", error));
  }, []);

  const handleOpen = (delivery) => {
    setSelectedDelivery(delivery);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDelivery(null);
  };

  return (
    <Box sx={{ height: 400, width: "100%", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Delivery
      </Typography>
      <DataGrid
        rows={deliveries}
        columns={columns}
        pageSize={5}
        loading={loading}
        getRowId={(row) => row.id}
        onRowClick={(rowData) => handleOpen(rowData.row)}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delivery Details</DialogTitle>
        <DialogContent>
          {selectedDelivery && (
            <Box>
              <Typography variant="h6">Name: {selectedDelivery.name}</Typography>
              <Typography>Email: {selectedDelivery.email}</Typography>
              <Typography>Servicable Pincode: {selectedDelivery.servicablePincode.join(", ")}</Typography>
              <Typography>Order Details:</Typography>
              <TableContainer component={Paper}>
                <Table aria-label="order details table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Count</TableCell>
                      <TableCell>Total Price</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Ordered At</TableCell>
                      <TableCell>Products</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedDelivery.orders.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{order.totalPrice}</TableCell>
                        <TableCell>{order.address}</TableCell>
                        <TableCell>{getOrderStatus(order.status)}</TableCell>
                        <TableCell>{new Date(order.orderedAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {order.products.map((product, idx) => (
                                <TableRow key={idx}>
                                  <TableCell>{product.product.name}</TableCell>
                                  <TableCell>{product.product.description}</TableCell>
                                  <TableCell>{product.quantity}</TableCell>
                                  <TableCell>{product.product.category}</TableCell>
                                  <TableCell>{product.product.price}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

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

export default Delivery;
