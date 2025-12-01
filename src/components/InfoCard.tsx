import { Card, Box, Typography, useTheme } from "@mui/material";
import { useState, useMemo } from "react"; // Import useMemo
import Chip from "./Chip";

type Trend = "up" | "down" | "neutral"; // Define Trend type

type Props = {
  data: {
    title: string;
    value: number; // The overall latest value
    valueType: "currency" | "percentage" | "number";
    change?: number[];
    icon: React.ReactNode;
    primaryAccentColor: string;
    secondaryAccentColor: string;
    barValues?: number[]; // Raw values for the bars
    showBarGraph?: boolean;
    width?: number | string;
    showTopChip?: boolean;
  };
  onBarSelect?: (index: number, value: number) => void;
};

export default function InfoCard({ data, onBarSelect }: Props) {
  const theme = useTheme();
  const [selectedBar, setSelectedBar] = useState<number | null>(null);

  const hasChangeData = Array.isArray(data.change) && data.change.length > 0;

  const hasBarGraph =
    data.showBarGraph &&
    Array.isArray(data.barValues) &&
    data.barValues.length > 0;

  // Normalize barValues for consistent graph height
  const normalizedBarValues = useMemo(() => {
    if (!hasBarGraph) return [];

    const maxValue = Math.max(...data.barValues!);
    // Avoid division by zero if all values are 0
    if (maxValue === 0) return data.barValues!.map(() => 0);

    // Scale all values to be between 0 and 1, relative to the max value
    return data.barValues!.map((v) => v / maxValue);
  }, [data.barValues]);

  // Determine which bar is selected; default to the last one if available
  const displayIndex =
    selectedBar !== null
      ? selectedBar
      : data.barValues && data.barValues.length > 0
      ? data.barValues.length - 1
      : 0;

  // The actual value to display when a bar is selected
  const displayValue =
    data.barValues && data.barValues.length > 0
      ? data.barValues[displayIndex]
      : data.value; // Fallback to main value if no bar values

  const chipChange = hasChangeData ? data.change![displayIndex] ?? 0 : 0;

  const chipTrend: Trend = useMemo(() => {
    if (chipChange > 0) return "up";
    if (chipChange < 0) return "down";
    return "neutral";
  }, [chipChange]);

  const formattedValue = useMemo(() => {
    const v = displayValue;

    if (data.valueType === "currency") {
      if (isNaN(v) || !isFinite(v)) return "₹ 0";

      if (v < 100000) return `₹ ${v.toLocaleString("en-IN")}`;
      const lakhs = v / 100000;
      return `₹ ${lakhs.toFixed(1)}L`;
    }

    if (data.valueType === "percentage") {
      return `${v.toFixed(1)}%`;
    }

    // NEW: plain number format
    return v.toLocaleString("en-IN");
  }, [displayValue, data.valueType]);

  // Handle the change text formatting
  const formattedChangeText = useMemo(() => {
    // Show absolute value with 2 decimal places
    const absChange = Math.abs(chipChange);
    return `${absChange.toFixed(2)}%`;
  }, [chipChange]);

  return (
    <Card
      sx={{
        p: 2.5,
        width: data.width ?? 185,
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
        border: "1px solid #f0f0f0",
        bgcolor: "#fff",
      }}
    >
      {/* Top Row */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            backgroundColor: data.secondaryAccentColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {data.icon}
        </Box>

        {(data.showTopChip || data.showBarGraph) && hasChangeData && (
          <Chip
            isPositive={chipTrend === "up"}
            text={`${formattedChangeText}`}
          />
        )}
      </Box>

      {/* Title */}
      <Typography
        sx={{ mt: 1.5, fontSize: 14, fontWeight: 500, color: "#666" }}
      >
        {data.title}
      </Typography>

      {/* Dynamic Value */}
      <Typography
        sx={{
          mt: 0.5,
          fontSize: 22,
          fontWeight: 700,
          color: theme.palette.text.primary,
        }}
      >
        {formattedValue}
      </Typography>

      {/* Bar Graph */}
      {data.showBarGraph && data.barValues && normalizedBarValues.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 1,
            mt: 1.2,
            height: 40, // Fixed height for the bar graph container
          }}
        >
          {/* Map normalized values for rendering, but use original values for click handler */}
          {normalizedBarValues.map((normalizedHeight, i) => {
            const isSelected = i === displayIndex;
            const originalValue = data.barValues![i]; // Get the original value for the callback

            return (
              <Box
                key={i}
                onClick={() => {
                  setSelectedBar(i);
                  onBarSelect?.(i, originalValue); // Pass original value
                }}
                sx={{
                  width: 20,
                  // Use normalized height multiplied by a maximum pixel height
                  height: Math.max(2, 35 * normalizedHeight), // Minimum height of 2px for very small values
                  borderRadius: 1,
                  cursor: "pointer",
                  transition: "0.25s",
                  backgroundColor: isSelected
                    ? data.primaryAccentColor
                    : data.secondaryAccentColor,
                  opacity: isSelected ? 1 : 0.5,
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              />
            );
          })}
        </Box>
      ) : (
        !data.showTopChip &&
        hasChangeData && (
          <Box style={{ marginTop: 8 }}>
            <Chip
              isPositive={chipTrend === "up"}
              text={`${formattedChangeText}`}
            />
          </Box>
        )
      )}
    </Card>
  );
}
