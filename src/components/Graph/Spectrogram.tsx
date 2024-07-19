import React from "react";
import dynamic from "next/dynamic";
import { baselightTheme } from "@/utils/theme/DefaultColors";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import data from "../../../public/dump.json";

export const Spectrogram = () => {
  const utcDates: string[] = data.timestamp.map(
    (timestamp: number) => {
      return new Date(timestamp * 1000).toISOString();
    }
  );
  return (
    <Plot
      data={[
        {
          x: utcDates,
          y: data.reversed_bins,
          z: data.histogram,
          type: "heatmap",
        },
      ]}
      layout={{
        autosize: true, // Enable responsive sizing
        title: "Counts spectrogram",
        xaxis: { title: "Time (UTC)" },
        yaxis: { title: "Normal Bridgeport ADC bin" },
        height: 700,
      }}
      config={{ responsive: true }}
      useResizeHandler={true} // Important: This tells Plotly to re-render on resize
      style={{ width: "100%", height: "100%" }} // Ensure the div containing the plot is fully responsive
    />
  );
};
