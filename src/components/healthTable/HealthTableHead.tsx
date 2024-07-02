"use client";

import { RowHealthData } from "@/types/types";
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: keyof RowHealthData;
  detector: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "beginUTC",
    numeric: false,
    disablePadding: false,
    label: "Begin UTC",
    detector: "all",
  },
  {
    id: "c1_arm_temp_avg",
    numeric: true,
    disablePadding: false,
    label: "Avg",
    detector: "c1",
  },
  {
    id: "c1_arm_temp_min",
    numeric: true,
    disablePadding: false,
    label: "Min",
    detector: "c1",
  },
  {
    id: "c1_arm_temp_max",
    numeric: true,
    disablePadding: false,
    label: "Max",
    detector: "c1",
  },
  {
    id: "c1_sipm_temp_avg",
    numeric: true,
    disablePadding: false,
    label: "Avg",
    detector: "c1",
  },
  {
    id: "c1_sipm_temp_min",
    numeric: true,
    disablePadding: false,
    label: "Min",
    detector: "c1",
  },
  {
    id: "c1_sipm_temp_max",
    numeric: true,
    disablePadding: false,
    label: "Max",
    detector: "c1",
  },
  {
    id: "c1_sipm_operating_voltage_avg",
    numeric: true,
    disablePadding: false,
    label: "Avg",
    detector: "c1",
  },
  {
    id: "c1_sipm_operating_voltage_min",
    numeric: true,
    disablePadding: false,
    label: "Min",
    detector: "c1",
  },
  {
    id: "c1_sipm_operating_voltage_max",
    numeric: true,
    disablePadding: false,
    label: "Max",
    detector: "c1",
  },
  {
    id: "m1_arm_temp_avg",
    numeric: true,
    disablePadding: false,
    label: "Avg",
    detector: "m1",
  },
  {
    id: "m1_arm_temp_min",
    numeric: true,
    disablePadding: false,
    label: "Min",
    detector: "m1",
  },
  {
    id: "m1_arm_temp_max",
    numeric: true,
    disablePadding: false,
    label: "Max",
    detector: "m1",
  },
  {
    id: "m1_sipm_temp_avg",
    numeric: true,
    disablePadding: false,
    label: "Avg",
    detector: "m1",
  },
  {
    id: "m1_sipm_temp_min",
    numeric: true,
    disablePadding: false,
    label: "Min",
    detector: "m1",
  },
  {
    id: "m1_sipm_temp_max",
    numeric: true,
    disablePadding: false,
    label: "Max",
    detector: "m1",
  },
  {
    id: "m1_sipm_operating_voltage_avg",
    numeric: true,
    disablePadding: false,
    label: "Avg",
    detector: "m1",
  },
  {
    id: "m1_sipm_operating_voltage_min",
    numeric: true,
    disablePadding: false,
    label: "Min",
    detector: "m1",
  },
  {
    id: "m1_sipm_operating_voltage_max",
    numeric: true,
    disablePadding: false,
    label: "Max",
    detector: "m1",
  },
  {
    id: "m5_arm_temp_avg",
    numeric: true,
    disablePadding: false,
    label: "Avg",
    detector: "m5",
  },
  {
    id: "m5_arm_temp_min",
    numeric: true,
    disablePadding: false,
    label: "Min",
    detector: "m5",
  },
  {
    id: "m5_arm_temp_max",
    numeric: true,
    disablePadding: false,
    label: "Max",
    detector: "m5",
  },
  {
    id: "m5_sipm_temp_avg",
    numeric: true,
    disablePadding: false,
    label: "Avg",
    detector: "m5",
  },
  {
    id: "m5_sipm_temp_min",
    numeric: true,
    disablePadding: false,
    label: "Min",
    detector: "m5",
  },
  {
    id: "m5_sipm_temp_max",
    numeric: true,
    disablePadding: false,
    label: "Max",
    detector: "m5",
  },
  {
    id: "m5_sipm_operating_voltage_avg",
    numeric: true,
    disablePadding: false,
    label: "Avg",
    detector: "m5",
  },
  {
    id: "m5_sipm_operating_voltage_min",
    numeric: true,
    disablePadding: false,
    label: "Min",
    detector: "m5",
  },
  {
    id: "m5_sipm_operating_voltage_max",
    numeric: true,
    disablePadding: false,
    label: "Max",
    detector: "m5",
  },
  {
    id: "x1_arm_temp_avg",
    numeric: true,
    disablePadding: false,
    label: "Avg",
    detector: "x1",
  },
  {
    id: "x1_arm_temp_min",
    numeric: true,
    disablePadding: false,
    label: "Min",
    detector: "x1",
  },
  {
    id: "x1_arm_temp_max",
    numeric: true,
    disablePadding: false,
    label: "Max",
    detector: "x1",
  },
  {
    id: "x1_sipm_temp_avg",
    numeric: true,
    disablePadding: false,
    label: "Avg",
    detector: "x1",
  },
  {
    id: "x1_sipm_temp_min",
    numeric: true,
    disablePadding: false,
    label: "Min",
    detector: "x1",
  },
  {
    id: "x1_sipm_temp_max",
    numeric: true,
    disablePadding: false,
    label: "Max",
    detector: "x1",
  },
  {
    id: "x1_sipm_operating_voltage_avg",
    numeric: true,
    disablePadding: false,
    label: "Avg",
    detector: "x1",
  },
  {
    id: "x1_sipm_operating_voltage_min",
    numeric: true,
    disablePadding: false,
    label: "Min",
    detector: "x1",
  },
  {
    id: "x1_sipm_operating_voltage_max",
    numeric: true,
    disablePadding: false,
    label: "Max",
    detector: "x1",
  },
  {
    id: "x123_board_temp_avg",
    numeric: true,
    disablePadding: false,
    label: "Avg",
    detector: "x123",
  },
  {
    id: "x123_board_temp_min",
    numeric: true,
    disablePadding: false,
    label: "Min",
    detector: "x123",
  },
  {
    id: "x123_board_temp_max",
    numeric: true,
    disablePadding: false,
    label: "Max",
    detector: "x123",
  },
  {
    id: "x123_det_high_voltage_avg",
    numeric: true,
    disablePadding: false,
    label: "Avg",
    detector: "x123",
  },
  {
    id: "x123_det_high_voltage_min",
    numeric: true,
    disablePadding: false,
    label: "Min",
    detector: "x123",
  },
  {
    id: "x123_det_high_voltage_max",
    numeric: true,
    disablePadding: false,
    label: "Max",
    detector: "x123",
  },
  {
    id: "x123_det_temp_avg",
    numeric: true,
    disablePadding: false,
    label: "Avg",
    detector: "x123",
  },
  {
    id: "x123_det_temp_min",
    numeric: true,
    disablePadding: false,
    label: "Min",
    detector: "x123",
  },
  {
    id: "x123_det_temp_max",
    numeric: true,
    disablePadding: false,
    label: "Max",
    detector: "x123",
  },
];

interface HealthTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof RowHealthData
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  detector: string;
}

export default function HealthTableHead(props: HealthTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    detector,
  } = props;
  const createSortHandler =
    (property: keyof RowHealthData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      {detector == "x123" ? (
        <TableRow>
          <TableCell colSpan={3} align="center">
            Details
          </TableCell>
          <TableCell colSpan={3} align="center">
            DP5 board temperature
          </TableCell>
          <TableCell colSpan={3} align="center">
            Detector high voltage
          </TableCell>
          <TableCell colSpan={3} align="center">
            Detector head temperature
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell colSpan={3} align="center">
            Details
          </TableCell>
          <TableCell colSpan={3} align="center">
            ARM Processor Temperature
          </TableCell>
          <TableCell colSpan={3} align="center">
            SiPM board temperature
          </TableCell>
          <TableCell colSpan={3} align="center">
            SiPM operating voltage
          </TableCell>
        </TableRow>
      )}
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
        <TableCell padding="checkbox"></TableCell>
        {headCells.map(
          (headCell) =>
            (headCell.detector == "all" || headCell.detector == detector) && (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "center"}
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
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
        )}
      </TableRow>
    </TableHead>
  );
}
