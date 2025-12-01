import { useEffect, useState } from "react";
import {
  getAssetSummary,
  type GetAssetSummaryResponse,
} from "../api/services/assetService";

export interface AssetClassDashboardItem {
  label: string;
  balance: number;
  percentage: number;
  yesterdayPercentage: number;
}

export interface AssetSummaryItem {
  Total: string;
  Percentage: number;
  Int: number;
  IntPercentage: number;
}

export function useAssetSummary() {
  const [assetSummaryLoading, setAssetSummaryLoading] = useState(true);
  const [assetSummaryError, setAssetSummaryError] = useState<string | null>(
    null
  );
  const [data, setData] = useState<GetAssetSummaryResponse | null>(null);
  const [assetClassificationData, setAssetClassificationData] = useState<
    AssetClassDashboardItem[]
  >([]);
  const [assetSummaryData, setAssetSummaryData] =
    useState<AssetSummaryItem | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        setAssetSummaryLoading(true);

        const response = await getAssetSummary();
        setData(response);

        const assetClass = response.Asset;

        setAssetSummaryData(assetClass.Main);

        // Dynamic extraction of all keys except "Main"
        const formatted: AssetClassDashboardItem[] = Object.entries(assetClass)
          .filter(([key]) => key !== "Main" || "main") // skip "Main"
          .map(([key, value]) => ({
            label: value.TypeName ?? key, // use TypeName if exists
            balance: value.Balance ?? 0,
            percentage: value.Percentage ?? 0,
            yesterdayPercentage: value.YesterdayPer ?? 0,
          }));

        setAssetClassificationData(formatted);
      } catch (err: any) {
        setAssetSummaryError(err.message || "Something went wrong");
      } finally {
        setAssetSummaryLoading(false);
      }
    }

    fetchSummary();
  }, []);

  return {
    assetSummaryLoading,
    assetSummaryError,
    data,
    assetSummaryData,
    assetClassificationData,
  };
}
