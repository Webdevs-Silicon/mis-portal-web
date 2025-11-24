import { Card, Box, Typography, useTheme } from "@mui/material";

import Chip from "./Chip"; // ← your custom chip component

type Props = {
  data: {
    title: string;
    value: number;
    valueType: "currency" | "percentage";
    change: number;
    trend: "up" | "down";
    icon: React.ReactNode;
    primaryAccentColor: string;
    secondaryAccentColor: string;
    barValues?: number[];
    showBarGraph?: boolean;
  };
};

export default function InfoCard({ data }: Props) {
  const theme = useTheme();
  const isPositive = data.trend === "up";

  const formattedValue =
    data.valueType === "currency"
      ? `₹ ${(data.value / 100000).toFixed(1)}L`
      : `${data.value}%`;

  return (
    <Card
      sx={{
        p: 2.5,
        width: 180,
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
        border: "1px solid #f0f0f0",
        bgcolor: "#fff",
      }}
    >
      {/* Top Row */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* Icon Box */}
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

        {/* Chip only when bar graph exists */}
        {data.showBarGraph && (
          <Chip isPositive={isPositive} text={data.change.toString()} />
        )}
      </Box>

      {/* Title */}
      <Typography
        sx={{
          mt: 1.5,
          fontSize: 14,
          fontWeight: 500,
          color: "#666",
        }}
      >
        {data.title}
      </Typography>

      {/* Amount */}
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

      {/* Bar Graph or Bottom Chip */}
      {data.showBarGraph && data.barValues ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 1,
            // mt: 1.5,
          }}
        >
          {data.barValues.map((h, i) => (
            <Box
              key={i}
              sx={{
                width: 14,
                height: 30 * h,
                borderRadius: 1,
                opacity: i === data.barValues!.length - 1 ? 1 : 0.6,
                backgroundColor:
                  i === data.barValues!.length - 1
                    ? data.primaryAccentColor
                    : data.secondaryAccentColor,
              }}
            />
          ))}
        </Box>
      ) : (
        <Box sx={{ mt: 1 }}>
          <Chip isPositive={isPositive} text={data.change.toString()} />
        </Box>
      )}
    </Card>
  );
}
