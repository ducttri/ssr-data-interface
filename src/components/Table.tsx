import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Link from "@mui/material/Link";
import { JSONData } from "@/types/types";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import DownloadIcon from "@mui/icons-material/Download";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";

interface Data {
  id: number;
  uid: string;
  beginUTC: string;
  c1_arm_temp_avg: number;
  c1_arm_temp_min: number;
  c1_arm_temp_max: number;
  c1_sipm_temp_avg: number;
  c1_sipm_temp_min: number;
  c1_sipm_temp_max: number;
  c1_sipm_operating_voltage_avg: number;
  c1_sipm_operating_voltage_min: number;
  c1_sipm_operating_voltage_max: number;

  m1_arm_temp_avg: number;
  m1_arm_temp_min: number;
  m1_arm_temp_max: number;
  m1_sipm_temp_avg: number;
  m1_sipm_temp_min: number;
  m1_sipm_temp_max: number;
  m1_sipm_operating_voltage_avg: number;
  m1_sipm_operating_voltage_min: number;
  m1_sipm_operating_voltage_max: number;

  m5_arm_temp_avg: number;
  m5_arm_temp_min: number;
  m5_arm_temp_max: number;
  m5_sipm_temp_avg: number;
  m5_sipm_temp_min: number;
  m5_sipm_temp_max: number;
  m5_sipm_operating_voltage_avg: number;
  m5_sipm_operating_voltage_min: number;
  m5_sipm_operating_voltage_max: number;

  x1_arm_temp_avg: number;
  x1_arm_temp_min: number;
  x1_arm_temp_max: number;
  x1_sipm_temp_avg: number;
  x1_sipm_temp_min: number;
  x1_sipm_temp_max: number;
  x1_sipm_operating_voltage_avg: number;
  x1_sipm_operating_voltage_min: number;
  x1_sipm_operating_voltage_max: number;
}

function createData(
  id: number,
  uid: string,
  beginUTC: string,
  c1_arm_temp_avg: number,
  c1_arm_temp_min: number,
  c1_arm_temp_max: number,
  c1_sipm_temp_avg: number,
  c1_sipm_temp_min: number,
  c1_sipm_temp_max: number,
  c1_sipm_operating_voltage_avg: number,
  c1_sipm_operating_voltage_min: number,
  c1_sipm_operating_voltage_max: number,

  m1_arm_temp_avg: number,
  m1_arm_temp_min: number,
  m1_arm_temp_max: number,
  m1_sipm_temp_avg: number,
  m1_sipm_temp_min: number,
  m1_sipm_temp_max: number,
  m1_sipm_operating_voltage_avg: number,
  m1_sipm_operating_voltage_min: number,
  m1_sipm_operating_voltage_max: number,

  m5_arm_temp_avg: number,
  m5_arm_temp_min: number,
  m5_arm_temp_max: number,
  m5_sipm_temp_avg: number,
  m5_sipm_temp_min: number,
  m5_sipm_temp_max: number,
  m5_sipm_operating_voltage_avg: number,
  m5_sipm_operating_voltage_min: number,
  m5_sipm_operating_voltage_max: number,

  x1_arm_temp_avg: number,
  x1_arm_temp_min: number,
  x1_arm_temp_max: number,
  x1_sipm_temp_avg: number,
  x1_sipm_temp_min: number,
  x1_sipm_temp_max: number,
  x1_sipm_operating_voltage_avg: number,
  x1_sipm_operating_voltage_min: number,
  x1_sipm_operating_voltage_max: number
): Data {
  return {
    id,
    uid,
    beginUTC,
    c1_arm_temp_avg,
    c1_arm_temp_min,
    c1_arm_temp_max,
    c1_sipm_temp_avg,
    c1_sipm_temp_min,
    c1_sipm_temp_max,
    c1_sipm_operating_voltage_avg,
    c1_sipm_operating_voltage_min,
    c1_sipm_operating_voltage_max,

    m1_arm_temp_avg,
    m1_arm_temp_min,
    m1_arm_temp_max,
    m1_sipm_temp_avg,
    m1_sipm_temp_min,
    m1_sipm_temp_max,
    m1_sipm_operating_voltage_avg,
    m1_sipm_operating_voltage_min,
    m1_sipm_operating_voltage_max,

    m5_arm_temp_avg,
    m5_arm_temp_min,
    m5_arm_temp_max,
    m5_sipm_temp_avg,
    m5_sipm_temp_min,
    m5_sipm_temp_max,
    m5_sipm_operating_voltage_avg,
    m5_sipm_operating_voltage_min,
    m5_sipm_operating_voltage_max,

    x1_arm_temp_avg,
    x1_arm_temp_min,
    x1_arm_temp_max,
    x1_sipm_temp_avg,
    x1_sipm_temp_min,
    x1_sipm_temp_max,
    x1_sipm_operating_voltage_avg,
    x1_sipm_operating_voltage_min,
    x1_sipm_operating_voltage_max,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "uid",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "beginUTC",
    numeric: true,
    disablePadding: false,
    label: "Begin UTC",
  },
  {
    id: "c1_arm_temp_avg",
    numeric: true,
    disablePadding: false,
    label: "Average ARM processor temperature",
  },
  {
    id: "c1_arm_temp_min",
    numeric: true,
    disablePadding: false,
    label: "Minimum ARM processor temperature",
  },
  {
    id: "c1_arm_temp_max",
    numeric: true,
    disablePadding: false,
    label: "Maximum ARM processor temperature",
  },
  {
    id: "c1_sipm_temp_avg",
    numeric: true,
    disablePadding: false,
    label: "Average SiPM board temperature",
  },
  {
    id: "c1_sipm_temp_min",
    numeric: true,
    disablePadding: false,
    label: "Minimum SiPM board temperature",
  },
  {
    id: "c1_sipm_temp_max",
    numeric: true,
    disablePadding: false,
    label: "Maximum SiPM board temperature",
  },
  {
    id: "c1_sipm_operating_voltage_avg",
    numeric: true,
    disablePadding: false,
    label: "Average SiPM operating voltage",
  },
  {
    id: "c1_sipm_operating_voltage_min",
    numeric: true,
    disablePadding: false,
    label: "Minimum SiPM operating voltage",
  },
  {
    id: "c1_sipm_operating_voltage_max",
    numeric: true,
    disablePadding: false,
    label: "Maximum SiPM operating voltage",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all datas",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

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
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
export default function EnhancedTable({
  inputData,
}: {
  inputData: JSONData[];
}) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [detectors, setDetectors] = React.useState<string>("c1");

  let rows = inputData.map((data, index) => {
    return createData(
      index,
      data._id.toString(),
      new Date(data.processed_data.start_time * 1000).toLocaleString(),
      data.processed_data.c1.arm_temp.avg,
      data.processed_data.c1.arm_temp.min,
      data.processed_data.c1.arm_temp.max,
      data.processed_data.c1.sipm_temp.avg,
      data.processed_data.c1.sipm_temp.min,
      data.processed_data.c1.sipm_temp.max,
      data.processed_data.c1.sipm_operating_voltage.avg,
      data.processed_data.c1.sipm_operating_voltage.min,
      data.processed_data.c1.sipm_operating_voltage.max,

      data.processed_data.m1.arm_temp.avg,
      data.processed_data.m1.arm_temp.min,
      data.processed_data.m1.arm_temp.max,
      data.processed_data.m1.sipm_temp.avg,
      data.processed_data.m1.sipm_temp.min,
      data.processed_data.m1.sipm_temp.max,
      data.processed_data.m1.sipm_operating_voltage.avg,
      data.processed_data.m1.sipm_operating_voltage.min,
      data.processed_data.m1.sipm_operating_voltage.max,

      data.processed_data.m5.arm_temp.avg,
      data.processed_data.m5.arm_temp.min,
      data.processed_data.m5.arm_temp.max,
      data.processed_data.m5.sipm_temp.avg,
      data.processed_data.m5.sipm_temp.min,
      data.processed_data.m5.sipm_temp.max,
      data.processed_data.m5.sipm_operating_voltage.avg,
      data.processed_data.m5.sipm_operating_voltage.min,
      data.processed_data.m5.sipm_operating_voltage.max,

      data.processed_data.x1.arm_temp.avg,
      data.processed_data.x1.arm_temp.min,
      data.processed_data.x1.arm_temp.max,
      data.processed_data.x1.sipm_temp.avg,
      data.processed_data.x1.sipm_temp.min,
      data.processed_data.x1.sipm_temp.max,
      data.processed_data.x1.sipm_operating_voltage.avg,
      data.processed_data.x1.sipm_operating_voltage.min,
      data.processed_data.x1.sipm_operating_voltage.max
    );
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleDetectorChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setDetectors(newValue);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TabContext value={detectors}>
          <TabList
            onChange={handleDetectorChange}
            aria-label="lab API tabs example"
          >
            <Tab label="C1" value="c1" />
            <Tab label="M1" value="m1" />
            <Tab label="M5" value="m5" />
            <Tab label="X1" value="x1" />
            <Tab label="X123" value="x123" />
          </TabList>
        </TabContext>

        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <Tooltip title="Open File">
                        <IconButton href={"/health/" + row.uid}>
                          <FileOpenIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">{row.beginUTC}</TableCell>

                    {detectors == "c1" && (
                      <>
                        <TableCell align="right">
                          {row.c1_arm_temp_avg}
                        </TableCell>
                        <TableCell align="right">
                          {row.c1_arm_temp_min}
                        </TableCell>
                        <TableCell align="right">
                          {row.c1_arm_temp_max}
                        </TableCell>
                        <TableCell align="right">
                          {row.c1_sipm_temp_max}
                        </TableCell>
                        <TableCell align="right">
                          {row.c1_sipm_temp_min}
                        </TableCell>
                        <TableCell align="right">
                          {row.c1_sipm_temp_avg}
                        </TableCell>
                        <TableCell align="right">
                          {row.c1_sipm_operating_voltage_avg}
                        </TableCell>
                        <TableCell align="right">
                          {row.c1_sipm_operating_voltage_min}
                        </TableCell>
                        <TableCell align="right">
                          {row.c1_sipm_operating_voltage_max}
                        </TableCell>
                      </>
                    )}

                    {detectors == "m1" && (
                      <>
                        <TableCell align="right">
                          {row.m1_arm_temp_avg}
                        </TableCell>
                        <TableCell align="right">
                          {row.m1_arm_temp_min}
                        </TableCell>
                        <TableCell align="right">
                          {row.m1_arm_temp_max}
                        </TableCell>
                        <TableCell align="right">
                          {row.m1_sipm_temp_max}
                        </TableCell>
                        <TableCell align="right">
                          {row.m1_sipm_temp_min}
                        </TableCell>
                        <TableCell align="right">
                          {row.m1_sipm_temp_avg}
                        </TableCell>
                        <TableCell align="right">
                          {row.m1_sipm_operating_voltage_avg}
                        </TableCell>
                        <TableCell align="right">
                          {row.m1_sipm_operating_voltage_min}
                        </TableCell>
                        <TableCell align="right">
                          {row.m1_sipm_operating_voltage_max}
                        </TableCell>
                      </>
                    )}

                    {detectors == "m5" && (
                      <>
                        <TableCell align="right">
                          {row.m5_arm_temp_avg}
                        </TableCell>
                        <TableCell align="right">
                          {row.m5_arm_temp_min}
                        </TableCell>
                        <TableCell align="right">
                          {row.m5_arm_temp_max}
                        </TableCell>
                        <TableCell align="right">
                          {row.m5_sipm_temp_max}
                        </TableCell>
                        <TableCell align="right">
                          {row.m5_sipm_temp_min}
                        </TableCell>
                        <TableCell align="right">
                          {row.m5_sipm_temp_avg}
                        </TableCell>
                        <TableCell align="right">
                          {row.m5_sipm_operating_voltage_avg}
                        </TableCell>
                        <TableCell align="right">
                          {row.m5_sipm_operating_voltage_min}
                        </TableCell>
                        <TableCell align="right">
                          {row.m5_sipm_operating_voltage_max}
                        </TableCell>
                      </>
                    )}

                    {detectors == "x1" && (
                      <>
                        <TableCell align="right">
                          {row.x1_arm_temp_avg}
                        </TableCell>
                        <TableCell align="right">
                          {row.x1_arm_temp_min}
                        </TableCell>
                        <TableCell align="right">
                          {row.x1_arm_temp_max}
                        </TableCell>
                        <TableCell align="right">
                          {row.x1_sipm_temp_max}
                        </TableCell>
                        <TableCell align="right">
                          {row.x1_sipm_temp_min}
                        </TableCell>
                        <TableCell align="right">
                          {row.x1_sipm_temp_avg}
                        </TableCell>
                        <TableCell align="right">
                          {row.x1_sipm_operating_voltage_avg}
                        </TableCell>
                        <TableCell align="right">
                          {row.x1_sipm_operating_voltage_min}
                        </TableCell>
                        <TableCell align="right">
                          {row.x1_sipm_operating_voltage_max}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
