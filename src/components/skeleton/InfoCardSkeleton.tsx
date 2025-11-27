import { Box, Skeleton } from "@mui/material";

interface Props {
  rows?: number; // each row has exactly 2 skeleton cards
}

export default function InfoCardSkeletonGrid({ rows = 1 }: Props) {
  const totalCards = rows * 2;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {Array.from({ length: totalCards }).map((_, i) => (
        <Box
          key={i}
          sx={{
            width: "calc(50% - 8px)", // 2 cards in one row
            p: 2,
            borderRadius: 3,
            border: "1px solid #eee",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {/* Icon */}
          <Skeleton variant="circular" width={40} height={40} />

          {/* Title */}
          <Skeleton variant="text" width="60%" height={24} />

          {/* Value */}
          <Skeleton variant="text" width="40%" height={32} />
        </Box>
      ))}
    </Box>
  );
}
