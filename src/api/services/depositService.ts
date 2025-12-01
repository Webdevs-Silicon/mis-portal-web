import apiClient from "../client/apiClient";

export interface FinancialRequest {
  RequestID: string;
}

export interface GetDepositRequest {
  RequestID: string;
}

export interface SummaryHeader {
  RC: string;
  TokenNo: string;
}

export interface BranchData {
  Balance: number;
  Growth: number;
  GrowthPer: number;
  BranchAccs: number;
}

export interface BranchWiseData {
  [branchName: string]: BranchData;
}

export interface GetDepositBranchWiseResponse {
  Header: SummaryHeader;
  BranchWise: BranchWiseData;
}

// ===========================
// Deposit Interfaces
export interface GrowthWiseItem {
  TypeName: string;
  LastDayPer: number;
  LastMonthPer: number;
  LastYearPer: number;
}

export interface DepositClass {
  Main: {
    Total: string;
    Percentage: number;
    Int: number;
    IntPercentage: number;
  };
  0: {
    TypeName: string;
    Percent: number;
    Amount: number;
    Percentage: number;
  };
  1: {
    TypeName: string;
    Percent: number;
    Amount: number;
    Percentage: number;
  };
  2: {
    TypeName: string;
    Percent: number;
    Amount: number;
    Percentage: number;
  };
}

export interface GetDepositSummaryResponse {
  Header: SummaryHeader;
  DepositClass: DepositClass;
}

export interface GetDepositGrowthWiseResponse {
  Header: SummaryHeader;
  GrowthWise: GrowthWiseItem[];
}

// ===========================
// Deposit API Functions
export const getDepositGrowthWise =
  async (): Promise<GetDepositGrowthWiseResponse> => {
    const params: FinancialRequest = {
      RequestID: "DepositGrowthWise",
    };

    const res = await apiClient.get<GetDepositGrowthWiseResponse>("/", {
      params,
    });
    return res.data;
  };

export const getDepositSummary =
  async (): Promise<GetDepositSummaryResponse> => {
    const params: GetDepositRequest = {
      RequestID: "DepositSummary",
    };

    const res = await apiClient.get<GetDepositSummaryResponse>("/", {
      params,
    });
    return res.data;
  };

  export const getDepositBranchWise = async (): Promise<GetDepositBranchWiseResponse> => {
  const params: GetDepositRequest = {
    RequestID: "DepositBranchWise",
  };

  const res = await apiClient.get<GetDepositBranchWiseResponse>("/", {
    params,
  });
  return res.data;
};