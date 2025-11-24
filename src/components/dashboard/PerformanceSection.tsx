import { Box } from "@mui/material";
import InfoCard from "../InfoCard";
import FluidIcon from "../../assets/icons/fluidIcon.svg?react";
import CalendarIcon from "../../assets/icons/calendarIcon.svg?react";
import ValetIcon from "../../assets/icons/valetIcon.svg?react";
import PercentIcon from "../../assets/icons/percentIcon.svg?react";
import ViewMoreButton from "../ViewMoreButton";

export default function PerformanceSection() {
  const handleMorePerformance = () => {
    console.log("More performance clicked!");
  };

  return (
    <Box>
      {/* Row 1 */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <InfoCard
          data={{
            title: "Fluid Resources",
            value: 12580000,
            valueType: "currency",
            change: 0.39,
            trend: "up",
            icon: <FluidIcon />,
            showBarGraph: true,
            barValues: [0.4, 0.5, 0.45, 0.6, 0.55, 0.4, 1],
            primaryAccentColor: "#6DC1FF",
            secondaryAccentColor: "#6dc2ff36",
          }}
        />

        <InfoCard
          data={{
            title: "Growth Rate",
            value: 6.4,
            valueType: "percentage",
            change: -0.25,
            trend: "down",
            icon: <CalendarIcon />,
            showBarGraph: true,
            barValues: [0.4, 0.5, 0.45, 0.6, 0.55, 0.4, 1],
            primaryAccentColor: "#BD8BFD",
            secondaryAccentColor: "#bc8bfd3d",
          }}
        />
      </Box>

      {/* Row 2 */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <InfoCard
          data={{
            title: "Fluid Resources",
            value: 12580000,
            valueType: "currency",
            change: 0.35,
            trend: "up",
            icon: <ValetIcon />,
            showBarGraph: true,
            barValues: [0.4, 0.5, 0.45, 0.6, 0.55, 0.4, 1],
            primaryAccentColor: "#FDB176",
            secondaryAccentColor: "#fdb07633",
          }}
        />

        <InfoCard
          data={{
            title: "Growth Rate",
            value: 6.4,
            valueType: "percentage",
            change: -0.25,
            trend: "down",
            icon: <PercentIcon />,
            showBarGraph: true,
            barValues: [0.4, 0.5, 0.45, 0.6, 0.55, 0.4, 1],
            primaryAccentColor: "#f7ed65ff",
            secondaryAccentColor: "#f7ed6550",
          }}
        />
      </Box>

      {/* View More Button */}
      <ViewMoreButton
        title="View Performance Details"
        onPress={handleMorePerformance}
      />
    </Box>
  );
}
