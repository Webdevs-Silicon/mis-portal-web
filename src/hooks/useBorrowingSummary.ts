import { useEffect, useState } from "react";
import {
  getBorrowSummary,
  type BorrowMain,
} from "../api/services/borrowService";

export function useBorrowings() {
  const [borrowData, setBorrowData] = useState<BorrowMain | null>(null);
  const [borrowLoading, setBorrowLoading] = useState(true);
  const [borrowError, setBorrowError] = useState<string | null>(null);

  useEffect(() => {
    setBorrowLoading(true);
    setBorrowError(null);

    getBorrowSummary()
      .then((response) => {
        setBorrowData(response.Borrowings.Main);
      })
      .catch((err) => {
        console.error("Borrowings fetch error:", err);
        setBorrowError("Failed to load borrowings");
      })
      .finally(() => {
        setBorrowLoading(false);
      });
  }, []);

  return {
    borrowData,
    borrowLoading,
    borrowError,
  };
}
