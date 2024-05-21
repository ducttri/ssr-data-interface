import { ObjectId } from "mongodb";

export interface JSONData {
  _id: ObjectId;
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
      }
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
