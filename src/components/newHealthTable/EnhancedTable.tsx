"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Data, FilterData, JSONData } from "@/types/types";
import { Button, CircularProgress, LinearProgress, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { useCallback, useEffect } from "react";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import dayjs from "dayjs";
import _ from "lodash";
import Link from "next/link";
import { IconFileInfo } from "@tabler/icons-react";
import useSWR, { preload } from "swr";
import { stableSort, getComparator, createData } from "./helper";

type Order = "asc" | "desc";

const fetcher = (url: string | URL | Request) =>
  fetch(url)
    .then((res) => res.json())
    .then((datas) =>
      datas.data.map((data: JSONData, index: number) => {
        return createData(
          index,
          data._id,
          new Date(data.processed_data.start_time * 1000).toUTCString(),
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
          data.processed_data.x1.sipm_operating_voltage.max,

          data.processed_data.x123.board_temp.avg,
          data.processed_data.x123.board_temp.min,
          data.processed_data.x123.board_temp.max,
          data.processed_data.x123.det_high_voltage.avg,
          data.processed_data.x123.det_high_voltage.min,
          data.processed_data.x123.det_high_voltage.max,
          data.processed_data.x123.det_temp.avg,
          data.processed_data.x123.det_temp.min,
          data.processed_data.x123.det_temp.max
        );
      })
    );

preload("/api/fetch/", fetcher);

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [detectors, setDetectors] = React.useState<string>("c1");
  const [rows, setRows] = React.useState<Data[]>([]);
  const [beginDate, setBeginDate] = React.useState<number>(1704088800);
  const [endDate, setEndDate] = React.useState<number>(dayjs().unix());
  const [filters, setFilter] = React.useState<FilterData[]>([]);
  const [download, setDownload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { data, error, isLoading } = useSWR(`/api/fetch/`, fetcher);

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDownload = async () => {
    const selectedData = selected.map((index) => rows[index].uid);
    setDownload(true);
    setLoading(true);
    try {
      const params = new URLSearchParams({
        selectedData: JSON.stringify(selectedData),
      });
      await fetch(`/api/download?${params.toString()}`)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "jsons.zip";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        });
    } catch {}
    setDownload(false);
    setLoading(false);
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

  if (isLoading)
    return (
      <Box sx={{ width: "100%", display: "flex" }} alignContent={"center"}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Box>{error}</Box>;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {loading && <LinearProgress />}

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

        <EnhancedTableToolbar
          numSelected={selected.length}
          setEndDate={setEndDate}
          setBeginDate={setBeginDate}
          filter={filters}
          setFilter={setFilter}
          handleDownload={handleDownload}
          downloadStatus={download}
          fetchDataWrapper={() => {}}
        />
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
              detector={detectors}
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
                        <IconButton
                          LinkComponent={Link}
                          href={"/health/" + row.uid}
                        >
                          <IconFileInfo />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left" style={{ width: 1 }}>
                      {row.beginUTC}
                    </TableCell>

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

                    {detectors == "x123" && (
                      <>
                        <TableCell align="right">
                          {row.x123_board_temp_avg}
                        </TableCell>
                        <TableCell align="right">
                          {row.x123_board_temp_min}
                        </TableCell>
                        <TableCell align="right">
                          {row.x123_board_temp_max}
                        </TableCell>
                        <TableCell align="right">
                          {row.x123_det_high_voltage_avg}
                        </TableCell>
                        <TableCell align="right">
                          {row.x123_det_high_voltage_min}
                        </TableCell>
                        <TableCell align="right">
                          {row.x123_det_high_voltage_max}
                        </TableCell>
                        <TableCell align="right">
                          {row.x123_det_temp_avg}
                        </TableCell>
                        <TableCell align="right">
                          {row.x123_det_temp_min}
                        </TableCell>
                        <TableCell align="right">
                          {row.x123_det_temp_max}
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
