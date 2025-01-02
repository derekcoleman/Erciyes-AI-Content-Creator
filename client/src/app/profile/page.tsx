import Profile from "@/components/profile/Profile";
import MiniDrawer from "../../components/drawer/MiniDrawer";
import { Box } from "@mui/material";

export default function ProfilePage() {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(134.49deg, rgba(9, 58, 237, 0.18) -0.83%, rgba(1, 215, 235, 0.15) 54.23%) ",
        backdropFilter: "blur(80px)",
        minHeight: "100vh",
      }}
    >
      <MiniDrawer />
      <Profile />
    </Box>
  );
}
