import { Box, Typography, Stack, Chip } from "@mui/material";
import TrendingUpIcon from "../../assets/icons/trendingUpIcon.svg?react";
import type { PerformanceData } from "../../types/dashboard";
import { sizes } from "../../theme/theme";

type Props = {
  data: PerformanceData;
};

const dummyChartData = [30, 35, 25, 40, 38, 45, 65]; // API-ready

export default function PerformanceOverview({ data }: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
        background: "transparent",
      }}
    >
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
        <Stack direction="row" justifyContent="space-between">
          {/* HEADER ROW */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mb: 2,
            }}
          >
            {/* LEFT SIDE */}
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
                    fontSize: 30,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  ₹ {data.profit / 100000}L
                </Typography>
              </Box>
            </Box>

            {/* RIGHT SIDE (Chip only) */}
            <Chip
              icon={<TrendingUpIcon color="green" width={20} height={20} />}
              label={data.change}
              sx={{
                backgroundColor: "#fff",
                fontWeight: 600,
                color: "#0A8A40",
                px: 1.5,
                py: 0.5,
                borderRadius: "16px",
              }}
            />
          </Box>
        </Stack>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="flex-end"
          sx={{ mt: 1 }}
        >
          {dummyChartData.map((value, idx) => (
            <Box
              key={idx}
              sx={{
                width: 40,
                height: value,
                borderRadius: 1,
                background: "linear-gradient(180deg, #32d3ff 0%, #008cff 100%)",
                opacity: idx === dummyChartData.length - 1 ? 1 : 0.4,
                transition: "0.3s",
              }}
            />
          ))}
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
          <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
            Last 7 Days
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
            Stable Growth
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
