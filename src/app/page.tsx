"use client";

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
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
import AnalyticsIcon from "@mui/icons-material/Analytics";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// const columns: GridColDef[] = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 90,
//   },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "ch", headerName: "Channel", type: "number", width: 70 },
  {
    field: "buffer_number",
    headerName: "Buffer Number",
    type: "number",
    width: 120,
  },
  {
    field: "num_evts",
    headerName: "Number of Events",
    type: "number",
    width: 150,
  },
  {
    field: "num_triggers",
    headerName: "Number of Triggers",
    type: "number",
    width: 150,
  },
  { field: "dead_time", headerName: "Dead Time", type: "number", width: 100 },
  {
    field: "anode_current",
    headerName: "Anode Current",
    type: "number",
    width: 130,
  },
  {
    field: "time_anchor",
    headerName: "Time Anchor",
    type: "number",
    width: 110,
  },
  {
    field: "missed_pps",
    headerName: "Missed PPS",
    type: "boolean",
    width: 100,
  },
];

// Mock nominalHafx Data
const rows = [
  {
    id: 1,
    ch: 0,
    buffer_number: 0,
    num_evts: 675,
    num_triggers: 739,
    dead_time: 34.625,
    anode_current: 91,
    time_anchor: 1697825894,
    missed_pps: false,
  },
  {
    id: 2,
    ch: 0,
    buffer_number: 1,
    num_evts: 7395,
    num_triggers: 8328,
    dead_time: 390.375,
    anode_current: 77,
    time_anchor: 0,
    missed_pps: false,
  },
  {
    id: 3,
    ch: 0,
    buffer_number: 2,
    num_evts: 7850,
    num_triggers: 8723,
    dead_time: 408.875,
    anode_current: 89,
    time_anchor: 0,
    missed_pps: false,
  },
  {
    id: 4,
    ch: 0,
    buffer_number: 3,
    num_evts: 8114,
    num_triggers: 8945,
    dead_time: 419.275,
    anode_current: 93,
    time_anchor: 0,
    missed_pps: false,
  },
  {
    id: 5,
    ch: 0,
    buffer_number: 4,
    num_evts: 7893,
    num_triggers: 8740,
    dead_time: 409.675,
    anode_current: 91,
    time_anchor: 0,
    missed_pps: false,
  },
  {
    id: 6,
    ch: 0,
    buffer_number: 5,
    num_evts: 7958,
    num_triggers: 8860,
    dead_time: 415.275,
    anode_current: 91,
    time_anchor: 0,
    missed_pps: false,
  },
  {
    id: 7,
    ch: 0,
    buffer_number: 6,
    num_evts: 7768,
    num_triggers: 8660,
    dead_time: 405.95,
    anode_current: 85,
    time_anchor: 0,
    missed_pps: false,
  },
  {
    id: 8,
    ch: 0,
    buffer_number: 7,
    num_evts: 7550,
    num_triggers: 8484,
    dead_time: 397.675,
    anode_current: 85,
    time_anchor: 0,
    missed_pps: false,
  },
  {
    id: 9,
    ch: 0,
    buffer_number: 8,
    num_evts: 8065,
    num_triggers: 8908,
    dead_time: 417.525,
    anode_current: 91,
    time_anchor: 0,
    missed_pps: false,
  },
  {
    id: 10,
    ch: 0,
    buffer_number: 9,
    num_evts: 7747,
    num_triggers: 8660,
    dead_time: 405.95,
    anode_current: 90,
    time_anchor: 0,
    missed_pps: false,
  },
];

export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            SSR Data Interface
          </Typography>
        </Toolbar>
      </AppBar>
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
          {["Home", "Science Data", "Health Data"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 3 === 0 ? (
                    <InfoIcon />
                  ) : index % 3 === 1 ? (
                    <AnalyticsIcon />
                  ) : (
                    <FavoriteIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Main>
    </Box>
  );
}
