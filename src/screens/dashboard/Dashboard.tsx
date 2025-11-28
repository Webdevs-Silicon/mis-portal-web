import { Box } from "@mui/material";
import LinearGradientBackground from "../../components/LinearGradientBackground";
import ProfileHeader from "../../components/dashboard/ProfileHeader";
import PerformanceOverview from "../../components/dashboard/PerformanceOverview";
import PerformanceSection from "../../components/dashboard/PerformanceSection";
import { useLoginData } from "../../hooks/useLoginData";
import { usePerformanceOverview } from "../../hooks/usePerformanceOverview";
import LoansOverviewSection from "../../components/dashboard/LoansOverviewSection";
import { useLoanSummary } from "../../hooks/useLoanSummary";

function Dashboard() {
  const { name, photo, lastLogin } = useLoginData();
  const { profitNLoss, fluid, workingCapital, overDue, ldr, loading, error } =
    usePerformanceOverview();
  const {
    classificationData,
    loanSummaryData,
    loanSummaryLoading,
    loanSummaryError,
  } = useLoanSummary();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f5f5f5",
      }}
    >
      {/* TOP GRADIENT */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <LinearGradientBackground
          sx={{
            pt: 2,
            pb: 8,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            mt: "-30px",
          }}
        >
          <ProfileHeader name={name} imageUrl={photo} lastLogin={lastLogin} />
          <PerformanceOverview profitData={profitNLoss} />
        </LinearGradientBackground>
      </Box>

      {/* WHITE CONTENT SECTION */}
      <Box
        sx={{
          flex: 1,
          mt: -7,
          backgroundColor: "#fff",
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          p: 3,
          position: "relative",
          zIndex: 2,
        }}
      >
        <PerformanceSection
          fluidData={fluid}
          workingCapitalData={workingCapital}
          overDueData={overDue}
          ldrData={ldr}
          loading={loading}
          error={error}
        />
        <LoansOverviewSection
          loanOverviewData={loanSummaryData}
          loanClassificationData={classificationData}
          loading={loanSummaryLoading}
          error={loanSummaryError}
        />
      </Box>
    </Box>
  );
}

export default Dashboard;
