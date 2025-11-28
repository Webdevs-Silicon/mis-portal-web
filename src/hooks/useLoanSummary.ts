import { useEffect, useState } from "react";
import {
  getLoanSummary,
  type GetLoanSummaryResponse,
} from "../api/services/loanService";

// Final dashboard format for UI components (table, pie chart, info cards)
export interface LoanClassDashboardItem {
  label: string;
  amount: number;
  percent: number;
  percentage: number; // trend %
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

        const cls = response.LoanClass;

        setLoanSummaryData(response.LoanClass.Main);

        const formatted: LoanClassDashboardItem[] = [
          {
            label: "Standard",
            amount: cls.Standard.Amount,
            percent: cls.Standard.Percent,
            percentage: cls.Standard.Percentage,
          },
          {
            label: "Sub Standard",
            amount: cls.SubStandard.Amount,
            percent: cls.SubStandard.Percent,
            percentage: cls.SubStandard.Percentage,
          },
          {
            label: "Doubtful",
            amount: cls.Doubtful.Amount,
            percent: cls.Doubtful.Percent,
            percentage: cls.Doubtful.Percentage,
          },
          {
            label: "Bad",
            amount: cls.Bad.Amount,
            percent: cls.Bad.Percent,
            percentage: cls.Bad.Percentage,
          },
        ];

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
    data, // raw API response (Header + LoanClass)
    loanSummaryData,
    classificationData, // formatted list for charts and tables
  };
}
