import { Data } from "@/types/types";
import DownloadIcon from "@mui/icons-material/Download";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Toolbar,
  alpha,
  Typography,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  MenuItem,
  FormControl,
} from "@mui/material";
import * as React from "react";

const detectors = [
  {
    value: "c1",
    label: "C1",
  },
  {
    value: "m1",
    label: "M1",
  },
  {
    value: "m5",
    label: "M5",
  },
  {
    value: "x1",
    label: "X1",
  },
  {
    value: "x123",
    label: "X123",
  },
];

const hafxfield = [
  {
    value: "arm_temp",
    label: "ARM Processor Temperature",
  },
  {
    value: "sipm_temp",
    label: "SiPM board temperature",
  },
  {
    value: "sipm_operating_voltage",
    label: "SiPM operating voltage",
  },
];

const datatype = [
  {
    value: "avg",
    label: "Avg",
  },
  {
    value: "min",
    label: "Min",
  },
  {
    value: "max",
    label: "Max",
  },
];

const comperator = [
  {
    value: "=",
    label: "=",
  },
  {
    value: "!=",
    label: "!=",
  },
  {
    value: ">",
    label: ">",
  },
  {
    value: ">=",
    label: ">=",
  },
  {
    value: "<",
    label: "<",
  },
  {
    value: "<=",
    label: "<=",
  },
];

interface EnhancedTableToolbarProps {
  numSelected: number;
  rows: Data[];
  selected: readonly number[];
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, rows, selected } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const [detector, setDetector] = React.useState<string>();
  const [field, setField] = React.useState<string>();
  const [type, setType] = React.useState<string>();
  const [opeartor, setOperator] = React.useState<string>();




  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Health Data
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Download">
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Filter list">
            <IconButton
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Dialog
            id="basic-menu"
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth={true}
          >
            <DialogTitle>Filter</DialogTitle>
            <DialogContent>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <FormControl
                  sx={{
                    "& .MuiTextField-root": { width: "10ch" },
                  }}
                >
                  <TextField
                    id="select-detecotr"
                    select
                    required
                    label="Detector"
                    defaultValue="c1"
                    variant="standard"
                  >
                    {detectors.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <FormControl
                  sx={{
                    "& .MuiTextField-root": { width: "30ch" },
                  }}
                >
                  <TextField
                    id="outlined-select-detector"
                    required
                    select
                    label="Field"
                    defaultValue="arm_temp"
                    variant="standard"
                  >
                    {hafxfield.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <FormControl
                  sx={{
                    "& .MuiTextField-root": { width: "10ch" },
                  }}
                >
                  <TextField
                    id="outlined-select-hafx"
                    required
                    select
                    label="Type"
                    defaultValue="avg"
                    variant="standard"
                  >
                    {datatype.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <FormControl
                  sx={{
                    "& .MuiTextField-root": { width: "10ch" },
                  }}
                >
                  <TextField
                    id="outlined-select-operator"
                    required
                    select
                    label="Operator"
                    defaultValue="="
                    variant="standard"
                  >
                    {comperator.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <FormControl
                  sx={{
                    "& .MuiTextField-root": { width: "10ch" },
                  }}
                >
                  <TextField
                    id="outlined-select-value"
                    type="number"
                    required
                    label="Value"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  ></TextField>
                </FormControl>
              </Box>
            </DialogContent>
          </Dialog>
        </>
      )}
    </Toolbar>
  );
}
