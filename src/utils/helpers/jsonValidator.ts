import Ajv, { JSONSchemaType } from "ajv";
import { JSONData } from "@/types/types";

const ajv = new Ajv();

const schema: JSONSchemaType<JSONData> = {
  type: "object",
  properties: {
    _id: { type: "string" },
    processed_data: {
      type: "object",
      properties: {
        start_time: {
          type: "number",
        },
        c1: { $ref: "#/definitions/deviceData" },
        m1: { $ref: "#/definitions/deviceData" },
        m5: { $ref: "#/definitions/deviceData" },
        x1: { $ref: "#/definitions/deviceData" },
        x123: {
          type: "object",
          properties: {
            board_temp: { $ref: "#/definitions/measurementData" },
            det_high_voltage: { $ref: "#/definitions/measurementData" },
            det_temp: { $ref: "#/definitions/measurementData" },
          },
          required: ["board_temp", "det_high_voltage", "det_temp"],
        },
      },
      required: ["start_time", "c1", "m1", "m5", "x1", "x123"],
    },
    raw_data: {
      type: "object",
      properties: {
        timestamp: {
          type: "array",
          items: { type: "number" },
        },
        x123: { $ref: "#/definitions/rawx123Data" },
        x1: { $ref: "#/definitions/rawDeviceData" },
        c1: { $ref: "#/definitions/rawDeviceData" },
        m1: { $ref: "#/definitions/rawDeviceData" },
        m5: { $ref: "#/definitions/rawDeviceData" },
      },
      required: ["timestamp", "x123", "x1", "c1", "m1", "m5"],
    },
  },
  required: ["processed_data", "raw_data"],
  additionalProperties: true,
  definitions: {
    deviceData: {
      type: "object",
      properties: {
        arm_temp: { $ref: "#/definitions/measurementData" },
        sipm_temp: { $ref: "#/definitions/measurementData" },
        sipm_operating_voltage: { $ref: "#/definitions/measurementData" },
      },
      required: ["arm_temp", "sipm_temp", "sipm_operating_voltage"],
    },
    measurementData: {
      type: "object",
      properties: {
        avg: { type: "number" },
        min: { type: "number" },
        max: { type: "number" },
      },
      required: ["avg", "min", "max"],
    },
    rawDeviceData: {
      type: "object",
      properties: {
        arm_temp: { $ref: "#/definitions/rawMeasurementData" },
        counts: { $ref: "#/definitions/rawMeasurementData" },
        dead_time: { $ref: "#/definitions/rawMeasurementData" },
        real_time: { $ref: "#/definitions/rawMeasurementData" },
        sipm_operating_voltage: { $ref: "#/definitions/rawMeasurementData" },
        sipm_target_voltage: { $ref: "#/definitions/rawMeasurementData" },
        sipm_temp: { $ref: "#/definitions/rawMeasurementData" },
      },
      required: [
        "arm_temp",
        "counts",
        "dead_time",
        "real_time",
        "sipm_operating_voltage",
        "sipm_target_voltage",
        "sipm_temp",
      ],
    },
    rawx123Data: {
      type: "object",
      properties: {
        accumulation_time: { $ref: "#/definitions/rawMeasurementData" },
        board_temp: { $ref: "#/definitions/rawMeasurementData" },
        det_high_voltage: { $ref: "#/definitions/rawMeasurementData" },
        det_temp: { $ref: "#/definitions/rawMeasurementData" },
        fast_counts: { $ref: "#/definitions/rawMeasurementData" },
        real_time: { $ref: "#/definitions/rawMeasurementData" },
        slow_counts: { $ref: "#/definitions/rawMeasurementData" },
      },
      required: [
        "accumulation_time",
        "board_temp",
        "det_high_voltage",
        "det_temp",
        "fast_counts",
        "real_time",
        "slow_counts",
      ],
    },
    rawMeasurementData: {
      type: "object",
      properties: {
        unit: { type: "string" },
        value: {
          type: "array",
          items: { type: "number" },
        },
      },
      required: ["unit", "value"],
    },
  },
};

const validate = ajv.compile(schema);

export async function jsonValidator(data: JSON) {
  const valid = validate(data);
  if (!valid) console.log(validate.errors);
  return valid;
}
