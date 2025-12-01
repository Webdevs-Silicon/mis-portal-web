import { Alert, Box, Skeleton, Typography } from "@mui/material";
import { colors, sizes } from "../../theme/theme";
import StackIcon from "../../assets/icons/stackIcon.svg?react";
import InterestIcon from "../../assets/icons/interestIcon.svg?react";
import InfoCard from "../InfoCard";
import DonutChart from "../DonutChart";
import ChartTable from "../ChartTable";
import type { Column } from "../ChartTable";
import ViewMoreButton from "../ViewMoreButton";
import { useState, useMemo } from "react";
import CashInvestmentsDetailsPopup from "../popup/CashInvestmentsDetailsPopup";
import type {
  AssetSummaryItem,
  AssetClassDashboardItem,
} from "../../hooks/useAssetSummary";
import InfoCardSkeleton from "../skeleton/InfoCardSkeleton";

interface AssetOverviewSectionProps {
  assetOverviewData: AssetSummaryItem | null;
  assetClassificationData: AssetClassDashboardItem[];
  loading?: boolean;
  error?: string | null;
}

// Color palette for random assignment
const COLOR_PALETTE = [
  "#6DC1FF",
  "#ECCE49",
  "#FDB176",
  "#BD8BFD",
  "#FF6B9D",
  "#4ECDC4",
  "#95E1D3",
  "#F38181",
  "#AA96DA",
  "#FCBAD3",
];

// Function to get random colors
const getRandomColors = (count: number): string[] => {
  const shuffled = [...COLOR_PALETTE].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export default function AssetOverviewSection({
  assetOverviewData,
  assetClassificationData,
  loading,
  error,
}: AssetOverviewSectionProps) {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const filteredClassification = assetClassificationData.filter(
    (item) => item.label.toLowerCase() !== "main"
  );

  // Generate random colors once and memoize them
  const randomColors = useMemo(
    () => getRandomColors(filteredClassification.length),
    [filteredClassification.length]
  );

  const donutData = filteredClassification.map((item, index) => ({
    label: item.label,
    value: item.percentage,
    color: randomColors[index],
  }));

  const columns: Column[] = [
    { key: "label", type: "label" },
    { key: "amount", type: "text", align: "right" },
    { key: "change", type: "chip", align: "right" },
  ];

  const chartTableData = filteredClassification.map((item, index) => ({
    label: item.label,
    percentage: `${item.percentage}%`,
    amount: item.balance,
    change: item.yesterdayPercentage,
    color: randomColors[index],
  }));

  const handleClosePopup = () => setActivePopup(null);

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error || "Failed to load assets data."}
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
        Cash & Investments
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <InfoCard
          data={{
            title: "Total Assets",
            value: Number(assetOverviewData?.Total) ?? "0",
            valueType: "currency",
            change: [assetOverviewData?.Percentage ?? 0],
            icon: <StackIcon />,
            showBarGraph: false,
            primaryAccentColor: "#BD8BFD",
            secondaryAccentColor: "#bc8bfd3d",
          }}
        />
        <InfoCard
          data={{
            title: "Avg. Interest Rate",
            value: assetOverviewData?.Int ?? 0,
            valueType: "percentage",
            change: [assetOverviewData?.IntPercentage ?? 0],
            icon: <InterestIcon />,
            showBarGraph: false,
            primaryAccentColor: "#FDB176",
            secondaryAccentColor: "#fdb07633",
          }}
        />
      </Box>
      <Box
        marginBottom={2}
        sx={{
          p: 2.5,
          width: "!00%",
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
          border: "1px solid #f0f0f0",
          bgcolor: "#fff",
        }}
      >
        <Typography
          sx={{
            fontSize: sizes.medium,
            fontWeight: 600,
          }}
        >
          Asset Classification
        </Typography>
        <Typography
          sx={{
            fontSize: sizes.base,
            fontWeight: 500,
            mb: 2,
            color: colors.gray,
          }}
        >
          Cash, Bank Balance & Investments
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: 180,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DonutChart
            data={donutData}
            centerValue={assetOverviewData?.Total ?? "0"}
            centerTitle="Total"
          />
        </Box>
        <ChartTable
          columns={columns}
          data={chartTableData}
          numberOfRows={chartTableData.length}
        />
      </Box>
      <ViewMoreButton
        title="View Cash & Investments Details"
        onPress={() => setActivePopup("AssetDetailsPopUp")}
      />
      {activePopup === "AssetDetailsPopUp" && (
        <CashInvestmentsDetailsPopup open={true} onClose={handleClosePopup} />
      )}
    </Box>
  );
}
