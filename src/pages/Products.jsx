import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from "axios";


const columns = [
  { field: "id", headerName: "Count", width: 80 },
  { field: "img", headerName:"Image", width:100, renderCell: (params) => (<img src={params.value} alt="Image" style={{width: "50px", height: "50px"}} />)},
  { field: "name", headerName: "Product Name", width: 150 },
  { field: "description", headerName: "Description", width: 150 },
  { field: "price", headerName: "Price", width: 90 },
  { field: "quantity", headerName: "Quantity", width: 90 },
  { field: "category", headerName: "Category", width: 100 },
  { field: "ratings", headerName: "Ratings", width: 90 },
];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/get-products-details-super`) 
      .then((response) => {
        const formattedProducts = response.data.map((product, index) => {
          return {
            id: index+1,  
            img: product.images || product.name ,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            category: product.category,
            ratings: product.ratings,
          };
        });
        setProducts(formattedProducts);
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
