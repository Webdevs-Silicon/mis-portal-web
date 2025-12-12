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
//   // const { name, photo, lastLogin } = useLoginData();
//   // const { profitNLoss, fluid, workingCapital, overDue, ldr, loading, error } =
//   //   usePerformanceOverview();
//   // const {
//   //   loanSummaryData,
//   //   classificationData,
//   //   loanSummaryLoading,
//   //   loanSummaryError,
//   // } = useLoanSummary();
//   // const {
//   //   depositSummaryData,
//   //   depositClassificationData,
//   //   depositSummaryError,
//   //   depositSummaryLoading,
//   // } = useDepositSummary();
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
//           {/* <ProfileHeader name={name} imageUrl={photo} lastLogin={lastLogin} />
//           <PerformanceOverview profitData={profitNLoss} /> */}
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
//         {/* <PerformanceSection
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
//         /> */}
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

// Dashboard.tsx
import { Box } from "@mui/material";
import LinearGradientBackground from "../../components/LinearGradientBackground";
import ProfileHeader from "../../components/dashboard/ProfileHeader";
import PerformanceOverview from "../../components/dashboard/PerformanceOverview";
import PerformanceSection from "../../components/dashboard/PerformanceSection";
import LoansOverviewSection from "../../components/dashboard/LoansOverviewSection";
import DepositOverviewSection from "../../components/dashboard/DepositOverviewSection";
import AssetOverviewSection from "../../components/dashboard/AssetOverviewSection";
import BorrowingSection from "../../components/dashboard/BorrowingSection";
import MemberOverviewSection from "../../components/dashboard/MemberOverviewSection";
import DefaulterSection from "../../components/dashboard/DefaulterSection";
import BranchDetailsSection from "../../components/dashboard/BranchDetailsSection";
import EventDetailsSection from "../../components/dashboard/EventDetailsSection";
import { DashboardLoader } from "../../components/dashboard/DashboardLoader";
import { useDashboardData } from "../../hooks/useDashboardData";

function Dashboard() {
  const {
    profile,
    performance,
    loans,
    deposits,
    assets,
    members,
    borrowings,
    branchDefaulter,
    events,
    loading,
    error,
    progress,
  } = useDashboardData();

  // Show loader while loading
  if (loading) {
    return <DashboardLoader progress={progress} />;
  }

  // Show error if any
  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ color: '#d32f2f' }}>Unable to load dashboard</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Retry
        </button>
      </Box>
    );
  }

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
          <ProfileHeader 
            name={profile.name} 
            imageUrl={profile.photo} 
            lastLogin={profile.lastLogin} 
          />
          <PerformanceOverview profitData={performance.profitNLoss} />
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
          fluidData={performance.fluid}
          workingCapitalData={performance.workingCapital}
          overDueData={performance.overDue}
          ldrData={performance.ldr}
        />
        
        <LoansOverviewSection
          loanOverviewData={loans.loanSummaryData}
          loanClassificationData={loans.classificationData}
        />
        
        <DepositOverviewSection
          depositOverviewData={deposits.depositSummaryData}
          depositClassificationData={deposits.depositClassificationData}
        />
        
        <AssetOverviewSection
          assetOverviewData={assets.assetSummaryData}
          assetClassificationData={assets.assetClassificationData}
        />
        
        <BorrowingSection
          borrowingOverviewData={borrowings.borrowData}
        />
        
        <MemberOverviewSection
          memberOverviewData={members.memberSummaryData}
          memberClassificationData={members.memberClassificationData}
        />
        
        <DefaulterSection
          defaulterOverviewData={branchDefaulter.defaulterSummary}
        />
        
        <BranchDetailsSection
          branchOverviewData={branchDefaulter.branchData}
        />
        
        <EventDetailsSection
          eventOverviewData={events.eventData}
        />
      </Box>
    </Box>
  );
}

export default Dashboard;
// Dashboard.tsx - Updated
// import { Box, Typography } from "@mui/material";
// import LinearGradientBackground from "../../components/LinearGradientBackground";
// import ProfileHeader from "../../components/dashboard/ProfileHeader";
// import PerformanceOverview from "../../components/dashboard/PerformanceOverview";
// import PerformanceSection from "../../components/dashboard/PerformanceSection";
// import LoansOverviewSection from "../../components/dashboard/LoansOverviewSection";
// import DepositOverviewSection from "../../components/dashboard/DepositOverviewSection";
// import { DashboardLoader } from "../../components/dashboard/DashboardLoader";
// import { useDashboardData } from "../../hooks/useDashboardData";

// function Dashboard() {
//   const {
//     profile,
//     profitNLoss,
//     fluid,
//     workingCapital,
//     overDue,
//     ldr,
//     loanData,
//     depositData,
//     loading,
//     error,
//     progress,
//   } = useDashboardData();

//   // Show loader while loading
//   if (loading) {
//     return <DashboardLoader progress={progress} />;
//   }

//   // Show error if any
//   if (error) {
//     return (
//       <Box sx={{ p: 4, textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//         <Typography variant="h5" color="error" gutterBottom>
//           Unable to load dashboard
//         </Typography>
//         <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//           {error}
//         </Typography>
//         <button 
//           onClick={() => window.location.reload()}
//           style={{
//             padding: '10px 20px',
//             backgroundColor: '#1976d2',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//             fontSize: '16px',
//           }}
//         >
//           Retry
//         </button>
//       </Box>
//     );
//   }

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
//           <ProfileHeader 
//             name={profile.name} 
//             imageUrl={profile.photo} 
//             lastLogin={profile.lastLogin} 
//           />
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
//         />
//         <LoansOverviewSection
//           loanOverviewData={loanData.loanSummaryData}
//           loanClassificationData={loanData.classificationData}
//         />
//         <DepositOverviewSection
//           depositOverviewData={depositData.depositSummaryData}
//           depositClassificationData={depositData.depositClassificationData}
//         />
//       </Box>
//     </Box>
//   );
// }

// export default Dashboard;
// import { Box } from "@mui/material";
// import LinearGradientBackground from "../../components/LinearGradientBackground";
// // import ProfileHeader from "../../components/dashboard/ProfileHeader";
// import PerformanceOverview from "../../components/dashboard/PerformanceOverview";
// import PerformanceSection from "../../components/dashboard/PerformanceSection";
// // import { useLoginData } from "../../hooks/useLoginData";
// import { usePerformanceOverview } from "../../hooks/usePerformanceOverview";

// import Sidebar from "../../components/Sidebar";

// function Dashboard() {
//   // const { name, photo, lastLogin } = useLoginData();
//   const { profitNLoss, fluid, workingCapital, overDue, ldr, loading, error } =
//     usePerformanceOverview();
//     if(!loading){
//       console.log("profitlos",profitNLoss)
//       console.log("fluid",fluid)
//       console.log("workingcap",workingCapital)
//       console.log("overdue",overDue)
//       console.log("ldr",ldr)
//     }


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
//           {/* <ProfileHeader name={name} imageUrl={photo} lastLogin={lastLogin} /> */}
         

//           <PerformanceOverview profitData={profitNLoss} loading={loading}/>
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
//         id="performance-section"
//           fluidData={fluid}
//           workingCapitalData={workingCapital}
//           overDueData={overDue}
//           ldrData={ldr}
//           loading={loading}
//           error={error}
//         />
     
//         <Sidebar />
        
//       </Box>
//     </Box>
//   );
// }

// export default Dashboard;