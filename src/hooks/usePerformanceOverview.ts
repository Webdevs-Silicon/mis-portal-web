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
    const fetchAll = async () => {
      try {
        const [profitRes, fluidRes, workingCapitalRes, overDueRes, ldrRes] =
          await Promise.all([
            getProfitAndLoss(),
            getFluidOverview(),
            getWorkingCapitalOverview(),
            getOverDueOverview(),
            getLdrOverview(),
          ]);

        setState({
          profitNLoss: profitRes.ProfitAndLoss ?? [],
          fluid: fluidRes.FluidDetails ?? [],
          workingCapital: workingCapitalRes.WorkingCapital ?? [],
          overDue: overDueRes.OverDueDetails ?? [],
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

    fetchAll();
  }, []);

  return state;
}
