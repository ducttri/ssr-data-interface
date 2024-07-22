export interface HealthJSONData {
  _id: string;
  processed_data: ProcessedHealthData;
  raw_data: RawHealthData;
}

export interface ProcessedHealthData {
  start_time: number;
  c1: {
    arm_temp: ProcessedHealthDataType;
    sipm_temp: ProcessedHealthDataType;
    sipm_operating_voltage: ProcessedHealthDataType;
  };
  m1: {
    arm_temp: ProcessedHealthDataType;
    sipm_temp: ProcessedHealthDataType;
    sipm_operating_voltage: ProcessedHealthDataType;
  };
  m5: {
    arm_temp: ProcessedHealthDataType;
    sipm_temp: ProcessedHealthDataType;
    sipm_operating_voltage: ProcessedHealthDataType;
  };
  x1: {
    arm_temp: ProcessedHealthDataType;
    sipm_temp: ProcessedHealthDataType;
    sipm_operating_voltage: ProcessedHealthDataType;
  };
  x123: {
    board_temp: ProcessedHealthDataType;
    det_high_voltage: ProcessedHealthDataType;
    det_temp: ProcessedHealthDataType;
  };
}

export interface ProcessedHealthDataType {
  avg: number;
  min: number;
  max: number;
}

export interface RawHealthData {
  timestamp: number[];
  x123: {
    accumulation_time: RawHealthDataType;
    board_temp: RawHealthDataType;
    det_high_voltage: RawHealthDataType;
    det_temp: RawHealthDataType;
    fast_counts: RawHealthDataType;
    real_time: RawHealthDataType;
    slow_counts: RawHealthDataType;
  };
  x1: {
    arm_temp: RawHealthDataType;
    counts: RawHealthDataType;
    dead_time: RawHealthDataType;
    real_time: RawHealthDataType;
    sipm_operating_voltage: RawHealthDataType;
    sipm_target_voltage: RawHealthDataType;
    sipm_temp: RawHealthDataType;
  };
  c1: {
    arm_temp: RawHealthDataType;
    counts: RawHealthDataType;
    dead_time: RawHealthDataType;
    real_time: RawHealthDataType;
    sipm_operating_voltage: RawHealthDataType;
    sipm_target_voltage: RawHealthDataType;
    sipm_temp: RawHealthDataType;
  };
  m1: {
    arm_temp: RawHealthDataType;
    counts: RawHealthDataType;
    dead_time: RawHealthDataType;
    real_time: RawHealthDataType;
    sipm_operating_voltage: RawHealthDataType;
    sipm_target_voltage: RawHealthDataType;
    sipm_temp: RawHealthDataType;
  };
  m5: {
    arm_temp: RawHealthDataType;
    counts: RawHealthDataType;
    dead_time: RawHealthDataType;
    real_time: RawHealthDataType;
    sipm_operating_voltage: RawHealthDataType;
    sipm_target_voltage: RawHealthDataType;
    sipm_temp: RawHealthDataType;
  };
}

export type RawHealthType =
  | "timestamp"
  | "c1"
  | "m1"
  | "m5"
  | "x1"
  | "x123";

export interface RawHealthDataType {
  unit: string;
  value: number[];
}

export interface RowHealthData {
  id: number;
  uid: string;
  beginUTC: number;
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

  x123_board_temp_avg: number;
  x123_board_temp_min: number;
  x123_board_temp_max: number;
  x123_det_high_voltage_avg: number;
  x123_det_high_voltage_min: number;
  x123_det_high_voltage_max: number;
  x123_det_temp_avg: number;
  x123_det_temp_min: number;
  x123_det_temp_max: number;
}

export type RowHealthDataType =
  | "id"
  | "uid"
  | "beginUTC"
  | "c1_arm_temp_avg"
  | "c1_arm_temp_min"
  | "c1_arm_temp_max"
  | "c1_sipm_temp_avg"
  | "c1_sipm_temp_min"
  | "c1_sipm_temp_max"
  | "c1_sipm_operating_voltage_avg"
  | "c1_sipm_operating_voltage_min"
  | "c1_sipm_operating_voltage_max"
  | "m1_arm_temp_avg"
  | "m1_arm_temp_min"
  | "m1_arm_temp_max"
  | "m1_sipm_temp_avg"
  | "m1_sipm_temp_min"
  | "m1_sipm_temp_max"
  | "m1_sipm_operating_voltage_avg"
  | "m1_sipm_operating_voltage_min"
  | "m1_sipm_operating_voltage_max"
  | "m5_arm_temp_avg"
  | "m5_arm_temp_min"
  | "m5_arm_temp_max"
  | "m5_sipm_temp_avg"
  | "m5_sipm_temp_min"
  | "m5_sipm_temp_max"
  | "m5_sipm_operating_voltage_avg"
  | "m5_sipm_operating_voltage_min"
  | "m5_sipm_operating_voltage_max"
  | "x1_arm_temp_avg"
  | "x1_arm_temp_min"
  | "x1_arm_temp_max"
  | "x1_sipm_temp_avg"
  | "x1_sipm_temp_min"
  | "x1_sipm_temp_max"
  | "x1_sipm_operating_voltage_avg"
  | "x1_sipm_operating_voltage_min"
  | "x1_sipm_operating_voltage_max"
  | "x123_board_temp_avg"
  | "x123_board_temp_min"
  | "x123_board_temp_max"
  | "x123_det_high_voltage_avg"
  | "x123_det_high_voltage_min"
  | "x123_det_high_voltage_max"
  | "x123_det_temp_avg"
  | "x123_det_temp_min"
  | "x123_det_temp_max";


export interface FilterHealthData {
  key: RowHealthDataType;
  detector: string;
  field: number;
  type: string;
  operator: string;
  value: number;
}
