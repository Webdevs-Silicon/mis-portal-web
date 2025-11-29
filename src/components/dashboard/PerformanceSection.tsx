import { Box, Skeleton, Alert } from "@mui/material";
import InfoCard from "../InfoCard";
import FluidIcon from "../../assets/icons/fluidIcon.svg?react";
import CalendarIcon from "../../assets/icons/calendarIcon.svg?react";
import ValetIcon from "../../assets/icons/valetIcon.svg?react";
import PercentIcon from "../../assets/icons/percentIcon.svg?react";
import ViewMoreButton from "../ViewMoreButton";
import { useState } from "react";
import PerformancePopUp from "../popup/PerformancePopUp";
import type {
  LDRDetail,
  OverDueDetail,
  OverviewItem,
} from "../../api/services/performanceService";
import InfoCardSkeleton from "../skeleton/InfoCardSkeleton";

interface PerformanceSectionProps {
  fluidData: OverviewItem[];
  workingCapitalData: OverviewItem[];
  overDueData: OverDueDetail[];
  ldrData: LDRDetail[];
  loading: boolean;
  error: string | null;
}

function extractAmounts<T extends { Amount?: number }>(data: T[]) {
  return data.map((item) => item.Amount ?? 0);
}

export default function PerformanceSection({
  fluidData,
  workingCapitalData,
  overDueData,
  ldrData,
  loading = true,
  error,
}: PerformanceSectionProps) {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error || "Failed to load performance data."}
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box>
        <InfoCardSkeleton rows={2} />

        <Skeleton
          variant="rounded"
          height={45}
          width="100%"
          sx={{ borderRadius: 2, mt: 2 }}
        />
      </Box>
    );
  }

  const fluidAmounts = extractAmounts(fluidData);
  const wcAmounts = extractAmounts(workingCapitalData);

  const overduePercentages = overDueData.map((d) => d.ODPercentage);
  const ldrPercentages = ldrData.map((d) => d.LDRPercentage);

  const fluidChange = fluidData.map((d) => d.Percentage ?? 0);
  const workingCapitalChange = workingCapitalData.map((d) => d.Percentage ?? 0);
  const overdueChange = overDueData.map((d) => d.Percentage ?? 0);
  const ldrChange = ldrData.map((d) => d.Percentage ?? 0);

  const latestFluid = fluidData.at(-1)?.Amount ?? 0;
  const latestWC = workingCapitalData.at(-1)?.Amount ?? 0;
  const latestOverdue = overDueData.at(-1)?.ODPercentage ?? 0;
  const latestLDR = ldrData.at(-1)?.LDRPercentage ?? 0;

  const handleClosePopup = () => setActivePopup(null);

  return (
    <Box sx={{ marginBottom: 2 }}>
      {/* Row 1 */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <InfoCard
          data={{
            title: "Fluid Resources",
            value: latestFluid,
            valueType: "currency",
            change: fluidChange,
            icon: <FluidIcon />,
            showBarGraph: true,
            barValues: fluidAmounts,
            primaryAccentColor: "#6DC1FF",
            secondaryAccentColor: "#6dc2ff36",
          }}
        />

        <InfoCard
          data={{
            title: "Working Capital",
            value: latestWC,
            valueType: "currency",
            change: workingCapitalChange,
            icon: <CalendarIcon />,
            showBarGraph: true,
            barValues: wcAmounts,
            primaryAccentColor: "#BD8BFD",
            secondaryAccentColor: "#bc8bfd3d",
          }}
        />
      </Box>

      {/* Row 2 */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <InfoCard
          data={{
            title: "Overdue %",
            value: latestOverdue,
            valueType: "percentage",
            change: overdueChange,
            icon: <ValetIcon />,
            showBarGraph: true,
            barValues: overduePercentages,
            primaryAccentColor: "#FDB176",
            secondaryAccentColor: "#fdb07633",
          }}
        />

        <InfoCard
          data={{
            title: "LDR %",
            value: latestLDR,
            valueType: "percentage",
            change: ldrChange,
            icon: <PercentIcon />,
            showBarGraph: true,
            barValues: ldrPercentages,
            primaryAccentColor: "#f7ed65ff",
            secondaryAccentColor: "#f7ed6550",
          }}
        />
      </Box>

      <ViewMoreButton
        title="View Performance Details"
        onPress={() => setActivePopup("PerformancePopUp")}
      />

      {activePopup === "PerformancePopUp" && (
        <PerformancePopUp open={true} onClose={handleClosePopup} />
      )}
    </Box>
  );
}
