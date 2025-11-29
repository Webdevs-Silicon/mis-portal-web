import { Alert, Box, Skeleton, Typography } from "@mui/material";
import { sizes } from "../../theme/theme";
import ValetIcon from "../../assets/icons/valetIcon.svg?react";
import InfoCard from "../InfoCard";
import type { TopDefaulterSummary } from "../../api/services/defaultersService";
import InfoCardSkeleton from "../skeleton/InfoCardSkeleton";
import ViewMoreButton from "../ViewMoreButton";
import { useState } from "react";
import Top10Defaulters from "../popup/Top10Defaulters";

interface DefaulterSectionProps {
  defaulterOverviewData: TopDefaulterSummary | null;
  loading?: boolean;
  error?: string | null;
}

export default function DefaulterSection({
  defaulterOverviewData,
  loading,
  error,
}: DefaulterSectionProps) {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const handleClosePopup = () => setActivePopup(null);

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error || "Failed to load defaulters data."}
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
          fontSize: sizes.medimLarge,
          fontWeight: 600,
          mb: 2,
        }}
      >
        Defaulters List
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2, width: "100%" }}>
        <InfoCard
          data={{
            title: "Total Overdue Amount",
            value: Number(defaulterOverviewData?.Balance) ?? "0",
            valueType: "currency",
            change: [defaulterOverviewData?.Percentage ?? 0],
            icon: <ValetIcon />,
            showBarGraph: false,
            primaryAccentColor: "#FDB176",
            secondaryAccentColor: "#fdb07633",
            width: "100%",
            showTopChip: true,
          }}
        />
      </Box>
      <ViewMoreButton
        title="View Top 10 Defaulters"
        onPress={() => setActivePopup("DefaulterDetailsPopUp")}
      />
      {activePopup === "DefaulterDetailsPopUp" && (
        <Top10Defaulters open={true} onClose={handleClosePopup} />
      )}
    </Box>
  );
}
