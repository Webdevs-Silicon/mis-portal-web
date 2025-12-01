import { useEffect, useState } from "react";
import {
  getDepositSummary,
  type GetDepositSummaryResponse,
} from "../api/services/depositService";

export interface DepositClassDashboardItem {
  label: string;
  amount: number;
  percent: number;
  percentage: number;
}

export interface DepositSummaryItem {
  Total: string;
  Percentage: number;
  Int: number;
  IntPercentage: number;
}

export function useDepositSummary() {
  const [depositSummaryLoading, setDepositSummaryLoading] = useState(true);
  const [depositSummaryError, setDepositSummaryError] = useState<string | null>(
    null
  );
  const [data, setData] = useState<GetDepositSummaryResponse | null>(null);
  const [depositClassificationData, setDepositClassificationData] = useState<
    DepositClassDashboardItem[]
  >([]);
  const [depositSummaryData, setDepositSummaryData] =
    useState<DepositSummaryItem | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        setDepositSummaryLoading(true);

        const response = await getDepositSummary();
        setData(response);

        const depositClass = response.DepositClass;

        setDepositSummaryData(depositClass.Main);

        // Dynamic extraction of all keys except "Main"
        const formatted: DepositClassDashboardItem[] = Object.entries(
          depositClass
        )
          .filter(([key]) => key !== "Main" || "main") // skip "Main"
          .map(([key, value]) => ({
            label: value.TypeName ?? key, // use TypeName if exists
            amount: value.Amount ?? 0,
            percent: value.Percent ?? 0,
            percentage: value.Percentage ?? 0,
          }));

        setDepositClassificationData(formatted);
      } catch (err: any) {
        setDepositSummaryError(err.message || "Something went wrong");
      } finally {
        setDepositSummaryLoading(false);
      }
    }

    fetchSummary();
  }, []);

  return {
    depositSummaryLoading,
    depositSummaryError,
    data,
    depositSummaryData,
    depositClassificationData,
  };
}
