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

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "ch",
    headerName: "Channel",
    type: "number",
    width: 70,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "buffer_number",
    headerName: "Buffer Number",
    type: "number",
    width: 120,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "num_evts",
    headerName: "Number of Events",
    type: "number",
    width: 150,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "num_triggers",
    headerName: "Number of Triggers",
    type: "number",
    width: 150,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "dead_time",
    headerName: "Dead Time",
    type: "number",
    width: 100,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "anode_current",
    headerName: "Anode Current",
    type: "number",
    width: 130,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "time_anchor",
    headerName: "Time Anchor",
    type: "number",
    width: 110,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "missed_pps",
    headerName: "Missed PPS",
    type: "boolean",
    width: 100,
    align: "left",
    headerAlign: "left",
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
  {
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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
    id: 16,
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
    id: 17,
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
    id: 18,
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
    id: 19,
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
    id: 20,
    ch: 0,
    buffer_number: 9,
    num_evts: 7747,
    num_triggers: 8660,
    dead_time: 405.95,
    anode_current: 90,
    time_anchor: 0,
    missed_pps: false,
  },
  {
    id: 21,
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
    id: 22,
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
    id: 23,
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
    id: 24,
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
    id: 25,
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
    id: 26,
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
    id: 27,
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
    id: 28,
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
    id: 29,
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
    id: 30,
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

  return <h1>TEST</h1>;
}
