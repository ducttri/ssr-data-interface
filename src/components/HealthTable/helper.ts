import { HealthJSONData, RowHealthData } from "@/types/types";

export function createData(id: number, data: HealthJSONData): RowHealthData {
  return {
    id: id,
    uid: data._id,
    beginUTC: data.processed_data.start_time,
    c1_arm_temp_avg: data.processed_data.c1.arm_temp.avg,
    c1_arm_temp_min: data.processed_data.c1.arm_temp.min,
    c1_arm_temp_max: data.processed_data.c1.arm_temp.max,
    c1_sipm_temp_avg: data.processed_data.c1.sipm_temp.avg,
    c1_sipm_temp_min: data.processed_data.c1.sipm_temp.min,
    c1_sipm_temp_max: data.processed_data.c1.sipm_temp.max,
    c1_sipm_operating_voltage_avg:
      data.processed_data.c1.sipm_operating_voltage.avg,
    c1_sipm_operating_voltage_min:
      data.processed_data.c1.sipm_operating_voltage.min,
    c1_sipm_operating_voltage_max:
      data.processed_data.c1.sipm_operating_voltage.max,

    m1_arm_temp_avg: data.processed_data.m1.arm_temp.avg,
    m1_arm_temp_min: data.processed_data.m1.arm_temp.min,
    m1_arm_temp_max: data.processed_data.m1.arm_temp.max,
    m1_sipm_temp_avg: data.processed_data.m1.sipm_temp.avg,
    m1_sipm_temp_min: data.processed_data.m1.sipm_temp.min,
    m1_sipm_temp_max: data.processed_data.m1.sipm_temp.max,
    m1_sipm_operating_voltage_avg:
      data.processed_data.m1.sipm_operating_voltage.avg,
    m1_sipm_operating_voltage_min:
      data.processed_data.m1.sipm_operating_voltage.min,
    m1_sipm_operating_voltage_max:
      data.processed_data.m1.sipm_operating_voltage.max,

    m5_arm_temp_avg: data.processed_data.m5.arm_temp.avg,
    m5_arm_temp_min: data.processed_data.m5.arm_temp.min,
    m5_arm_temp_max: data.processed_data.m5.arm_temp.max,
    m5_sipm_temp_avg: data.processed_data.m5.sipm_temp.avg,
    m5_sipm_temp_min: data.processed_data.m5.sipm_temp.min,
    m5_sipm_temp_max: data.processed_data.m5.sipm_temp.max,
    m5_sipm_operating_voltage_avg:
      data.processed_data.m5.sipm_operating_voltage.avg,
    m5_sipm_operating_voltage_min:
      data.processed_data.m5.sipm_operating_voltage.min,
    m5_sipm_operating_voltage_max:
      data.processed_data.m5.sipm_operating_voltage.max,

    x1_arm_temp_avg: data.processed_data.x1.arm_temp.avg,
    x1_arm_temp_min: data.processed_data.x1.arm_temp.min,
    x1_arm_temp_max: data.processed_data.x1.arm_temp.max,
    x1_sipm_temp_avg: data.processed_data.x1.sipm_temp.avg,
    x1_sipm_temp_min: data.processed_data.x1.sipm_temp.min,
    x1_sipm_temp_max: data.processed_data.x1.sipm_temp.max,
    x1_sipm_operating_voltage_avg:
      data.processed_data.x1.sipm_operating_voltage.avg,
    x1_sipm_operating_voltage_min:
      data.processed_data.x1.sipm_operating_voltage.min,
    x1_sipm_operating_voltage_max:
      data.processed_data.x1.sipm_operating_voltage.max,

    x123_board_temp_avg: data.processed_data.x123.board_temp.avg,
    x123_board_temp_min: data.processed_data.x123.board_temp.min,
    x123_board_temp_max: data.processed_data.x123.board_temp.max,
    x123_det_high_voltage_avg: data.processed_data.x123.det_high_voltage.avg,
    x123_det_high_voltage_min: data.processed_data.x123.det_high_voltage.min,
    x123_det_high_voltage_max: data.processed_data.x123.det_high_voltage.max,
    x123_det_temp_avg: data.processed_data.x123.det_temp.avg,
    x123_det_temp_min: data.processed_data.x123.det_temp.min,
    x123_det_temp_max: data.processed_data.x123.det_temp.max,
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
