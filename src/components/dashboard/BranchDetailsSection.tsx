import { Alert, Box, Skeleton, Typography } from "@mui/material";
import { sizes } from "../../theme/theme";
import BranchIcon from "../../assets/icons/branchIcon.svg?react";
import StaffIcon from "../../assets/icons/staffIcon.svg?react";
import InfoCard from "../InfoCard";
import type { BranchNStaff } from "../../api/services/branchService";
import InfoCardSkeleton from "../skeleton/InfoCardSkeleton";
import ViewMoreButton from "../ViewMoreButton";
import { useState } from "react";
import ViewBranchDetails from "../popup/ViewBranchDetails";

interface BranchDetailsSectionProps {
  branchOverviewData: BranchNStaff | null;
  loading?: boolean;
  error?: string | null;
}

export default function BranchDetailsSection({
  branchOverviewData,
  loading,
  error,
}: BranchDetailsSectionProps) {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const handleClosePopup = () => setActivePopup(null);

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error || "Failed to load branch data."}
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box marginTop={2}>
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
          fontSize: sizes.mediumLarge,
          fontWeight: 600,
          mb: 2,
        }}
      >
        Branch Details
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <InfoCard
          data={{
            title: "Total Branches",
            value: Number(branchOverviewData?.Branch) ?? "0",
            valueType: "number",
            icon: <BranchIcon />,
            showBarGraph: false,
            primaryAccentColor: "#E8F2F9",
            secondaryAccentColor: "#E8F2F9",
          }}
        />
        <InfoCard
          data={{
            title: "Total Staffs",
            value: branchOverviewData?.Staff ?? 0,
            valueType: "number",
            icon: <StaffIcon />,
            showBarGraph: false,
            primaryAccentColor: "#FDB176",
            secondaryAccentColor: "#fdb07633",
          }}
        />
      </Box>
      <ViewMoreButton
        title="View All Branches"
        onPress={() => setActivePopup("BranchDetailsPopUp")}
      />
      {activePopup === "BranchDetailsPopUp" && (
        <ViewBranchDetails open={true} onClose={handleClosePopup} />
      )}
    </Box>
  );
}
