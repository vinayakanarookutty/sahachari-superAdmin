import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "No:", width: 80 },
  { field: "admin", headerName: "Admin", width: 150 },
  { field: "adname", headerName: "Ad Name:", width: 150 },
  { field: "img", headerName: "Image", width: 150, renderCell: (params) => (
      <img src={params.value} alt="Image" style={{ width: "50px", height: "50px" }} />
    ),
  },
];

function Advertisements() {
  const [adv, setAdv] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch admin details
    axios.get("http://127.0.0.1:5000/api/get-admin-details-super")
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => console.error("Error fetching admin details:", error));
    
    // Fetch advertisement details
    axios.get("http://127.0.0.1:5000/api/get-advertisment-details-super")
      .then((response) => {
        const formattedAdv = response.data.map((Adv, index) => {
          const admin = admins.find(admin => admin._id === Adv.adminId);
          return {
            id: index + 1,
            admin: admin ? admin.name : "Unknown", 
            adname: Adv.adName,
            img: Adv.adImageUrl,
          };
        });
        setAdv(formattedAdv);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching advertisements:", error));
  }, [admins]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Advertisements</Typography>
      <DataGrid rows={adv} columns={columns} pageSize={5} loading={loading} />
    </Box>
  );
}

export default Advertisements;
