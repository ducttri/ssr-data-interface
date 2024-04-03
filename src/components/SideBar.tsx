"use client";

import React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InfoIcon from "@mui/icons-material/Info";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled, useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SideBar({
  open,
  handleDrawerClose,
}: {
  open: boolean;
  handleDrawerClose: () => void;
}) {
  const theme = useTheme();

  const routes = [
    { name: "Home", path: "/", icon: <InfoIcon /> },
    { name: "Science Data", path: "/science", icon: <AnalyticsIcon /> },
    { name: "Health Data", path: "/health", icon: <FavoriteIcon /> },
    { name: "Quick Look", path: "/quicklook", icon: <InfoIcon /> },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {routes.map((route) => (
          <Link
            key={route.name}
            href={route.path}
            color="inherit"
            underline="none"
          >
            <ListItem disablePadding>
              <ListItemButton component="a">
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
