import { Data } from "@/types/types";

export function createData(
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
  x1_sipm_operating_voltage_max: number,

  x123_board_temp_avg: number,
  x123_board_temp_min: number,
  x123_board_temp_max: number,
  x123_det_high_voltage_avg: number,
  x123_det_high_voltage_min: number,
  x123_det_high_voltage_max: number,
  x123_det_temp_avg: number,
  x123_det_temp_min: number,
  x123_det_temp_max: number
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

    x123_board_temp_avg,
    x123_board_temp_min,
    x123_board_temp_max,
    x123_det_high_voltage_avg,
    x123_det_high_voltage_min,
    x123_det_high_voltage_max,
    x123_det_temp_avg,
    x123_det_temp_min,
    x123_det_temp_max,
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

export function getComparator<Key extends keyof any>(
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
export function stableSort<T>(
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
