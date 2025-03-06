import React, { useState } from "react";
import { Box, Button, TextField, Typography, Snackbar } from "@mui/material";
import axios from "axios";

function AddService() {
  const [serviceName, setServiceName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      await axios.post("http://127.0.0.1:5000/api/add_services", {
        name: serviceName,
        contact: contact,
        description: description,
      });
      // Clear form fields after successful submission
      setServiceName("");
      setContact("");
      setDescription("");
      setError("");
      alert("Service added successfully!");
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={error}
      />
    </Box>
  );
}

export default AddService;
