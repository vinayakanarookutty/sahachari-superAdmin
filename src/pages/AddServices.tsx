import React, { useState } from "react";
import { Box, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function AddService() {
  const [serviceName, setServiceName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!serviceName || !contact || !description) {
      setError("All fields are required");
      setOpen(true);
      return;
    }
    if (!/^\d{10}$/.test(contact)) {
      setError("Please enter a valid 10-digit contact number");
      setOpen(true);
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/add_services`, {
        name: serviceName,
        contact: contact,
        description: description,
      });

      setSuccess(true);
      setOpen(true);

      // Clear form fields
      setServiceName("");
      setContact("");
      setDescription("");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/view_service"); // Change "/services" to your target route
      }, 2000);
    } catch (error) {
      console.error("Error adding service", error);
      setError("Failed to add service");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add Service
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Service Name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Submitting..." : "Add Service"}
        </Button>
      </form>

      {/* Snackbar for error/success messages */}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={error ? "error" : "success"} onClose={handleClose}>
          {error || "Service added successfully! Redirecting..."}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddService;
