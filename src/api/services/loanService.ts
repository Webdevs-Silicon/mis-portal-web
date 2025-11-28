// src/api/services/loanService.ts
import apiClient from "../client/apiClient";

export interface GetLoanRequest {
  RequestID: string;
}

export interface SummaryHeader {
  RC: string;
  TokenNo: string;
}

// ===========================
// Loan Period Wise Interfaces
export interface PeriodData {
  YesterdayAmt?: number;
  YesterdayOD?: number;
  YesterdayPer?: number;
  LastMonthAmt?: number;
  LastMonthOD?: number;
  LastMonthPer?: number;
  LastYearAmt?: number;
  LastYearOD?: number;
  LastYearPer?: number;
}

export interface PeriodWiseData {
  Yesterday: {
    YesterdayAmt: number;
    YesterdayOD: number;
    YesterdayPer: number;
  };
  LastMonth: {
    LastMonthAmt: number;
    LastMonthOD: number;
    LastMonthPer: number;
  };
  LastYear: {
    LastYearAmt: number;
    LastYearOD: number;
    LastYearPer: number;
  };
}

export interface GetLoanPeriodWiseResponse {
  Header: SummaryHeader;
  PeriodWise: PeriodWiseData;
}

// ===========================
// Loan Category Wise Interfaces
export interface CategoryData {
  STBal?: number;
  STOD?: number;
  STODPer?: number;
  MTBal?: number;
  MTOD?: number;
  MTODPer?: number;
  LTBal?: number;
  LTOD?: number;
  LTODPer?: number;
  StaffBal?: number;
  StaffOD?: number;
  StaffODPer?: number;
  Bal?: number;
  OD?: number;
  ODPer?: number;
}

export interface CategoryWiseData {
  ShortTerm: {
    STBal: number;
    STOD: number;
    STODPer: number;
  };
  MediumTerm: {
    MTBal: number;
    MTOD: number;
    MTODPer: number;
  };
  LongTerm: {
    LTBal: number;
    LTOD: number;
    LTODPer: number;
  };
  Staff: {
    StaffBal: number;
    StaffOD: number;
    StaffODPer: number;
  };
  Total: {
    Bal: number;
    OD: number;
    ODPer: number;
  };
}

export interface GetLoanCategoryWiseResponse {
  Header: SummaryHeader;
  CategoryWise: CategoryWiseData;
}

// ===========================
// Loan Branch Wise Interfaces
export interface BranchData {
  Balance: number;
  ODBalance: number;
  Percentage: number;
}

export interface BranchWiseData {
  [branchName: string]: BranchData;
}

export interface GetLoanBranchWiseResponse {
  Header: SummaryHeader;
  BranchWise: BranchWiseData;
}

// ===========================
// Loan Summary Interfaces
export interface LoanClassData {
  Total?: string;
  Percentage?: number;
  Int?: number;
  IntPercentage?: number;
  TypeName?: string;
  Percent?: number;
  Amount?: number;
}

export interface LoanClass {
  Main: {
    Total: string;
    Percentage: number;
    Int: number;
    IntPercentage: number;
  };
  Standard: {
    TypeName: string;
    Percent: number;
    Amount: number;
    Percentage: number;
  };
  SubStandard: {
    TypeName: string;
    Percent: number;
    Amount: number;
    Percentage: number;
  };
  Doubtful: {
    TypeName: string;
    Percent: number;
    Amount: number;
    Percentage: number;
  };
  Bad: {
    TypeName: string;
    Percent: number;
    Amount: number;
    Percentage: number;
  };
}

export interface GetLoanSummaryResponse {
  Header: SummaryHeader;
  LoanClass: LoanClass;
}

// ===========================
// API Functions
export const getLoanPeriodWise = async (): Promise<GetLoanPeriodWiseResponse> => {
  const params: GetLoanRequest = {
    RequestID: "LoanPeriodWise"
  };

  const res = await apiClient.get<GetLoanPeriodWiseResponse>("/", {
    params,
  });
  return res.data;
};

export const getLoanCategoryWise = async (): Promise<GetLoanCategoryWiseResponse> => {
  const params: GetLoanRequest = {
    RequestID: "LoanCategoryWise"
  };

  const res = await apiClient.get<GetLoanCategoryWiseResponse>("/", {
    params,
  });
  return res.data;
};

export const getLoanBranchWise = async (): Promise<GetLoanBranchWiseResponse> => {
  const params: GetLoanRequest = {
    RequestID: "LoanBranchWise"
  };

  const res = await apiClient.get<GetLoanBranchWiseResponse>("/", {
    params,
  });
  return res.data;
};

export const getLoanSummary = async (): Promise<GetLoanSummaryResponse> => {
  const params: GetLoanRequest = {
    RequestID: "LoanSummary"
  };

  const res = await apiClient.get<GetLoanSummaryResponse>("/", {
    params,
  });
  return res.data;
};