import { useEffect, useState } from "react";
import {
  getMemberDetails,
  type GetMemberResponse,
  type MemberClassDetails,
} from "../api/services/memberService";

export interface MemberClassDashboardItem {
  label: string;
  percentage: number;
  memberCount: number;
  shareBalance: number;
}

export interface MemberSummaryItem {
  Total: number;
  Percentage: number;
  Balance: number;
  BalPercentage: number;
}

export function useMemberSummary() {
  const [memberSummaryLoading, setMemberSummaryLoading] = useState(true);
  const [memberSummaryError, setMemberSummaryError] = useState<string | null>(
    null
  );
  const [data, setData] = useState<GetMemberResponse | null>(null);

  const [memberSummaryData, setMemberSummaryData] =
    useState<MemberSummaryItem | null>(null);

  const [memberClassificationData, setMemberClassificationData] = useState<
    MemberClassDashboardItem[]
  >([]);

  useEffect(() => {
    async function fetchSummary() {
      try {
        setMemberSummaryLoading(true);

        const response = await getMemberDetails();
        setData(response);

        const memberDetails = response.MemberDetails;

        // Summary (Main)
        setMemberSummaryData(memberDetails.Main);

        // Extract class data (dynamic keys 0,1,2,3...)
        const formatted: MemberClassDashboardItem[] = Object.entries(
          memberDetails
        )
          .filter(([key]) => key !== "Main") // skip Main
          .map(([key, value]) => {
            const item = value as MemberClassDetails;
            return {
              label: item.Class,
              percentage: item.ClassPercentage,
              memberCount: item.MemberCount,
              shareBalance: item.ShareBal,
            };
          });

        setMemberClassificationData(formatted);
      } catch (err: any) {
        setMemberSummaryError(err.message || "Something went wrong");
      } finally {
        setMemberSummaryLoading(false);
      }
    }

    fetchSummary();
  }, []);

  return {
    memberSummaryLoading,
    memberSummaryError,
    data,
    memberSummaryData,
    memberClassificationData,
  };
}
