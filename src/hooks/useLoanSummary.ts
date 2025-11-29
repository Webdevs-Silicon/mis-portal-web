import { useEffect, useState } from "react";
import {
  getLoanSummary,
  type GetLoanSummaryResponse,
} from "../api/services/loanService";

export interface LoanClassDashboardItem {
  label: string;
  amount: number;
  percent: number;
  percentage: number;
}

export interface LoanSummaryItem {
  Total: string;
  Percentage: number;
  Int: number;
  IntPercentage: number;
}

export function useLoanSummary() {
  const [loanSummaryLoading, setLoanSummaryLoading] = useState(true);
  const [loanSummaryError, setLoanSummaryError] = useState<string | null>(null);
  const [data, setData] = useState<GetLoanSummaryResponse | null>(null);
  const [classificationData, setClassificationData] = useState<
    LoanClassDashboardItem[]
  >([]);
  const [loanSummaryData, setLoanSummaryData] =
    useState<LoanSummaryItem | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        setLoanSummaryLoading(true);

        const response = await getLoanSummary();
        setData(response);

        const loanClass = response.LoanClass;

        setLoanSummaryData(loanClass.Main);

        // Dynamic extraction of all keys except "Main"
        const formatted: LoanClassDashboardItem[] = Object.entries(loanClass)
          .filter(([key]) => key !== "Main" || "main") // skip "Main"
          .map(([key, value]) => ({
            label: value.TypeName ?? key, // use TypeName if exists
            amount: value.Amount ?? 0,
            percent: value.Percent ?? 0,
            percentage: value.Percentage ?? 0,
          }));

        setClassificationData(formatted);
      } catch (err: any) {
        setLoanSummaryError(err.message || "Something went wrong");
      } finally {
        setLoanSummaryLoading(false);
      }
    }

    fetchSummary();
  }, []);

  return {
    loanSummaryLoading,
    loanSummaryError,
    data,
    loanSummaryData,
    classificationData,
  };
}
