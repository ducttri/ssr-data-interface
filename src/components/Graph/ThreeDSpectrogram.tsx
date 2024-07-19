import React from "react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export const ThreeDSpectrogram = ({
  xData,
  yData,
  zData,
  xLabel,
  yLabel,
  title,
}: {
  xData: any[];
  yData: any[];
  zData: any[];
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
          z: zData,
          type: "heatmap",
        },
      ]}
      layout={{
        autosize: true, // Enable responsive sizing
        title: title,
        xaxis: { title: xLabel },
        yaxis: { title: yLabel },
      }}
      config={{ responsive: true }}
      useResizeHandler={true} // Important: This tells Plotly to re-render on resize
      style={{ width: "100%", height: "100%", aspectRatio: "4/3" }} // Ensure the div containing the plot is fully responsive
    />
  );
};
