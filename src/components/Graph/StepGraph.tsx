import React from "react";
import dynamic from "next/dynamic";
import { baselightTheme } from "@/utils/theme/DefaultColors";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export const StepGraph = ({
  xData,
  yData,
  xLabel,
  yLabel,
  title,
}: {
  xData: any[];
  yData: any[];
  xLabel: string;
  yLabel: string;
  title: string;
}) => {
  return (
    <Plot
      data={[
        {
          x: xData,
          y: yData,
          type: "scatter",
          line: {
            shape: "hv",
            color: baselightTheme.palette.primary.main,
          },
        },
      ]}
      layout={{
        autosize: true, // Enable responsive sizing
        title: title,
        xaxis: { title: xLabel, rangeslider: {} },
        yaxis: { title: yLabel, fixedrange: true },
      }}
      useResizeHandler={true} // Important: This tells Plotly to re-render on resize
      style={{ width: "100%", height: "100%", aspectRatio: "4/3" }} // Ensure the div containing the plot is fully responsive
    />
  );
};
