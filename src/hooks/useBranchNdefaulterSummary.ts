import { useEffect, useState } from "react";
import {
  getBranchDetails,
  type BranchNStaff,
} from "../api/services/branchService";
import {
  getDefaulterSummary,
  type TopDefaulterSummary,
} from "../api/services/defaultersService";

export function useBranchNdefaulterSummary() {
  const [branchData, setBranchData] = useState<BranchNStaff | null>(null);
  const [defaulterSummary, setDefaulterSummary] =
    useState<TopDefaulterSummary | null>(null);
  const [branchLoading, setBranchLoading] = useState(true);
  const [branchError, setBranchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setBranchLoading(true);
        setBranchError(null);

        const [branchRes, defaulterRes] = await Promise.all([
          getBranchDetails(),
          getDefaulterSummary(),
        ]);

        setBranchData(branchRes.BranchNStaff);
        setDefaulterSummary(defaulterRes.TopDefaulters);
      } catch (error) {
        console.error("Branch/Defaulter summary fetch error:", error);
        setBranchError("Failed to load dashboard summary");
      } finally {
        setBranchLoading(false);
      }
    };
    fetchAll();
  }, []);

  return {
    branchData,
    defaulterSummary,
    branchLoading,
    branchError,
  };
}
