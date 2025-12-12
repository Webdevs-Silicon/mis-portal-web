// // hooks/useDashboardData.ts
// import { useState, useEffect } from "react";
// import { loginDetails,type LoginResponse } from "../api/services/authService";
// import {
//   getProfitAndLoss,
//   getFluidOverview,
//   getWorkingCapitalOverview,
//   getOverDueOverview,
//   getLdrOverview,
//   type GetPerformanceOverviewResponse,
//   type GetFluidOverviewResponse,
//   type GetWorkingCapitalOverviewResponse,
//   type GetOverdueOverviewResponse,
//   type GetLDROverviewResponse,
// } from "../api/services/performanceService";
// import {
//   getLoanSummary,
//   type GetLoanSummaryResponse,
// } from "../api/services/loanService";
// import {
//   getDepositSummary,
//   type GetDepositSummaryResponse,
// } from "../api/services/depositService";

// // Interface for profile data
// interface ProfileData {
//   name: string;
//   photo: string;
//   lastLogin: string;
// }

// // Interface for loan data
// interface LoanDashboardData {
//   loanSummaryData: {
//     Total: string;
//     Percentage: number;
//     Int: number;
//     IntPercentage: number;
//   } | null;
//   classificationData: Array<{
//     label: string;
//     amount: number;
//     percent: number;
//     percentage: number;
//   }>;
// }

// // Interface for deposit data
// interface DepositDashboardData {
//   depositSummaryData: {
//     Total: string;
//     Percentage: number;
//     Int: number;
//     IntPercentage: number;
//   } | null;
//   depositClassificationData: Array<{
//     label: string;
//     amount: number;
//     percent: number;
//     percentage: number;
//   }>;
// }

// // Main dashboard data interface
// interface DashboardData {
//   // Profile
//   profile: ProfileData;
  
//   // Performance Overview
//   profitNLoss: Array<{
//     Date: string;
//     Amount: number;
//     Percentage: number;
//   }>;
//   fluid: Array<{
//     Date: string;
//     Amount: number;
//     Percentage: number;
//   }>;
//   workingCapital: Array<{
//     Date: string;
//     Amount: number;
//     Percentage: number;
//   }>;
//   overDue: Array<{
//     Date: string;
//     ODPercentage: number;
//     Percentage: number;
//   }>;
//   ldr: Array<{
//     Date: string;
//     LDRPercentage: number;
//     Percentage: number;
//   }>;
  
//   // Loans
//   loanData: LoanDashboardData;
  
//   // Deposits
//   depositData: DepositDashboardData;
  
//   // Loading states
//   loading: boolean;
//   error: string | null;
  
//   // Optional: Progress tracking
//   progress: number;
// }

// // Helper function for delays between API calls
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// export function useDashboardData(): DashboardData {
//   const [data, setData] = useState<DashboardData>({
//     profile: {
//       name: "",
//       photo: "",
//       lastLogin: "",
//     },
//     profitNLoss: [],
//     fluid: [],
//     workingCapital: [],
//     overDue: [],
//     ldr: [],
//     loanData: {
//       loanSummaryData: null,
//       classificationData: [],
//     },
//     depositData: {
//       depositSummaryData: null,
//       depositClassificationData: [],
//     },
//     loading: true,
//     error: null,
//     progress: 0,
//   });

//   useEffect(() => {
//     let isMounted = true;
    
//     const fetchAllDataSequentially = async () => {
//       try {
//         console.group("🚀 Dashboard Data Fetch Sequence");
        
//         // Reset state
//         if (isMounted) {
//           setData(prev => ({ ...prev, loading: true, error: null, progress: 0 }));
//         }

//         const totalSteps = 8; // Total API calls we'll make
//         let currentStep = 0;
        
//         const updateProgress = () => {
//           currentStep++;
//           const progress = Math.round((currentStep / totalSteps) * 100);
//           if (isMounted) {
//             setData(prev => ({ ...prev, progress }));
//           }
//         };

//         // 1️⃣ PROFILE DATA (First - establishes session)
//         console.log("1. Fetching profile...");
//         const profileResponse = await loginDetails();
//         updateProgress();
        
//         if (!isMounted) return;
        
//         const profileData: ProfileData = {
//           name: profileResponse.DirectorDetails[0]?.Name ?? "",
//           photo: profileResponse.DirectorDetails[1]?.Photo ?? "",
//           lastLogin: profileResponse.DirectorDetails[2]?.Date ?? "",
//         };
        
//         setData(prev => ({
//           ...prev,
//           profile: profileData,
//         }));
//         console.log("✅ Profile loaded");
        
//         // Small delay to ensure token is updated in interceptor
//         await delay(100);

//         // 2️⃣ PROFIT & LOSS
//         console.log("2. Fetching Profit & Loss...");
//         const pnlResponse = await getProfitAndLoss();
//         updateProgress();
        
//         if (!isMounted) return;
        
//         setData(prev => ({
//           ...prev,
//           profitNLoss: pnlResponse.ProfitAndLoss ?? [],
//         }));
//         console.log("✅ Profit & Loss loaded");
//         await delay(100);

//         // 3️⃣ FLUID OVERVIEW
//         console.log("3. Fetching Fluid Overview...");
//         const fluidResponse = await getFluidOverview();
//         updateProgress();
        
//         if (!isMounted) return;
        
//         setData(prev => ({
//           ...prev,
//           fluid: fluidResponse.FluidDetails ?? [],
//         }));
//         console.log("✅ Fluid Overview loaded");
//         await delay(100);

//         // 4️⃣ WORKING CAPITAL
//         console.log("4. Fetching Working Capital...");
//         const wcResponse = await getWorkingCapitalOverview();
//         updateProgress();
        
//         if (!isMounted) return;
        
//         setData(prev => ({
//           ...prev,
//           workingCapital: wcResponse.WorkingCapital ?? [],
//         }));
//         console.log("✅ Working Capital loaded");
//         await delay(100);

//         // 5️⃣ OVERDUE
//         console.log("5. Fetching Overdue...");
//         const odResponse = await getOverDueOverview();
//         updateProgress();
        
//         if (!isMounted) return;
        
//         setData(prev => ({
//           ...prev,
//           overDue: odResponse.OverDueDetails ?? [],
//         }));
//         console.log("✅ Overdue loaded");
//         await delay(100);

//         // 6️⃣ LDR
//         console.log("6. Fetching LDR...");
//         const ldrResponse = await getLdrOverview();
//         updateProgress();
        
//         if (!isMounted) return;
        
//         setData(prev => ({
//           ...prev,
//           ldr: ldrResponse.LDRDetails ?? [],
//         }));
//         console.log("✅ LDR loaded");
//         await delay(100);

//         // 7️⃣ LOAN SUMMARY
//         console.log("7. Fetching Loan Summary...");
//         const loanResponse = await getLoanSummary();
//         updateProgress();
        
//         if (!isMounted) return;
        
//         const loanClass = loanResponse.LoanClass;
//         const loanClassificationData = Object.entries(loanClass)
//           .filter(([key]) => key !== "Main")
//           .map(([key, value]: [string, any]) => ({
//             label: value.TypeName ?? key,
//             amount: value.Amount ?? 0,
//             percent: value.Percent ?? 0,
//             percentage: value.Percentage ?? 0,
//           }));
        
//         setData(prev => ({
//           ...prev,
//           loanData: {
//             loanSummaryData: loanClass.Main,
//             classificationData: loanClassificationData,
//           },
//         }));
//         console.log("✅ Loan Summary loaded");
//         await delay(100);

//         // 8️⃣ DEPOSIT SUMMARY
//         console.log("8. Fetching Deposit Summary...");
//         const depositResponse = await getDepositSummary();
//         updateProgress();
        
//         if (!isMounted) return;
        
//         const depositClass = depositResponse.DepositClass;
//         const depositClassificationData = Object.entries(depositClass)
//           .filter(([key]) => key !== "Main")
//           .map(([key, value]: [string, any]) => ({
//             label: value.TypeName ?? key,
//             amount: value.Amount ?? 0,
//             percent: value.Percent ?? 0,
//             percentage: value.Percentage ?? 0,
//           }));
        
//         setData(prev => ({
//           ...prev,
//           depositData: {
//             depositSummaryData: depositClass.Main,
//             depositClassificationData: depositClassificationData,
//           },
//           loading: false,
//         }));
//         console.log("✅ Deposit Summary loaded");

//         console.log("🎉 All dashboard data loaded successfully!");
//         console.groupEnd();

//       } catch (error: any) {
//         console.error("❌ Error in dashboard data fetch:", error);
        
//         if (isMounted) {
//           setData(prev => ({
//             ...prev,
//             loading: false,
//             error: error.message || "Failed to load dashboard data",
//           }));
//         }
//       }
//     };

//     fetchAllDataSequentially();

//     // Cleanup function
//     return () => {
//       isMounted = false;
//       console.log("🔄 Dashboard data fetch cancelled (component unmounted)");
//     };
//   }, []);

//   return data;
// }
// hooks/useDashboardData.ts
import { useState, useEffect } from "react";
import { loginDetails,type LoginResponse } from "../api/services/authService";
import {
  getProfitAndLoss,
  getFluidOverview,
  getWorkingCapitalOverview,
  getOverDueOverview,
  getLdrOverview,
  type GetPerformanceOverviewResponse,
  type GetFluidOverviewResponse,
  type GetWorkingCapitalOverviewResponse,
  type GetOverdueOverviewResponse,
  type GetLDROverviewResponse,
} from "../api/services/performanceService";
import {
  getLoanSummary,
  type GetLoanSummaryResponse,
} from "../api/services/loanService";
import {
  getDepositSummary,
  type GetDepositSummaryResponse,
} from "../api/services/depositService";
import {
  getAssetSummary,
  type GetAssetSummaryResponse,
} from "../api/services/assetService";
import {
  getMemberDetails,
  type GetMemberResponse,
} from "../api/services/memberService";
import {
  getBorrowSummary,
  type GetBorrowSummaryResponse,
} from "../api/services/borrowService";
import {
  getBranchDetails,
  type GetBranchDetailsResponse,
} from "../api/services/branchService";
import {
  getDefaulterSummary,
  type GetTopDefaulterSummaryResponse,
} from "../api/services/defaultersService";
import {
  getLatestEvent,
  type GetLatestEventResponse,
} from "../api/services/eventService";

// ===========================
// INTERFACES
// ===========================

interface ProfileData {
  name: string;
  photo: string;
  lastLogin: string;
}

interface PerformanceData {
  profitNLoss: Array<{ Date: string; Amount: number; Percentage: number }>;
  fluid: Array<{ Date: string; Amount: number; Percentage: number }>;
  workingCapital: Array<{ Date: string; Amount: number; Percentage: number }>;
  overDue: Array<{ Date: string; ODPercentage: number; Percentage: number }>;
  ldr: Array<{ Date: string; LDRPercentage: number; Percentage: number }>;
}

interface LoanDashboardData {
  loanSummaryData: {
    Total: string;
    Percentage: number;
    Int: number;
    IntPercentage: number;
  } | null;
  classificationData: Array<{
    label: string;
    amount: number;
    percent: number;
    percentage: number;
  }>;
}

interface DepositDashboardData {
  depositSummaryData: {
    Total: string;
    Percentage: number;
    Int: number;
    IntPercentage: number;
  } | null;
  depositClassificationData: Array<{
    label: string;
    amount: number;
    percent: number;
    percentage: number;
  }>;
}

interface AssetDashboardData {
  assetSummaryData: {
    Total: string;
    Percentage: number;
    Int: number;
    IntPercentage: number;
  } | null;
  assetClassificationData: Array<{
    label: string;
    balance: number;
    percentage: number;
    yesterdayPercentage: number;
  }>;
}

interface MemberDashboardData {
  memberSummaryData: {
    Total: number;
    Percentage: number;
    Balance: number;
    BalPercentage: number;
  } | null;
  memberClassificationData: Array<{
    label: string;
    percentage: number;
    memberCount: number;
    shareBalance: number;
  }>;
}

interface BorrowingDashboardData {
  borrowData: {
    Total: string;
    Percentage: number;
    Int: number;
    IntPercentage: number;
  } | null;
}

interface BranchDefaulterData {
  branchData: {
    Branch: string;
    Staff: number;
  } | null;
  defaulterSummary: {
    Balance: string;
    Percentage: number;
  } | null;
}

interface EventDashboardData {
  eventData: {
    ScheduleDate: string;
    Heading: string;
    Subject: string;
    Time: string;
    Duration: string;
    Address: string;
  } | null;
}

interface DashboardData {
  // Profile
  profile: ProfileData;
  
  // Performance
  performance: PerformanceData;
  
  // Loans
  loans: LoanDashboardData;
  
  // Deposits
  deposits: DepositDashboardData;
  
  // Assets
  assets: AssetDashboardData;
  
  // Members
  members: MemberDashboardData;
  
  // Borrowings
  borrowings: BorrowingDashboardData;
  
  // Branch & Defaulter
  branchDefaulter: BranchDefaulterData;
  
  // Events
  events: EventDashboardData;
  
  // Loading states
  loading: boolean;
  error: string | null;
  progress: number;
}

// ===========================
// HELPER FUNCTIONS
// ===========================

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const updateProgress = (current: number, total: number) => {
  return Math.round((current / total) * 100);
};

// ===========================
// MAIN HOOK
// ===========================

export function useDashboardData(): DashboardData {
  const [data, setData] = useState<DashboardData>({
    profile: { name: '', photo: '', lastLogin: '' },
    performance: {
      profitNLoss: [],
      fluid: [],
      workingCapital: [],
      overDue: [],
      ldr: [],
    },
    loans: {
      loanSummaryData: null,
      classificationData: [],
    },
    deposits: {
      depositSummaryData: null,
      depositClassificationData: [],
    },
    assets: {
      assetSummaryData: null,
      assetClassificationData: [],
    },
    members: {
      memberSummaryData: null,
      memberClassificationData: [],
    },
    borrowings: {
      borrowData: null,
    },
    branchDefaulter: {
      branchData: null,
      defaulterSummary: null,
    },
    events: {
      eventData: null,
    },
    loading: true,
    error: null,
    progress: 0,
  });

  useEffect(() => {
    let isMounted = true;
    let currentStep = 0;
    const totalSteps = 14; // Total API calls
    
    const fetchAllDataSequentially = async () => {
      try {
        console.group("🚀 Dashboard Data Fetch Sequence");
        
        // Reset state
        if (isMounted) {
          setData(prev => ({ ...prev, loading: true, error: null, progress: 0 }));
        }

        // 1️⃣ PROFILE DATA
        console.log(`${++currentStep}. Fetching profile...`);
        const profileResponse = await loginDetails();
        if (!isMounted) return;
        
        const profileData: ProfileData = {
          name: profileResponse.DirectorDetails[0]?.Name ?? "",
          photo: profileResponse.DirectorDetails[1]?.Photo ?? "",
          lastLogin: profileResponse.DirectorDetails[2]?.Date ?? "",
        };
        
        setData(prev => ({
          ...prev,
          profile: profileData,
          progress: updateProgress(currentStep, totalSteps),
        }));
        console.log("✅ Profile loaded");
        await delay(100);

        // 2️⃣ PROFIT & LOSS
        console.log(`${++currentStep}. Fetching Profit & Loss...`);
        const pnlResponse = await getProfitAndLoss();
        if (!isMounted) return;
        
        setData(prev => ({
          ...prev,
          performance: {
            ...prev.performance,
            profitNLoss: pnlResponse.ProfitAndLoss ?? [],
          },
          progress: updateProgress(currentStep, totalSteps),
        }));
        console.log("✅ Profit & Loss loaded");
        await delay(100);

        // 3️⃣ FLUID OVERVIEW
        console.log(`${++currentStep}. Fetching Fluid Overview...`);
        const fluidResponse = await getFluidOverview();
        if (!isMounted) return;
        
        setData(prev => ({
          ...prev,
          performance: {
            ...prev.performance,
            fluid: fluidResponse.FluidDetails ?? [],
          },
          progress: updateProgress(currentStep, totalSteps),
        }));
        console.log("✅ Fluid Overview loaded");
        await delay(100);

        // 4️⃣ WORKING CAPITAL
        console.log(`${++currentStep}. Fetching Working Capital...`);
        const wcResponse = await getWorkingCapitalOverview();
        if (!isMounted) return;
        
        setData(prev => ({
          ...prev,
          performance: {
            ...prev.performance,
            workingCapital: wcResponse.WorkingCapital ?? [],
          },
          progress: updateProgress(currentStep, totalSteps),
        }));
        console.log("✅ Working Capital loaded");
        await delay(100);

        // 5️⃣ OVERDUE
        console.log(`${++currentStep}. Fetching Overdue...`);
        const odResponse = await getOverDueOverview();
        if (!isMounted) return;
        
        setData(prev => ({
          ...prev,
          performance: {
            ...prev.performance,
            overDue: odResponse.OverDueDetails ?? [],
          },
          progress: updateProgress(currentStep, totalSteps),
        }));
        console.log("✅ Overdue loaded");
        await delay(100);

        // 6️⃣ LDR
        console.log(`${++currentStep}. Fetching LDR...`);
        const ldrResponse = await getLdrOverview();
        if (!isMounted) return;
        
        setData(prev => ({
          ...prev,
          performance: {
            ...prev.performance,
            ldr: ldrResponse.LDRDetails ?? [],
          },
          progress: updateProgress(currentStep, totalSteps),
        }));
        console.log("✅ LDR loaded");
        await delay(100);

        // 7️⃣ LOAN SUMMARY
        console.log(`${++currentStep}. Fetching Loan Summary...`);
        const loanResponse = await getLoanSummary();
        if (!isMounted) return;
        
        const loanClass = loanResponse.LoanClass;
        const loanClassificationData = Object.entries(loanClass)
          .filter(([key]) => key !== "Main")
          .map(([key, value]: [string, any]) => ({
            label: value.TypeName ?? key,
            amount: value.Amount ?? 0,
            percent: value.Percent ?? 0,
            percentage: value.Percentage ?? 0,
          }));
        
        setData(prev => ({
          ...prev,
          loans: {
            loanSummaryData: loanClass.Main,
            classificationData: loanClassificationData,
          },
          progress: updateProgress(currentStep, totalSteps),
        }));
        console.log("✅ Loan Summary loaded");
        await delay(100);

        // 8️⃣ DEPOSIT SUMMARY
        console.log(`${++currentStep}. Fetching Deposit Summary...`);
        const depositResponse = await getDepositSummary();
        if (!isMounted) return;
        
        const depositClass = depositResponse.DepositClass;
        const depositClassificationData = Object.entries(depositClass)
          .filter(([key]) => key !== "Main")
          .map(([key, value]: [string, any]) => ({
            label: value.TypeName ?? key,
            amount: value.Amount ?? 0,
            percent: value.Percent ?? 0,
            percentage: value.Percentage ?? 0,
          }));
        
        setData(prev => ({
          ...prev,
          deposits: {
            depositSummaryData: depositClass.Main,
            depositClassificationData: depositClassificationData,
          },
          progress: updateProgress(currentStep, totalSteps),
        }));
        console.log("✅ Deposit Summary loaded");
        await delay(100);

        // 9️⃣ ASSET SUMMARY
        console.log(`${++currentStep}. Fetching Asset Summary...`);
        const assetResponse = await getAssetSummary();
        if (!isMounted) return;
        
        const assetClass = assetResponse.Asset;
        const assetClassificationData = Object.entries(assetClass)
          .filter(([key]) => key !== "Main")
          .map(([key, value]: [string, any]) => ({
            label: value.TypeName ?? key,
            balance: value.Balance ?? 0,
            percentage: value.Percentage ?? 0,
            yesterdayPercentage: value.YesterdayPer ?? 0,
          }));
        
        setData(prev => ({
          ...prev,
          assets: {
            assetSummaryData: assetClass.Main,
            assetClassificationData: assetClassificationData,
          },
          progress: updateProgress(currentStep, totalSteps),
        }));
        console.log("✅ Asset Summary loaded");
        await delay(100);

        // 🔟 MEMBER DETAILS
        console.log(`${++currentStep}. Fetching Member Details...`);
        const memberResponse = await getMemberDetails();
        if (!isMounted) return;
        
        const memberDetails = memberResponse.MemberDetails;
        const memberClassificationData = Object.entries(memberDetails)
          .filter(([key]) => key !== "Main")
          .map(([, value]: [string, any]) => ({
            label: value.Class,
            percentage: value.ClassPercentage,
            memberCount: value.MemberCount,
            shareBalance: value.ShareBal,
          }));
        
        setData(prev => ({
          ...prev,
          members: {
            memberSummaryData: memberDetails.Main,
            memberClassificationData: memberClassificationData,
          },
          progress: updateProgress(currentStep, totalSteps),
        }));
        console.log("✅ Member Details loaded");
        await delay(100);

        // 1️⃣1️⃣ BORROW SUMMARY
        console.log(`${++currentStep}. Fetching Borrow Summary...`);
        const borrowResponse = await getBorrowSummary();
        if (!isMounted) return;
        
        setData(prev => ({
          ...prev,
          borrowings: {
            borrowData: borrowResponse.Borrowings.Main,
          },
          progress: updateProgress(currentStep, totalSteps),
        }));
        console.log("✅ Borrow Summary loaded");
        await delay(100);

        // 1️⃣2️⃣ BRANCH DETAILS
        console.log(`${++currentStep}. Fetching Branch Details...`);
        const branchResponse = await getBranchDetails();
        if (!isMounted) return;
        
        setData(prev => ({
          ...prev,
          branchDefaulter: {
            ...prev.branchDefaulter,
            branchData: branchResponse.BranchNStaff,
          },
          progress: updateProgress(currentStep, totalSteps),
        }));
        console.log("✅ Branch Details loaded");
        await delay(100);

        // 1️⃣3️⃣ DEFAULTER SUMMARY
        console.log(`${++currentStep}. Fetching Defaulter Summary...`);
        const defaulterResponse = await getDefaulterSummary();
        if (!isMounted) return;
        
        setData(prev => ({
          ...prev,
          branchDefaulter: {
            ...prev.branchDefaulter,
            defaulterSummary: defaulterResponse.TopDefaulters,
          },
          progress: updateProgress(currentStep, totalSteps),
        }));
        console.log("✅ Defaulter Summary loaded");
        await delay(100);

        // 1️⃣4️⃣ LATEST EVENT
        console.log(`${++currentStep}. Fetching Latest Event...`);
        const eventResponse = await getLatestEvent();
        if (!isMounted) return;
        
        setData(prev => ({
          ...prev,
          events: {
            eventData: eventResponse.LatestEvent,
          },
          loading: false,
          progress: 100,
        }));
        console.log("✅ Latest Event loaded");

        console.log("🎉 All dashboard data loaded successfully!");
        console.groupEnd();

      } catch (error: any) {
        console.error("❌ Error in dashboard data fetch:", error);
        
        if (isMounted) {
          setData(prev => ({
            ...prev,
            loading: false,
            error: error.message || "Failed to load dashboard data",
          }));
        }
      }
    };

    fetchAllDataSequentially();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  return data;
}