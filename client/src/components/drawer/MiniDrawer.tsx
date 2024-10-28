"use client";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
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
import StarIcon from "@mui/icons-material/Star";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
const iconList = [
  { title: "Jobs", icon: <StarIcon />, path: "/jobs" },
  { title: "Settings", icon: <DisplaySettingsIcon />, path: "/settings" },
  { title: "Profile", icon: <AccountBoxIcon />, path: "/profile" },
];
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigation = (path) => {
    router.push(path); // Use Next.js router to navigate
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background:
          "linear-gradient(134.49deg, rgba(9, 58, 237, 0.08) -0.83%, rgba(1, 215, 235, 0.08) 54.23%) ",
        backdropFilter: "blur(80px)",
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ marginRight: 5 }, open && { display: "none" }]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            AI Content Creator
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "white",
            color: "black",
          },
        }}
      >
        <DrawerHeader>
          <IconButton sx={{ mr: "auto" }} onClick={() => handleNavigation("/")}>
            <HomeIcon fontSize="large" /> Home
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {iconList.map((data) => (
            <ListItem key={data.title} disablePadding sx={{ display: "block" }}>
              <ListItemButton onClick={() => handleNavigation(data.path)}>
                <ListItemIcon>{data.icon}</ListItemIcon>
                <ListItemText primary={data.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ marginTop: "auto", padding: 2, width: "100%" }}>
          <IconButton>
            {open ? (
              <Button
                variant="outlined"
                endIcon={<LogoutIcon />}
                sx={{ color: "red", width: "200px", borderColor: "red" }}
              >
                Logout
              </Button>
            ) : (
              <LogoutIcon />
            )}
          </IconButton>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
