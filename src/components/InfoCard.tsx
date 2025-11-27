import { Card, Box, Typography, useTheme } from "@mui/material";
import { useState, useMemo } from "react"; // Import useMemo
import Chip from "./Chip";

type Trend = "up" | "down" | "neutral"; // Define Trend type

type Props = {
  data: {
    title: string;
    value: number; // The overall latest value
    valueType: "currency" | "percentage";
    change: number[];
    icon: React.ReactNode;
    primaryAccentColor: string;
    secondaryAccentColor: string;
    barValues?: number[]; // Raw values for the bars
    showBarGraph?: boolean;
  };
  onBarSelect?: (index: number, value: number) => void;
};

export default function InfoCard({ data, onBarSelect }: Props) {
  const theme = useTheme();
  const [selectedBar, setSelectedBar] = useState<number | null>(null);

  // Normalize barValues for consistent graph height
  const normalizedBarValues = useMemo(() => {
    if (!data.barValues || data.barValues.length === 0) return [];

    const maxValue = Math.max(...data.barValues);
    // Avoid division by zero if all values are 0
    if (maxValue === 0) return data.barValues.map(() => 0);

    // Scale all values to be between 0 and 1, relative to the max value
    return data.barValues.map((v) => v / maxValue);
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

  const chipChange = data.change[displayIndex] ?? 0;

  const chipTrend: Trend = useMemo(() => {
    if (chipChange > 0) return "up";
    if (chipChange < 0) return "down";
    return "neutral";
  }, [chipChange]);

  const formattedValue = useMemo(() => {
    const valToFormat = displayValue;

    if (data.valueType === "currency") {
      if (isNaN(valToFormat) || !isFinite(valToFormat)) return "₹ 0";

      // If < 1 lakh → format normally with commas
      if (valToFormat < 100000) {
        return `₹ ${valToFormat.toLocaleString("en-IN")}`;
      }

      // If ≥ 1 lakh → convert to L
      const lakhs = valToFormat / 100000;
      return `₹ ${lakhs.toFixed(1)}L`;
    }

    // Percentage
    return `${valToFormat.toFixed(1)}%`;
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
        width: 185,
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

        {data.showBarGraph && (
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
        <Box style={{ marginTop: 8 }}>
          <Chip
            isPositive={chipTrend === "up"}
            text={`${formattedChangeText}`}
          />
        </Box>
      )}
    </Card>
  );
}
