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
  styled,
} from "@mui/material";
import { textLimiter } from "@/lib/utils";
import { useAtom } from "jotai";
import { profileInfoAtom } from "@/store";

const ProfilePage = () => {
  const [profile, setProfile] = useAtom(profileInfoAtom);

  const [profileData, setProfileData] = useState({
    username: "Kadir Levent Kabadayı",
    email: "KLK@example.com",
    topixAPI: "ASDASFGSAG:DSADSA212SAD.dasd1sa@da-dsa0",
    linkedinAPI: "ASDASFGSAG:DSADSA212SAD.dasd1sa@da-dsa0",
    instagramAPI: "ASDASFGSAG:DSADSA212SAD.dasd1sa@da-dsa0",
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    width: "65%",
    whiteSpace: "nowrap",
    overflow: "hidden",
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
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
                <strong>Kullanıcı Adı</strong>
              </TableCell>
              <StyledTableCell>
                {textLimiter(profileData.username, 65)}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <StyledTableCell>
                {textLimiter(profileData.email, 65)}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Topix API Anahtarı</strong>
              </TableCell>
              <StyledTableCell>
                {textLimiter(profileData.topixAPI, 65)}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Linkedin API Anahtarı</strong>
              </TableCell>
              <StyledTableCell>
                {textLimiter(profileData.linkedinAPI, 65)}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Instagram API Anahtarı</strong>
              </TableCell>
              <StyledTableCell>
                {textLimiter(profileData.instagramAPI, 65)}
              </StyledTableCell>
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
          value={profileData.username}
          name="username"
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Topix API Anahtarı"
          variant="outlined"
          fullWidth
          value={profileData.topixAPI}
          name="topixAPI"
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Linkedin API Anahtarı"
          variant="outlined"
          fullWidth
          value={profileData.linkedinAPI}
          name="linkedinAP"
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Instagram API Anahtarı"
          variant="outlined"
          fullWidth
          value={profileData.instagramAPI}
          name="instagramAPI"
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
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
