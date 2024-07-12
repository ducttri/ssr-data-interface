import React from "react";
import dynamic from "next/dynamic";
import { baselightTheme } from "@/utils/theme/DefaultColors";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export const LineGraph = ({
  xData,
  yData,
  xLabel,
  yLabel,
  xUnit,
  yUnit,
}: {
  xData: any[];
  yData: any[];
  xLabel: string;
  yLabel: string;
  xUnit: string;
  yUnit: string;
}) => {
  return (
    <Plot
      data={[
        {
          x: xData,
          y: yData,
          type: "scatter",
          line: {
            color: baselightTheme.palette.primary.main,
          },
        },
      ]}
      layout={{
        autosize: true, // Enable responsive sizing
        title: yLabel + " vs. " + xLabel,
        xaxis: { title: xLabel + " (" + xUnit + ")", rangeslider: {} },
        yaxis: { title: yLabel + " (" + yUnit + ")", fixedrange: true },
      }}
      useResizeHandler={true} // Important: This tells Plotly to re-render on resize
      style={{ width: "100%", height: "100%" }} // Ensure the div containing the plot is fully responsive
    />
  );
};
