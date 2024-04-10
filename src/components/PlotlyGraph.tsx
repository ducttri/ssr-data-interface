import React from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const PlotlyGraph = ({
  xData,
  yData,
  xLabel,
  yLabel,
  xUnit,
  yUnit,
  width,
}: {
  xData: number[];
  yData: number[];
  xLabel: string;
  yLabel: string;
  xUnit: string;
  yUnit: string;
  width: number;
}) => {
  return (
    <Plot
      data={[
        {
          x: xData,
          y: yData,
          type: "scatter",
        },
      ]}
      layout={{
        width: width,
        height: 400,
        title: yLabel + " vs. " + xLabel,
        xaxis: { title: xLabel + " (" + xUnit + ")" },
        yaxis: { title: yLabel + " (" + yUnit + ")" },
      }}
    />
  );
};

export default PlotlyGraph;
