"use client";
import { useEffect, useState } from "react";
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
  Alert,
  CircularProgress,
} from "@mui/material";
import { getProfile, textLimiter, updateProfile } from "@/lib/utils";
import { FetchInfo } from "@/lib/types";

const ProfilePage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    topixAPI: "",
    linkedinAPI: "",
    instagramAPI: "",
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    width: "65%",
    whiteSpace: "nowrap",
    overflow: "hidden",
  }));

  const fetchProfile = async () => {
    try {
      const fetchedProfile = await getProfile();
      if (fetchedProfile.status) {
        setProfileData({
          username: fetchedProfile.username,
          email: fetchedProfile.email,
          topixAPI: fetchedProfile.topix_api_key,
          linkedinAPI: fetchedProfile.linkedin_api_key,
          instagramAPI: fetchedProfile.instagram_api_key,
        });
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  const fetchUpdateProfile = async () => {
    setLoadingSave(true);
    try {
      const fetchedProfileInfo: FetchInfo = await updateProfile({
        topix_api_key: profileData.topixAPI,
        linkedin_api_key: profileData.linkedinAPI,
        instagram_api_key: profileData.instagramAPI,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError((error as Error).message);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSave = () => {
    fetchUpdateProfile();
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (loading) {
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    );
  }

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
          label="Topix API Anahtarı"
          variant="outlined"
          fullWidth
          value={profileData.topixAPI}
          name="topixAPI"
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          disabled
          label="Linkedin Yakında Geliyor"
          variant="outlined"
          fullWidth
          value={profileData.linkedinAPI}
          name="linkedinAPI"
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          disabled
          label="Instagram Yakında Geliyor"
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
