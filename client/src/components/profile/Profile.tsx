"use client";
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: "Kadir Levent Kabadayı",
    email: "KLK@example.com",
    phone: "123-456-7890",
    address: "Talas/KAYSERİ",
  });

  const [editableData, setEditableData] = useState({
    username: "KLK",
    bio: "Software Developer at XYZ",
    API: "ASDASFGSAG:DSADSA212SAD.dasd1sa@da-dsa0",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableData({
      ...editableData,
      [name]: value,
    });
  };

  const handleSave = () => {
    alert("Bilgiler kaydedildi");
  };

  return (
    <Box sx={{ width: "80%", margin: "0 auto", paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profil Sayfası
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>Ad Soyad</strong>
              </TableCell>
              <TableCell>{profileData.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>{profileData.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Telefon</strong>
              </TableCell>
              <TableCell>{profileData.phone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Adres</strong>
              </TableCell>
              <TableCell>{profileData.address}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Güncellenebilir Bilgiler
        </Typography>
        <TextField
          label="Kullanıcı Adı"
          variant="outlined"
          fullWidth
          value={editableData.username}
          name="username"
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="API Anahtarı"
          variant="outlined"
          fullWidth
          value={editableData.API}
          name="API"
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Biyografi"
          variant="outlined"
          fullWidth
          value={editableData.bio}
          name="bio"
          onChange={handleChange}
          multiline
          rows={4}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleSave}
        >
          Kaydet
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
