import React from "react";
import dynamic from "next/dynamic";
import { baselightTheme } from "@/utils/theme/DefaultColors";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface LineGraphProps {
  xData: any[];
  yData: any[];
  xLabel: string;
  yLabel: string;
  title: string;
}

export class StepGraph extends React.Component<LineGraphProps> {
  constructor(props: LineGraphProps) {
    super(props);
  }

  render() {
    const { xData, yData, xLabel, yLabel, title } = this.props;

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
          font: {
            family:
              "'__Plus_Jakarta_Sans_a182b8','__Plus_Jakarta_Sans_Fallback_a182b8',Helvetica,Arial,sans-serif",
          },
        }}
        useResizeHandler={true} // Important: This tells Plotly to re-render on resize
        style={{ width: "100%", height: "100%", aspectRatio: "4/3" }} // Ensure the div containing the plot is fully responsive
      />
    );
  }
}
