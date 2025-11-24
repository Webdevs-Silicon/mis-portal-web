import { Box, Typography } from "@mui/material";
import TrendingUpIcon from "../assets/icons/trendingUpIcon.svg?react";
import TrendingDownIcon from "../assets/icons/trendingDownIcon.svg?react";

type ChipProps = {
  isPositive: boolean; // REQUIRED
  text: string; // "0.35"
};

export default function Chip({ isPositive, text }: ChipProps) {
  const icon = isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />;
  const color = isPositive ? "#379B50" : "#FFFFFF";
  const backgroundColor = isPositive ? "#E9FCEE" : "#DF5F5F";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
        width: 65,
        height: 26,
        borderRadius: "20px",
        backgroundColor,
      }}
    >
      <Box
        sx={{
          color,
          display: "flex",
          alignItems: "center",
          lineHeight: 0,
        }}
      >
        {icon}
      </Box>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 500,
          color,
          fontFamily: "Inter, sans-serif",
          lineHeight: 1,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
