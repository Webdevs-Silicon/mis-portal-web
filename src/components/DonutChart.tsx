import { VictoryPie } from "victory";

type PieChartItem = {
  label: string;
  value: number;
  color: string;
};

type PieChartProps = {
  data: PieChartItem[];
  width?: number;
  height?: number;
  radius?: number;
  innerRadius?: number;
  cornerRadius?: number;
  padAngle?: number;
  centerTitle?: string;
  centerValue?: string;
};

export default function DonutChart({
  data,
  width = 300,
  height = 300,
  radius = 50,
  innerRadius = 80,
  cornerRadius = 6,
  padAngle = 4,
  centerTitle = "Total Loans",
  centerValue = "₹ 360.1L",
}: PieChartProps) {
  // Transform data to Victory's expected format
  const victoryData = data.map((item) => ({
    x: item.label,
    y: item.value,
    color: item.color,
  }));

  return (
    <div style={{ position: "relative", width, height }}>
      <VictoryPie
        data={victoryData}
        width={width}
        height={height}
        radius={radius}
        innerRadius={innerRadius}
        padAngle={padAngle}
        cornerRadius={cornerRadius}
        labels={() => ""} // Hide labels
        style={{
          data: {
            fill: ({ datum }) => datum.color,
            stroke: "transparent",
          },
        }}
      />
      {/* Center Text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "#999",
            marginBottom: 4,
            fontWeight: 400,
          }}
        >
          {centerTitle}
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#000",
          }}
        >
          {centerValue}
        </div>
      </div>
    </div>
  );
}
