import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  { field: "price", headerName: "Price", width: 130 },
  { field: "category", headerName: "Category", width: 180 },
];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://api.example.com/products") // Replace with actual API
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <DataGrid rows={products} columns={columns} pageSize={5} loading={loading} />
    </Box>
  );
}

export default Products;
