// import { Box } from "@mui/material";
// import LinearGradientBackground from "../../components/LinearGradientBackground";
// import ProfileHeader from "../../components/dashboard/ProfileHeader";
// import PerformanceOverview from "../../components/dashboard/PerformanceOverview";
// import PerformanceSection from "../../components/dashboard/PerformanceSection";
// import { useLoginData } from "../../hooks/useLoginData";
// import { usePerformanceOverview } from "../../hooks/usePerformanceOverview";
// import LoansOverviewSection from "../../components/dashboard/LoansOverviewSection";
// import { useLoanSummary } from "../../hooks/useLoanSummary";
// import { useDepositSummary } from "../../hooks/useDepositSummary";
// import { useAssetSummary } from "../../hooks/useAssetSummary";
// import { useBorrowings } from "../../hooks/useBorrowingSummary";
// import { useBranchNdefaulterSummary } from "../../hooks/useBranchNdefaulterSummary";
// import DepositOverviewSection from "../../components/dashboard/DepositOverviewSection";
// import AssetOverviewSection from "../../components/dashboard/AssetOverviewSection";
// import BorrowingSection from "../../components/dashboard/BorrowingSection";
// import BranchDetailsSection from "../../components/dashboard/BranchDetailsSection";
// import DefaulterSection from "../../components/dashboard/DefaulterSection";
// import { useMemberSummary } from "../../hooks/useMemberSummary";
// import MemberOverviewSection from "../../components/dashboard/MemberOverviewSection";
// import { useLatestEvent } from "../../hooks/useLatestEvent";
// import EventDetailsSection from "../../components/dashboard/EventDetailsSection";

// function Dashboard() {
//   const { name, photo, lastLogin } = useLoginData();
//   const { profitNLoss, fluid, workingCapital, overDue, ldr, loading, error } =
//     usePerformanceOverview();
//   const {
//     loanSummaryData,
//     classificationData,
//     loanSummaryLoading,
//     loanSummaryError,
//   } = useLoanSummary();
//   const {
//     depositSummaryData,
//     depositClassificationData,
//     depositSummaryError,
//     depositSummaryLoading,
//   } = useDepositSummary();
//   const {
//     assetClassificationData,
//     assetSummaryData,
//     assetSummaryError,
//     assetSummaryLoading,
//   } = useAssetSummary();
//   const {
//     memberSummaryData,
//     memberClassificationData,
//     memberSummaryError,
//     memberSummaryLoading,
//   } = useMemberSummary();
//   const { borrowData, borrowLoading, borrowError } = useBorrowings();
//   const { branchData, defaulterSummary, branchError, branchLoading } =
//     useBranchNdefaulterSummary();
//   const { eventData, eventLoading, eventError } = useLatestEvent();

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         bgcolor: "#f5f5f5",
//       }}
//     >
//       {/* TOP GRADIENT */}
//       <Box sx={{ position: "relative", zIndex: 1 }}>
//         <LinearGradientBackground
//           sx={{
//             pt: 2,
//             pb: 8,
//             borderBottomLeftRadius: 0,
//             borderBottomRightRadius: 0,
//             mt: "-30px",
//           }}
//         >
//           <ProfileHeader name={name} imageUrl={photo} lastLogin={lastLogin} />
//           <PerformanceOverview profitData={profitNLoss} />
//         </LinearGradientBackground>
//       </Box>

//       {/* WHITE CONTENT SECTION */}
//       <Box
//         sx={{
//           flex: 1,
//           mt: -7,
//           backgroundColor: "#fff",
//           borderTopLeftRadius: "30px",
//           borderTopRightRadius: "30px",
//           p: 3,
//           position: "relative",
//           zIndex: 2,
//         }}
//       >
//         <PerformanceSection
//           fluidData={fluid}
//           workingCapitalData={workingCapital}
//           overDueData={overDue}
//           ldrData={ldr}
//           loading={loading}
//           error={error}
//         />
//         <LoansOverviewSection
//           loanOverviewData={loanSummaryData}
//           loanClassificationData={classificationData}
//           loading={loanSummaryLoading}
//           error={loanSummaryError}
//         />
//         <DepositOverviewSection
//           depositOverviewData={depositSummaryData}
//           depositClassificationData={depositClassificationData}
//           loading={depositSummaryLoading}
//           error={depositSummaryError}
//         />
//         <AssetOverviewSection
//           assetOverviewData={assetSummaryData}
//           assetClassificationData={assetClassificationData}
//           loading={assetSummaryLoading}
//           error={assetSummaryError}
//         />
//         <BorrowingSection
//           borrowingOverviewData={borrowData}
//           loading={borrowLoading}
//           error={borrowError}
//         />
//         <MemberOverviewSection
//           memberOverviewData={memberSummaryData}
//           memberClassificationData={memberClassificationData}
//           loading={memberSummaryLoading}
//           error={memberSummaryError}
//         />
//         <DefaulterSection
//           defaulterOverviewData={defaulterSummary}
//           loading={branchLoading}
//           error={branchError}
//         />
//         <BranchDetailsSection
//           branchOverviewData={branchData}
//           loading={branchLoading}
//           error={branchError}
//         />
//         <EventDetailsSection
//           eventOverviewData={eventData}
//           loading={eventLoading}
//           error={eventError}
//         />
//       </Box>
//     </Box>
//   );
// }

// export default Dashboard;
import { Box } from "@mui/material";
import LinearGradientBackground from "../../components/LinearGradientBackground";
import ProfileHeader from "../../components/dashboard/ProfileHeader";
import PerformanceOverview from "../../components/dashboard/PerformanceOverview";
import PerformanceSection from "../../components/dashboard/PerformanceSection";
import { useLoginData } from "../../hooks/useLoginData";
import { usePerformanceOverview } from "../../hooks/usePerformanceOverview";
import LoansOverviewSection from "../../components/dashboard/LoansOverviewSection";
import { useLoanSummary } from "../../hooks/useLoanSummary";
import { useDepositSummary } from "../../hooks/useDepositSummary";
import { useAssetSummary } from "../../hooks/useAssetSummary";
import { useBorrowings } from "../../hooks/useBorrowingSummary";
import { useBranchNdefaulterSummary } from "../../hooks/useBranchNdefaulterSummary";
import DepositOverviewSection from "../../components/dashboard/DepositOverviewSection";
import AssetOverviewSection from "../../components/dashboard/AssetOverviewSection";
import BorrowingSection from "../../components/dashboard/BorrowingSection";
import BranchDetailsSection from "../../components/dashboard/BranchDetailsSection";
import DefaulterSection from "../../components/dashboard/DefaulterSection";
import { useMemberSummary } from "../../hooks/useMemberSummary";
import MemberOverviewSection from "../../components/dashboard/MemberOverviewSection";
import { useLatestEvent } from "../../hooks/useLatestEvent";
import EventDetailsSection from "../../components/dashboard/EventDetailsSection";
import Sidebar from "../../components/Sidebar"; // Assuming Sidebar is in the components folder

function Dashboard() {
  const { name, photo, lastLogin } = useLoginData();
  const { profitNLoss, fluid, workingCapital, overDue, ldr, loading, error } =
    usePerformanceOverview();
  const {
    loanSummaryData,
    classificationData,
    loanSummaryLoading,
    loanSummaryError,
  } = useLoanSummary();
  const {
    depositSummaryData,
    depositClassificationData,
    depositSummaryError,
    depositSummaryLoading,
  } = useDepositSummary();
  const {
    assetClassificationData,
    assetSummaryData,
    assetSummaryError,
    assetSummaryLoading,
  } = useAssetSummary();
  const {
    memberSummaryData,
    memberClassificationData,
    memberSummaryError,
    memberSummaryLoading,
  } = useMemberSummary();
  const { borrowData, borrowLoading, borrowError } = useBorrowings();
  const { branchData, defaulterSummary, branchError, branchLoading } =
    useBranchNdefaulterSummary();
  const { eventData, eventLoading, eventError } = useLatestEvent();

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
        id="performance-section"
          fluidData={fluid}
          workingCapitalData={workingCapital}
          overDueData={overDue}
          ldrData={ldr}
          loading={loading}
          error={error}
        />
        <LoansOverviewSection
        id="loans-section"
          loanOverviewData={loanSummaryData}
          loanClassificationData={classificationData}
          loading={loanSummaryLoading}
          error={loanSummaryError}
        />
        <DepositOverviewSection
         id="deposit-section"
          depositOverviewData={depositSummaryData}
          depositClassificationData={depositClassificationData}
          loading={depositSummaryLoading}
          error={depositSummaryError}
        />
        <AssetOverviewSection
        id="cash-investments-section" 
          assetOverviewData={assetSummaryData}
          assetClassificationData={assetClassificationData}
          loading={assetSummaryLoading}
          error={assetSummaryError}
        />
        <BorrowingSection
         id="borrowings-section"
          borrowingOverviewData={borrowData}
          loading={borrowLoading}
          error={borrowError}
        />
        <MemberOverviewSection
        id="members-section"
          memberOverviewData={memberSummaryData}
          memberClassificationData={memberClassificationData}
          loading={memberSummaryLoading}
          error={memberSummaryError}
        />
        <DefaulterSection
        id="defaulters-section"
          defaulterOverviewData={defaulterSummary}
          loading={branchLoading}
          error={branchError}
        />
        <BranchDetailsSection
        id="branch-details-section"
          branchOverviewData={branchData}
          loading={branchLoading}
          error={branchError}
        />
        <EventDetailsSection
        id="upcoming-events-section"
          eventOverviewData={eventData}
          loading={eventLoading}
          error={eventError}
        />

        {/* --- Floating Sidebar Component --- */}
        <Sidebar />
        
      </Box>
    </Box>
  );
}

export default Dashboard;