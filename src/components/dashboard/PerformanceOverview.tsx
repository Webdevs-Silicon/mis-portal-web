import { Box, Typography, Stack } from "@mui/material";
import TrendingUpIcon from "../../assets/icons/trendingUpIcon.svg?react";
import { useState, useEffect } from "react";
import { sizes } from "../../theme/theme";
import Chip from "../Chip";

type ProfitAndLossItem = {
  Date: string;
  Amount: number;
  Percentage: number;
};

type Props = {
  profitData: ProfitAndLossItem[];
};

export default function PerformanceOverview({ profitData }: Props) {
  const [selected, setSelected] = useState<ProfitAndLossItem | null>(null);

  // Set default selected = last item when data loads
  useEffect(() => {
    if (profitData && profitData.length > 0 && !selected) {
      setSelected(profitData[profitData.length - 1]);
    }
  }, [profitData, selected]);

  const handleBarClick = (item: ProfitAndLossItem) => {
    setSelected(item);
  };

  // Still loading
  if (!selected) {
    return (
      <Box sx={{ color: "#fff", p: 4 }}>Loading Performance Overview...</Box>
    );
  }

  const formatToLakhs = (value: number) => {
    if (value >= 100000) {
      return (value / 100000).toFixed(1) + "L";
    }
    return value.toLocaleString(); // fallback
  };

  // Compute max height for scaling
  const maxAmount = Math.max(...profitData.map((x) => Math.abs(x.Amount)));

  return (
    <Box sx={{ width: "100%", padding: "20px", background: "transparent" }}>
      <Typography
        sx={{
          fontSize: sizes.medium,
          fontWeight: 600,
          color: "#fff",
          mb: 2,
        }}
      >
        Performance Overview
      </Typography>

      <Box
        sx={{
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.15)",
          p: 3,
          position: "relative",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        }}
      >
        {/* HEADER */}
        <Stack direction="row" justifyContent="space-between">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mb: 2,
            }}
          >
            {/* LEFT */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "8px",
                  backgroundColor: "#14B0B8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TrendingUpIcon color="#fff" width={24} height={24} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  Profit
                </Typography>

                <Typography
                  sx={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  ₹ {formatToLakhs(selected.Amount)}
                </Typography>
              </Box>
            </Box>

            <Chip
              isPositive={selected.Percentage >= 0}
              text={`${selected.Percentage}%`}
            />
          </Box>
        </Stack>

        {/* BAR CHART */}
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="flex-end"
          sx={{ mt: 1 }}
        >
          {profitData.map((item, idx) => {
            const isSelected = selected.Date === item.Date;

            const HEIGHT_SCALE = 0.6;

            const barHeight =
              (Math.abs(item.Amount) / maxAmount) * 100 * HEIGHT_SCALE + 20;

            return (
              <Box
                key={idx}
                onClick={() => handleBarClick(item)}
                sx={{
                  width: 72,
                  height: barHeight,
                  borderRadius: "10px 10px 0 0",
                  backgroundColor: "#14B0B8",
                  opacity: isSelected ? 1 : 0.5, // selected = full; others = light
                  cursor: "pointer",
                  transition: "0.2s",
                  transform: isSelected ? "scale(1.05)" : "scale(1)",
                }}
              />
            );
          })}
        </Stack>

        {/* FOOTER */}
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
          <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
            Last 7 Days
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
            {selected.Amount >= 0 ? "Positive" : "Negative"} Day
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
