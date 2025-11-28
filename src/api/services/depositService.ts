import apiClient from "../client/apiClient";

export interface FinancialRequest {
  RequestID: string;
}

export interface SummaryHeader {
  RC: string;
  TokenNo: string;
}

// ===========================
// Deposit Interfaces
export interface GrowthWiseItem {
  TypeName: string;
  LastDayPer: number;
  LastMonthPer: number;
  LastYearPer: number;
}

export interface GetDepositGrowthWiseResponse {
  Header: SummaryHeader;
  GrowthWise: GrowthWiseItem[];
}

// ===========================
// Deposit API Functions
export const getDepositGrowthWise = async (): Promise<GetDepositGrowthWiseResponse> => {
  const params: FinancialRequest = {
    RequestID: "DepositGrowthWise"
  };

  const res = await apiClient.get<GetDepositGrowthWiseResponse>("/", {
    params,
  });
  return res.data;
};

// You can add other financial services here (non-loan, non-deposit)