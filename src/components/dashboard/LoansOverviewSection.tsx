import { Box, Typography } from "@mui/material";
import { colors, sizes } from "../../theme/theme";
import StackIcon from "../../assets/icons/stackIcon.svg?react";
import InterestIcon from "../../assets/icons/interestIcon.svg?react";
import InfoCard from "../InfoCard";
import DonutChart from "../DonutChart";
import ChartTable from "../ChartTable";
import type { Column } from "../ChartTable";
import ViewMoreButton from "../ViewMoreButton";
import { useState } from "react";
import LoanDetailsPopup from "../popup/LoanDetailsPopup";

export default function LoansOverviewSection() {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const donutData = [
    { label: "Standard", value: 245.5, color: "#6DC1FF" },
    { label: "Substandard", value: 68.3, color: "#ECCE49" },
    { label: "Doubtful", value: 32.1, color: "#FDB176" },
    { label: "Bad", value: 14.2, color: "#BD8BFD" },
  ];

  const columns: Column[] = [
    { key: "label", type: "label" },
    { key: "amount", type: "text", align: "right" },
    { key: "change", type: "chip", align: "right" },
  ];

  const chartTableData = [
    {
      label: "Standard",
      percentage: "68%",
      amount: "₹ 245.5L",
      change: 6.8,
      color: "#6DC1FF",
    },
    {
      label: "Substandard",
      percentage: "19%",
      amount: "₹ 68.3L",
      change: -0.3,
      color: "#ECCE49",
    },
    {
      label: "Doubtful",
      percentage: "9%",
      amount: "₹ 32.1L",
      change: 6.8,
      color: "#FDB176",
    },
    {
      label: "Bad",
      percentage: "4%",
      amount: "₹ 14.2L",
      change: -0.5,
      color: "#BD8BFD",
    },
  ];

  const handleClosePopup = () => setActivePopup(null);

  return (
    <Box>
      <Typography
        sx={{
          fontSize: sizes.medimLarge,
          fontWeight: 600,
          mb: 2,
        }}
      >
        Loans Overview
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <InfoCard
          data={{
            title: "Total Loans",
            value: 360.1,
            valueType: "currency",
            change: [6.8],
            icon: <StackIcon />,
            showBarGraph: false,
            primaryAccentColor: "#BD8BFD",
            secondaryAccentColor: "#bc8bfd3d",
          }}
        />
        <InfoCard
          data={{
            title: "Avg. Interest Rate",
            value: 9.2,
            valueType: "percentage",
            change: [-0.3],
            icon: <InterestIcon />,
            showBarGraph: false,
            primaryAccentColor: "#FDB176",
            secondaryAccentColor: "#fdb07633",
          }}
        />
      </Box>
      <Box marginBottom={2}>
        <Typography
          sx={{
            fontSize: sizes.medium,
            fontWeight: 600,
          }}
        >
          Loan Classification
        </Typography>
        <Typography
          sx={{
            fontSize: sizes.base,
            fontWeight: 600,
            mb: 2,
            color: colors.gray,
          }}
        >
          Distribution by asset quality
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
          <DonutChart data={donutData} />
        </Box>
        <ChartTable
          columns={columns}
          data={chartTableData}
          numberOfRows={chartTableData.length}
        />
      </Box>
      <ViewMoreButton
        title="View Performance Details"
        onPress={() => setActivePopup("LoanDetailsPopUp")}
      />

      {activePopup === "LoanDetailsPopUp" && (
        <LoanDetailsPopup open={true} onClose={handleClosePopup} />
      )}
    </Box>
  );
}
