import { FilterData } from "@/types/types";
import DownloadIcon from "@mui/icons-material/Download";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import utc from "dayjs/plugin/utc";
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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
} from "@mui/material";
import * as React from "react";
import dayjs from "dayjs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

dayjs.extend(utc);

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
    value: "0",
    label: "ARM Processor Temperature",
  },
  {
    value: "1",
    label: "SiPM board temperature",
  },
  {
    value: "2",
    label: "SiPM operating voltage",
  },
];

const x123field = [
  {
    value: "0",
    label: "DP5 board temperature",
  },
  {
    value: "1",
    label: "Detector high voltage",
  },
  {
    value: "2",
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

function createFilter(
  detector: string,
  field: number,
  type: string,
  operator: string,
  value: number
): FilterData {
  return { detector, field, type, operator, value };
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  filter: FilterData[];
  setFilter: React.Dispatch<React.SetStateAction<FilterData[]>>;
  setBeginDate: React.Dispatch<React.SetStateAction<number>>;
  setEndDate: React.Dispatch<React.SetStateAction<number>>;
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, setBeginDate, setEndDate, filter, setFilter } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const [detector, setDetector] = React.useState<string>("c1");
  const [field, setField] = React.useState<number>(1);
  const [type, setType] = React.useState<string>("avg");
  const [operator, setOperator] = React.useState<string>("=");
  const [value, setValue] = React.useState<number>();

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddition = () => {
    if (detector && field && type && operator && value) {
      let newRows = [
        createFilter(detector, field, type, operator, value),
      ].concat(filter);
      setFilter(newRows);
    }
  };

  const handleDeletion = (index: number) => {
    setFilter((prevFilter) => {
      const newFilter = prevFilter.slice();
      newFilter.splice(index, 1);
      return newFilter;
    });
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
          <Box sx={{ m: 2 }}>
            <DateTimePicker
              label="Begin UTC"
              views={["year", "day", "hours", "minutes", "seconds"]}
              timezone="UTC"
              maxDate={dayjs()}
              onChange={(newDate) =>
                newDate
                  ? setBeginDate(newDate.unix())
                  : setBeginDate(dayjs(0).unix())
              }
            />
          </Box>
          <Box sx={{ flex: "10 10 100%", m: 2 }}>
            <DateTimePicker
              label="End UTC"
              views={["year", "day", "hours", "minutes", "seconds"]}
              maxDate={dayjs()}
              timezone="UTC"
              onChange={(newDate) =>
                newDate
                  ? setEndDate(newDate.unix())
                  : setEndDate(dayjs().unix())
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
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell width={"15%"}>Detector</TableCell>
                      <TableCell width={"35%"} align="left">
                        Field
                      </TableCell>
                      <TableCell width={"10%"} align="left">
                        Type
                      </TableCell>
                      <TableCell width={"10%"} align="left">
                        Operator
                      </TableCell>
                      <TableCell width={"20%"} align="left">
                        Value
                      </TableCell>
                      <TableCell width={"10%"} align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      key={"adding label"}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <FormControl sx={{ width: "100%" }}>
                          <Select
                            id="select-detector"
                            onChange={(event) => {
                              setDetector(event.target.value);
                            }}
                            value={detector}
                            variant="standard"
                          >
                            {detectors.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="left">
                        <FormControl sx={{ width: "100%" }}>
                          <Select
                            id="select-field"
                            onChange={(event) => {
                              setField(event.target.value as unknown as number);
                            }}
                            variant="standard"
                            value={field}
                          >
                            {detector &&
                              detector != "x123" &&
                              hafxfield.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            {detector &&
                              detector == "x123" &&
                              x123field.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="left">
                        <FormControl sx={{ width: "100%" }}>
                          <Select
                            id="select-type"
                            onChange={(event) => {
                              setType(event.target.value);
                            }}
                            variant="standard"
                            value={type}
                          >
                            {datatype.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="left">
                        <FormControl sx={{ width: "100%" }}>
                          <Select
                            id="select-operator"
                            onChange={(event) => {
                              setOperator(event.target.value);
                            }}
                            variant="standard"
                            value={operator}
                          >
                            {comperator.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="left">
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            id="outlined-select-value"
                            type="number"
                            error={
                              value
                                ? value > 1000 || value < -1000
                                  ? true
                                  : false
                                : false
                            }
                            required
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="standard"
                            value={value}
                            onChange={(event) =>
                              setValue(event.target.value as unknown as number)
                            }
                          ></TextField>
                        </FormControl>
                      </TableCell>
                      <TableCell align="right">
                        {detector &&
                          (field) &&
                          type &&
                          operator &&
                          value &&
                          value <= 1000 &&
                          value >= -1000 && (
                            <Tooltip title="Add Filter">
                              <IconButton
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleAddition}
                              >
                                <AddCircleOutlineIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                      </TableCell>
                    </TableRow>
                    {filter.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.detector}
                        </TableCell>
                        <TableCell align="right">
                          {row.detector == "x123"
                            ? x123field[row.field as unknown as number].label
                            : hafxfield[row.field as unknown as number].label}
                        </TableCell>
                        <TableCell align="right">{row.type}</TableCell>
                        <TableCell align="right">{row.operator}</TableCell>
                        <TableCell align="right">{row.value}</TableCell>
                        <TableCell align="right">
                          <Tooltip title="Delete Filter">
                            <IconButton
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              key={index}
                              onClick={() => {
                                handleDeletion(index);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
          </Dialog>
        </>
      )}
    </Toolbar>
  );
}
