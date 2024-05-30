import { Data } from "@/types/types";
import DownloadIcon from "@mui/icons-material/Download";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
import dayjs, { Dayjs } from "dayjs";

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

const x123field = [
  {
    value: "board_temp",
    label: "DP5 board temperature",
  },
  {
    value: "det_high_voltage",
    label: "Detector high voltage",
  },
  {
    value: "det_temp",
    label: "Detector head temperature",
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
  handleBeginDate: (newDate: Dayjs) => void;
  handleEndDate: (newDate: Dayjs) => void;
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, rows, selected, handleBeginDate, handleEndDate } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const [detector, setDetector] = React.useState<string>();
  const [field, setField] = React.useState<string>();
  const [type, setType] = React.useState<string>();
  const [opeartor, setOperator] = React.useState<string>();
  const [value, setValue] = React.useState<string>();

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ flex: "10 10 100%", m: 2 }}>
            <DateTimePicker
              label="Begin UTC"
              views={["year", "day", "hours", "minutes", "seconds"]}
              onChange={(newDate) =>
                newDate ? handleBeginDate(newDate) : handleBeginDate(dayjs(0))
              }
            />

            <DateTimePicker
              label="End UTC"
              views={["year", "day", "hours", "minutes", "seconds"]}
              onChange={(newDate) =>
                newDate ? handleEndDate(newDate) : handleEndDate(dayjs())
              }
            />
          </Box>
        </LocalizationProvider>
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
                    id="select-detector"
                    select
                    required
                    label="Detector"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => {
                      if (event.target.value != "x123")
                        setDetector(event.target.value);
                      setField(undefined);
                    }}
                    variant="standard"
                  >
                    {detectors.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                {detector && (
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) => setField(event.target.value)}
                      variant="standard"
                    >
                      {detector &&
                        detector != "x123" &&
                        hafxfield.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      {detector &&
                        detector == "x123" &&
                        x123field.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </TextField>
                  </FormControl>
                )}
                {detector && field && (
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) => setType(event.target.value)}
                      variant="standard"
                    >
                      {datatype.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                )}
              </Box>
            </DialogContent>
          </Dialog>
        </>
      )}
    </Toolbar>
  );
}

// <FormControl
//   sx={{
//     "& .MuiTextField-root": { width: "10ch" },
//   }}
// >
//   <TextField
//     id="outlined-select-operator"
//     required
//     select
//     label="Operator"
//     InputLabelProps={{
//       shrink: true,
//     }}
//     onChange={(event) => setOperator(event.target.value)}
//     variant="standard"
//   >
//     {comperator.map((option) => (
//       <MenuItem key={option.value} value={option.value}>
//         {option.label}
//       </MenuItem>
//     ))}
//   </TextField>
// </FormControl>
// <FormControl
//   sx={{
//     "& .MuiTextField-root": { width: "10ch" },
//   }}
// >
//   <TextField
//     id="outlined-select-value"
//     type="number"
//     required
//     label="Value"
//     InputLabelProps={{
//       shrink: true,
//     }}
//     variant="standard"
//     onChange={(event) => setValue(event.target.value)}
//   ></TextField>
// </FormControl>
