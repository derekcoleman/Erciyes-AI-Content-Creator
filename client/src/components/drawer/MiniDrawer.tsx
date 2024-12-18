"use client";
import { styled, useTheme } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { Button, FormControlLabel } from "@mui/material";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { ReactNode } from "react";
import { useAtom } from "jotai";
import { themeAtom, tokenAtom, userInfoAtom } from "@/store";
import MaterialUISwitch from "../buttons/MaterialUISwitch";
const iconList = [
  { label: "Görevler", title: "Jobs", icon: <StarIcon />, path: "/jobs" },
  {
    label: "Ayarlar",
    title: "Settings",
    icon: <DisplaySettingsIcon />,
    path: "/settings",
  },
  {
    label: "Profil",
    title: "Profile",
    icon: <AccountBoxIcon />,
    path: "/profile",
  },
  {
    label: "İstatistikler",
    title: "Statistics",
    icon: <AssessmentIcon />,
    path: "/statistics",
  },
];
const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1), // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
interface MiniDrawerProps {
  children: ReactNode;
}
export default function MiniDrawer({ children }: MiniDrawerProps) {
  const [theme, setTheme] = useAtom(themeAtom);
  const styleTheme = useTheme();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useAtom(userInfoAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleNavigation = (path: string) => {
    router.push(path);
    setOpen(false);
  };
  const handleLogout = () => {
    document.cookie = `token=`;
    setUser(null);
    setToken(null);
    router.push("/login");
  };
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ mr: 2 }, open && { display: "none" }]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            AI Content Creator
          </Typography>
        </Toolbar>
        <FormControlLabel
          control={
            <MaterialUISwitch
              sx={{ m: 1 }}
              checked={theme === "Dark"}
              onClick={() => {
                setTheme((prev) => (prev === "Dark" ? "Light" : "Dark"));
              }}
            />
          }
          label=""
        />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton sx={{ mr: "auto" }} onClick={() => handleNavigation("/")}>
            <HomeIcon fontSize="large" /> Ana Sayfa
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            {styleTheme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {iconList.map((data) => (
            <ListItem key={data.title} disablePadding>
              <ListItemButton onClick={() => handleNavigation(data.path)}>
                <ListItemIcon>{data.icon}</ListItemIcon>
                <ListItemText primary={data.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            padding: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        ></Box>
        <Box sx={{ marginTop: "auto", padding: 2, width: "100%" }}>
          <Button
            variant="outlined"
            endIcon={<LogoutIcon />}
            sx={{ color: "red", width: "200px", borderColor: "red" }}
            onClick={handleLogout}
          >
            Çıkış Yap
          </Button>
        </Box>
      </Drawer>

      <Main
        sx={{
          background:
            "linear-gradient(134.49deg, rgba(9, 58, 237, 0.18) -0.83%, rgba(1, 215, 235, 0.15) 54.23%) ",
          backdropFilter: "blur(80px)",
          padding: 0,
        }}
        open={open}
      >
        <DrawerHeader />
        <Box sx={{ paddingLeft: "2%", paddingRight: "1%", paddingBlock: "1%" }}>
          {children}
        </Box>
      </Main>
    </Box>
  );
}
