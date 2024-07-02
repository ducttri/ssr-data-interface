import { FilterData } from "@/types/types";
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { IconFilter, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";

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

interface HealthTableFilterProps {
  filter: FilterData[];
  setFilter: React.Dispatch<React.SetStateAction<FilterData[]>>;
}

export default function HealthTableFilter(props: HealthTableFilterProps) {
  const { filter, setFilter } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [detector, setDetector] = useState<string>("c1");
  const [field, setField] = useState<number>(1);
  const [type, setType] = useState<string>("avg");
  const [operator, setOperator] = useState<string>("=");
  const [value, setValue] = useState<number>();

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
    <>
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
  );
}
