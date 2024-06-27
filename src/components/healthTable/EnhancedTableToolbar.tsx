"use client";

import { FilterData, JSONData } from "@/types/types";
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
  Button,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
import * as React from "react";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { jsonValidator } from "@/utils/helpers/jsonValidator";
import {
  IconX,
  IconPlus,
  IconFilter,
  IconCloudUpload,
  IconCloudDownload,
} from "@tabler/icons-react";

dayjs.extend(utc);

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
  handleDownload: () => void;
  downloadStatus: boolean;
  fetchDataWrapper: () => void;
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    numSelected,
    setBeginDate,
    setEndDate,
    filter,
    setFilter,
    handleDownload,
    downloadStatus,
    fetchDataWrapper,
  } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const [detector, setDetector] = React.useState<string>("c1");
  const [field, setField] = React.useState<number>(1);
  const [type, setType] = React.useState<string>("avg");
  const [operator, setOperator] = React.useState<string>("=");
  const [value, setValue] = React.useState<number>();
  const { isAuthenticated, getToken } = useKindeBrowserClient();
  const [openError, setOpenError] = React.useState(false);
  const [success, setSuccess] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleErrorClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
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

  const handleAPICall = async (jsonData: JSONData) => {
    const csrfResp = await fetch("/csrf-token");
    const { csrfToken } = await csrfResp.json();
    try {
      const dataForm = new FormData();
      dataForm.set("data", JSON.stringify(jsonData));
      const fetchArgs = {
        method: "POST",
        headers: {},
        body: dataForm,
      };
      if (csrfToken)
        fetchArgs.headers = {
          "X-CSRF-Token": csrfToken,
          Authorization: getToken(),
        };
      const res = await fetch(`/api/upload`, fetchArgs);
      const data = await res.json();
      if (data.status == 200) {
        setErrorMessage("Succesfully upload data.");
        setSuccess(true);
        setOpenError(true);
        fetchDataWrapper();
      } else {
        setErrorMessage("Failed to upload.");
        setSuccess(false);
        setOpenError(true);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      let json: JSON;

      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          try {
            json = JSON.parse(e.target.result as string);
            const valid = await jsonValidator(json);
            if (valid) {
              handleAPICall(json as unknown as JSONData);
            } else {
              setErrorMessage("Failed to upload.");
              setSuccess(false);
              setOpenError(true);
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      };
      reader.readAsText(file);
    }
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
          <Box sx={{ pr: 1 }}>
            <DateTimePicker
              label="Begin UTC"
              views={["year", "day", "hours", "minutes", "seconds"]}
              timezone="UTC"
              minDate={dayjs.unix(1704088800)}
              maxDate={dayjs()}
              onChange={(newDate) =>
                newDate
                  ? setBeginDate(newDate.unix())
                  : setBeginDate(dayjs(0).unix())
              }
            />
          </Box>
          <Box sx={{ pl: 1, pr: 1 }}>
            <DateTimePicker
              label="End UTC"
              views={["year", "day", "hours", "minutes", "seconds"]}
              minDate={dayjs.unix(1704088800)}
              maxDate={dayjs()}
              timezone="UTC"
              onChange={(newDate) =>
                newDate
                  ? setEndDate(newDate.unix())
                  : setEndDate(dayjs().unix())
              }
            />
          </Box>
          <Box flexGrow={1} />
        </LocalizationProvider>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Download">
          <IconButton onClick={handleDownload} disabled={downloadStatus}>
            <IconCloudDownload />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          {isAuthenticated && (
            <Box sx={{ m: 1 }}>
              <Button
                color="primary"
                component="label"
                variant="contained"
                startIcon={<IconCloudUpload />}
              >
                Upload Data
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  accept="application/json,application/gzip"
                />
              </Button>
              <Snackbar
                open={openError}
                autoHideDuration={6000}
                onClose={handleErrorClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                {success ? (
                  <Alert
                    onClose={handleErrorClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    <AlertTitle>Success</AlertTitle>
                    {errorMessage}
                  </Alert>
                ) : (
                  <Alert
                    onClose={handleErrorClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                  </Alert>
                )}
              </Snackbar>
            </Box>
          )}

          <Tooltip title="Filter list">
            <IconButton
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <IconFilter />
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
                          field &&
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
                                <IconPlus />
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
                              <IconX />
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
