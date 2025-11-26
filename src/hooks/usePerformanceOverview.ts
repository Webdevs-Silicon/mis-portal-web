import { useEffect, useState } from "react";
import {
  getFluidOverview,
  getProfitAndLoss,
} from "../api/services/performanceService";
import type { OverviewItem } from "../api/services/performanceService";

interface PerformanceOverviewState {
  profitNLoss: OverviewItem[];
  fluid: OverviewItem[];
  loading: boolean;
  error: string | null;
}

export function usePerformanceOverview(): PerformanceOverviewState {
  const [state, setState] = useState<PerformanceOverviewState>({
    profitNLoss: [],
    fluid: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [profitRes, fluidRes] = await Promise.all([
          getProfitAndLoss(),
          getFluidOverview(),
        ]);

        console.log("fluid res ", fluidRes);

        setState({
          profitNLoss: profitRes.ProfitAndLoss ?? [],
          fluid: fluidRes.FluidDetails ?? [],
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
