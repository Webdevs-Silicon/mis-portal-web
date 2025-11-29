import { Alert, Box, Skeleton, Typography } from "@mui/material";
import { colors, sizes } from "../../theme/theme";
import StackIcon from "../../assets/icons/stackIcon.svg?react";
import InterestIcon from "../../assets/icons/interestIcon.svg?react";
import InfoCard from "../InfoCard";
import type { BorrowMain } from "../../api/services/borrowService";
import InfoCardSkeleton from "../skeleton/InfoCardSkeleton";

interface BorrowingSectionProps {
  borrowingOverviewData: BorrowMain | null;
  loading?: boolean;
  error?: string | null;
}

export default function BorrowingSection({
  borrowingOverviewData,
  loading,
  error,
}: BorrowingSectionProps) {
  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error || "Failed to load borrow data."}
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box>
        <InfoCardSkeleton rows={1} />

        <Skeleton
          variant="rounded"
          height={45}
          width="100%"
          sx={{ borderRadius: 2, mt: 2 }}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        sx={{
          fontSize: sizes.medimLarge,
          fontWeight: 600,
          mb: 2,
        }}
      >
        Borrowings
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <InfoCard
          data={{
            title: "Total Borrowings",
            value: Number(borrowingOverviewData?.Total) ?? "0",
            valueType: "currency",
            change: [borrowingOverviewData?.Percentage ?? 0],
            icon: <StackIcon />,
            showBarGraph: false,
            primaryAccentColor: "#BD8BFD",
            secondaryAccentColor: "#bc8bfd3d",
          }}
        />
        <InfoCard
          data={{
            title: "Avg. Interest Rate",
            value: borrowingOverviewData?.Int ?? 0,
            valueType: "percentage",
            change: [borrowingOverviewData?.IntPercentage ?? 0],
            icon: <InterestIcon />,
            showBarGraph: false,
            primaryAccentColor: "#FDB176",
            secondaryAccentColor: "#fdb07633",
          }}
        />
      </Box>
    </Box>
  );
}
