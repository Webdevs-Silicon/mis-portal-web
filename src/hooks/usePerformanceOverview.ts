// import { useEffect, useState } from "react";
// import {
//   getFluidOverview,
//   getLdrOverview,
//   getOverDueOverview,
//   getProfitAndLoss,
//   getWorkingCapitalOverview,
// } from "../api/services/performanceService";
// import type {
//   LDRDetail,
//   OverDueDetail,
//   OverviewItem,
// } from "../api/services/performanceService";

// interface PerformanceOverviewState {
//   profitNLoss: OverviewItem[];
//   fluid: OverviewItem[];
//   workingCapital: OverviewItem[];
//   overDue: OverDueDetail[];
//   ldr: LDRDetail[];
//   loading: boolean;
//   error: string | null;
// }

// export function usePerformanceOverview(): PerformanceOverviewState {
//   const [state, setState] = useState<PerformanceOverviewState>({
//     profitNLoss: [],
//     fluid: [],
//     workingCapital: [],
//     overDue: [],
//     ldr: [],
//     loading: true,
//     error: null,
//   });

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [profitRes, fluidRes, workingCapitalRes, overDueRes, ldrRes] =
//           await Promise.all([
//             getProfitAndLoss(),
//             getFluidOverview(),
//             getWorkingCapitalOverview(),
//             getOverDueOverview(),
//             getLdrOverview(),
//           ]);

//         setState({
//           profitNLoss: profitRes.ProfitAndLoss ?? [],
//           fluid: fluidRes.FluidDetails ?? [],
//           workingCapital: workingCapitalRes.WorkingCapital ?? [],
//           overDue: overDueRes.OverDueDetails ?? [],
//           ldr: ldrRes.LDRDetails ?? [],
//           loading: false,
//           error: null,
//         });
//       } catch (err) {
//         setState((prev) => ({
//           ...prev,
//           loading: false,
//           error: "Failed to load performance overview",
//         }));
//       }
//     };

//     fetchAll();
//   }, []);

//   return state;
// }
import { useEffect, useState } from "react";
import {
  getFluidOverview,
  getLdrOverview,
  getOverDueOverview,
  getProfitAndLoss,
  getWorkingCapitalOverview,
} from "../api/services/performanceService";
import type {
  LDRDetail,
  OverDueDetail,
  OverviewItem,
} from "../api/services/performanceService";

interface PerformanceOverviewState {
  profitNLoss: OverviewItem[];
  fluid: OverviewItem[];
  workingCapital: OverviewItem[];
  overDue: OverDueDetail[];
  ldr: LDRDetail[];
  loading: boolean;
  error: string | null;
}

export function usePerformanceOverview(): PerformanceOverviewState {
  const [state, setState] = useState<PerformanceOverviewState>({
    profitNLoss: [],
    fluid: [],
    workingCapital: [],
    overDue: [],
    ldr: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchInOrder = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        // 1️⃣ Profit & Loss
        const pnlRes = await getProfitAndLoss();

        // 2️⃣ Fluid Overview
        const fluidRes = await getFluidOverview();

        // 3️⃣ Working Capital
        const wcRes = await getWorkingCapitalOverview();

        // 4️⃣ Over Due
        const odRes = await getOverDueOverview();

        // 5️⃣ LDR
        const ldrRes = await getLdrOverview();

        setState({
          profitNLoss: pnlRes.ProfitAndLoss ?? [],
          fluid: fluidRes.FluidDetails ?? [],
          workingCapital: wcRes.WorkingCapital ?? [],
          overDue: odRes.OverDueDetails ?? [],
          ldr: ldrRes.LDRDetails ?? [],
          loading: false,
          error: null,
        });

      } catch (err) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to load performance overview",
        }));
      }
    };

    fetchInOrder();
  }, []);

  return state;
}
