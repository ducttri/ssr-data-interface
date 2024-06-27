
export interface JSONData {
  _id: string;
  processed_data: {
    start_time: number;
    c1: {
      arm_temp: {
        avg: number;
        min: number;
        max: number;
      };
      sipm_temp: {
        avg: number;
        min: number;
        max: number;
      };
      sipm_operating_voltage: {
        avg: number;
        min: number;
        max: number;
      };
    };
    m1: {
      arm_temp: {
        avg: number;
        min: number;
        max: number;
      };
      sipm_temp: {
        avg: number;
        min: number;
        max: number;
      };
      sipm_operating_voltage: {
        avg: number;
        min: number;
        max: number;
      };
    };
    m5: {
      arm_temp: {
        avg: number;
        min: number;
        max: number;
      };
      sipm_temp: {
        avg: number;
        min: number;
        max: number;
      };
      sipm_operating_voltage: {
        avg: number;
        min: number;
        max: number;
      };
    };
    x1: {
      arm_temp: {
        avg: number;
        min: number;
        max: number;
      };
      sipm_temp: {
        avg: number;
        min: number;
        max: number;
      };
      sipm_operating_voltage: {
        avg: number;
        min: number;
        max: number;
      };
    };
    x123: {
      board_temp: {
        avg: number;
        min: number;
        max: number;
      };
      det_high_voltage: {
        avg: number;
        min: number;
        max: number;
      };
      det_temp: {
        avg: number;
        min: number;
        max: number;
      };
    };
  };
  raw_data: {
    timestamp: number[];
    x123: {
      accumulation_time: {
        unit: string;
        value: number[];
      };
      board_temp: {
        unit: string;
        value: number[];
      };
      det_high_voltage: {
        unit: string;
        value: number[];
      };
      det_temp: {
        unit: string;
        value: number[];
      };
      fast_counts: {
        unit: string;
        value: number[];
      };
      real_time: {
        unit: string;
        value: number[];
      };
      slow_counts: {
        unit: string;
        value: number[];
      };
    };
    x1: {
      arm_temp: {
        unit: string;
        value: number[];
      };
      counts: {
        unit: string;
        value: number[];
      };
      dead_time: {
        unit: string;
        value: number[];
      };
      real_time: {
        unit: string;
        value: number[];
      };
      sipm_operating_voltage: {
        unit: string;
        value: number[];
      };
      sipm_target_voltage: {
        unit: string;
        value: number[];
      };
      sipm_temp: {
        unit: string;
        value: number[];
      };
    };
    c1: {
      arm_temp: {
        unit: string;
        value: number[];
      };
      counts: {
        unit: string;
        value: number[];
      };
      dead_time: {
        unit: string;
        value: number[];
      };
      real_time: {
        unit: string;
        value: number[];
      };
      sipm_operating_voltage: {
        unit: string;
        value: number[];
      };
      sipm_target_voltage: {
        unit: string;
        value: number[];
      };
      sipm_temp: {
        unit: string;
        value: number[];
      };
    };
    m1: {
      arm_temp: {
        unit: string;
        value: number[];
      };
      counts: {
        unit: string;
        value: number[];
      };
      dead_time: {
        unit: string;
        value: number[];
      };
      real_time: {
        unit: string;
        value: number[];
      };
      sipm_operating_voltage: {
        unit: string;
        value: number[];
      };
      sipm_target_voltage: {
        unit: string;
        value: number[];
      };
      sipm_temp: {
        unit: string;
        value: number[];
      };
    };
    m5: {
      arm_temp: {
        unit: string;
        value: number[];
      };
      counts: {
        unit: string;
        value: number[];
      };
      dead_time: {
        unit: string;
        value: number[];
      };
      real_time: {
        unit: string;
        value: number[];
      };
      sipm_operating_voltage: {
        unit: string;
        value: number[];
      };
      sipm_target_voltage: {
        unit: string;
        value: number[];
      };
      sipm_temp: {
        unit: string;
        value: number[];
      };
    };
  };
}

export interface Data {
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

export interface FilterData {
  detector: string;
  field: number;
  type: string;
  operator: string;
  value: number;
}