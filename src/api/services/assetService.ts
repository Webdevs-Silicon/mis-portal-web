// src/api/services/assetService.ts
import apiClient from "../client/apiClient";

export interface FinancialRequest {
  RequestID: string;
}

export interface SummaryHeader {
  RC: string;
  TokenNo: string;
}

// ===========================
// Asset Summary Interfaces
export interface AssetMainData {
  Total: string;
  Percentage: number;
  Int: number;
  IntPercentage: number;
}

export interface AssetClassificationItem {
  TypeName: string;
  Balance: number;
  Percentage: number;
  YesterdayPer: number;
}

export interface AssetData {
  Main: AssetMainData;
  0: AssetClassificationItem;
  1: AssetClassificationItem;
  2: AssetClassificationItem;
}

export interface GetAssetSummaryResponse {
  Header: SummaryHeader;
  Asset: AssetData;
}

// ===========================
// Asset Period Wise Interfaces
export interface AssetPeriodItem {
  TypeName: string;
  LastDayBal: number;
  LastMonthBal: number;
  LastYearBal: number;
  Total: number;
}

export interface GetAssetPeriodWiseResponse {
  Header: SummaryHeader;
  GrowthWise: AssetPeriodItem[];
}

// ===========================
// Cash Branch Wise Interfaces
export interface CashTotalData {
  Balance: number;
}

export interface CashBranchItem {
  BranchName: string;
  Balance: number;
}

export interface CashBranchData {
  Total: CashTotalData;
  0: CashBranchItem;
  1: CashBranchItem;
  2: CashBranchItem;
  3: CashBranchItem;
}

export interface GetCashBranchWiseResponse {
  Header: SummaryHeader;
  BranchWise: CashBranchData;
}

// ===========================
// Bank Branch Wise Interfaces
export interface BankTotalData {
  Balance: number;
}

export interface BankBranchItem {
  BankName: string;
  Balance: number;
  IntRate: number;
}

export interface BankBranchData {
  Total: BankTotalData;
  0: BankBranchItem;
  1: BankBranchItem;
  2: BankBranchItem;
  3: BankBranchItem;
}

export interface GetBankBranchWiseResponse {
  Header: SummaryHeader;
  BankWise: BankBranchData;
}

// ===========================
// Investment Details Interfaces
export interface InvestmentTotalData {
  Balance: number;
}

export interface InvestmentItem {
  INVName: string;
  Balance: number;
  IntRate: number;
}

export interface InvestmentData {
  Total: InvestmentTotalData;
  0: InvestmentItem;
  1: InvestmentItem;
  2: InvestmentItem;
  3: InvestmentItem;
}

export interface GetInvestmentDetailsResponse {
  Header: SummaryHeader;
  INVWise: InvestmentData;
}

// ===========================
// Asset API Functions

// Asset Summary API
export const getAssetSummary = async (): Promise<GetAssetSummaryResponse> => {
  const params: FinancialRequest = {
    RequestID: "AssetSummary",
  };

  const res = await apiClient.get<GetAssetSummaryResponse>("/", {
    params,
  });
  return res.data;
};

// Asset Period Wise API
export const getAssetPeriodWise = async (): Promise<GetAssetPeriodWiseResponse> => {
  const params: FinancialRequest = {
    RequestID: "AssetPeriodWise",
  };

  const res = await apiClient.get<GetAssetPeriodWiseResponse>("/", {
    params,
  });
  return res.data;
};

// Cash Branch Wise API
export const getCashBranchWise = async (): Promise<GetCashBranchWiseResponse> => {
  const params: FinancialRequest = {
    RequestID: "CashBranchWise",
  };

  const res = await apiClient.get<GetCashBranchWiseResponse>("/", {
    params,
  });
  return res.data;
};

// Bank Branch Wise API
export const getBankBranchWise = async (): Promise<GetBankBranchWiseResponse> => {
  const params: FinancialRequest = {
    RequestID: "BankBranchWise",
  };

  const res = await apiClient.get<GetBankBranchWiseResponse>("/", {
    params,
  });
  return res.data;
};

// Investment Details API
export const getInvestmentDetails = async (): Promise<GetInvestmentDetailsResponse> => {
  const params: FinancialRequest = {
    RequestID: "INVDetails",
  };

  const res = await apiClient.get<GetInvestmentDetailsResponse>("/", {
    params,
  });
  return res.data;
};