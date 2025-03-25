import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const columns = [
  { field: "id", headerName: "Count", width: 80 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "phoneNumber", headerName: "Phone Number", width: 150 },
  { field: "address", headerName: "Address", width: 250 },
  { field: "serviceId", headerName: "Service ID", width: 180 },
  { field: "createdAt", headerName: "Created At", width: 180 },

];

function BookedServices() {
  const [products, setProducts] = useState([]);
  const [servicesMap, setServicesMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch booked services
        const bookedServicesRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-bookservice`);
        const bookedServices = bookedServicesRes.data;

        // Fetch service names
        const servicesRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/view_services`);
        const services = servicesRes.data;

        // Create a map of serviceId -> serviceName
        const serviceMap = {};
        services.forEach(service => {
          serviceMap[service._id] = service.name;
        });

        setServicesMap(serviceMap);

        // Format the booked services data
        const formattedProducts = bookedServices.map((service, index) => ({
          id: index + 1,
          name: service.name,
          phoneNumber: service.phoneNumber,
          address: service.address,
          
          serviceId: serviceMap[service.serviceId] || "Unknown Service", // Replace serviceId with service name
          createdAt: new Date(service.createdAt).toLocaleString(),
          updatedAt: new Date(service.updatedAt).toLocaleString(),
        }));

        setProducts(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Booked services
      </Typography>
      <DataGrid rows={products} columns={columns} pageSize={5} loading={loading} />
    </Box>
  );
}

export default BookedServices;
