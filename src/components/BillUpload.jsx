import { useState } from "react";
import axios from "axios";
import { 
  Button, 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function BillUpload() {
  const [file, setFile] = useState(null);
  const [expenseType, setExpenseType] = useState('');
  const [error, setError] = useState(''); // Add this line
  const allowedFileTypes = '.txt,.pdf,.xlsx';


   const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileType = selectedFile?.name.split('.').pop().toLowerCase();
    
    if (selectedFile && !['txt', 'pdf', 'xlsx'].includes(fileType)) {
      setError('Only .txt, .pdf, and .xlsx files are supported');
      setFile(null);
    } else {
      setError('');
      setFile(selectedFile);
    }
  };

  const expenseTypes = [
    'Pooja Purpose',
    'Binodon'
  ];

    const upload = async () => {
     if (!file) {
      alert("Please choose a file first.");
      return;
    }

    if (!expenseType) {
      alert("Please select an expense type.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("expenseType", expenseType);

      const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";
      const url = `${API_BASE}/uploadBill`;

      // get token if your backend requires Bearer token auth
      const token = localStorage.getItem("authToken"); // adjust key if different
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      // Do not set Content-Type manually so the browser sets the boundary.
      const res = await axios.post("/uploadBill", formData, {
        headers,
        withCredentials: true, // enable if backend uses cookies/session auth
      });

      alert("Successfully uploaded: " + res.data);
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error.response || error);
      const status = error.response?.status || "N/A";
      const msg = error.response?.data?.message || error.message;
      alert(`Error uploading file: ${msg} (status ${status})`);
    }
  };

     return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>

      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3, 
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#1976d2'
        }}
      >
        Upload Bills
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
        Supported file types: .txt, .pdf, .xlsx
      </Typography>
      
      <FormControl fullWidth sx={{ maxWidth: 300 }}>
        <InputLabel id="expense-type-label">Expense Type</InputLabel>
        <Select
          labelId="expense-type-label"
          id="expense-type"
          value={expenseType}
          label="Expense Type"
          onChange={(e) => setExpenseType(e.target.value)}
        >
          {expenseTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <input
        type="file"
        id="bill-file-input"
        accept={allowedFileTypes}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="bill-file-input">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
          sx={{ mb: 2 }}
        >
          Choose File
        </Button>
      </label>
      
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      
      {file && !error && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Typography>Selected file: {file.name}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={upload}
            disabled={!expenseType}
          >
            Upload
          </Button>
        </Box>
      )}
    </Box>
  );
}