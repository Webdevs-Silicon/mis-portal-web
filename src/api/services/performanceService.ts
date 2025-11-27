import apiClient from "../client/apiClient";

export interface GetPerformanceOverviewRequest {
  RequestID: string;
}

export interface OverviewItem {
  Date: string;
  Amount: number;
  Percentage: number;
}

export interface OverDueDetail {
  Date: string;
  ODPercentage: number;
  Percentage: number;
}
export interface LDRDetail {
  Date: string;
  LDRPercentage: number;
  Percentage: number;
}

export interface GetPerformanceOverviewResponse {
  Header: {
    RC: string;
    TokenNo: string;
  };
  ProfitAndLoss: OverviewItem[];
}

export interface GetFluidOverviewResponse {
  Header: {
    RC: string;
    TokenNo: string;
  };
  FluidDetails: OverviewItem[];
}

export interface GetWorkingCapitalOverviewResponse {
  Header: {
    RC: string;
    TokenNo: string;
  };
  WorkingCapital: OverviewItem[];
}
export interface GetOverdueOverviewResponse {
  Header: {
    RC: string;
    TokenNo: string;
  };
  OverDueDetails: OverDueDetail[];
}
export interface GetLDROverviewResponse {
  Header: {
    RC: string;
    TokenNo: string;
  };
  LDRDetails: LDRDetail[];
}

// ===========================
// Common interfaces
export interface SummaryHeader {
  RC: string;
  TokenNo: string;
}

export interface PeriodData {
  Amount?: number;
  Percentage?: number;
}

export interface YOYData {
  Percentage?: number;
  YOY?: number;
}

export interface ProfitSummaryResponse {
  Header: SummaryHeader;
  ProfitPeriod: {
    Yesterday: PeriodData;
    LastMonth: PeriodData;
    LastYear: PeriodData;
    MonthlyAverage: PeriodData;
    YOY: YOYData;
  };
}

export interface FluidSummaryResponse {
  Header: SummaryHeader;
  FluidPeriod: {
    Yesterday: PeriodData;
    LastMonth: PeriodData;
    LastYear: PeriodData;
    MonthlyAverage: PeriodData;
    YOY: YOYData;
  };
}

export interface ODSummaryResponse {
  Header: SummaryHeader;
  ODPeriod: {
    Yesterday: PeriodData;
    LastMonth: PeriodData;
    LastYear: PeriodData;
    MonthlyAverage: PeriodData;
    YOY: YOYData;
  };
}

export interface WCSummaryResponse {
  Header: SummaryHeader;
  WCPeriod: {
    Yesterday: PeriodData;
    LastMonth: PeriodData;
    LastYear: PeriodData;
    MonthlyAverage: PeriodData;
    YOY: YOYData;
  };
}

export interface LDRSummaryResponse {
  Header: SummaryHeader;
  LDRPeriod: {
    Yesterday: PeriodData;
    LastMonth: PeriodData;
    LastYear: PeriodData;
    MonthlyAverage: PeriodData;
    YOY: YOYData;
  };
}

export const getProfitAndLoss =
  async (): Promise<GetPerformanceOverviewResponse> => {
    const params: GetPerformanceOverviewRequest = {
      RequestID: "ProfitNLoss",
    };

    const res = await apiClient.get<GetPerformanceOverviewResponse>("/", {
      params,
    });
    return res.data;
  };

export const getFluidOverview = async (): Promise<GetFluidOverviewResponse> => {
  const params: GetPerformanceOverviewRequest = {
    RequestID: "Fluid",
  };

  const res = await apiClient.get<GetFluidOverviewResponse>("/", {
    params,
  });
  return res.data;
};

export const getWorkingCapitalOverview =
  async (): Promise<GetWorkingCapitalOverviewResponse> => {
    const params: GetPerformanceOverviewRequest = {
      RequestID: "WorkingCapital",
    };

    const res = await apiClient.get<GetWorkingCapitalOverviewResponse>("/", {
      params,
    });
    return res.data;
  };

export const getOverDueOverview =
  async (): Promise<GetOverdueOverviewResponse> => {
    const params: GetPerformanceOverviewRequest = {
      RequestID: "OverDue",
    };

    const res = await apiClient.get<GetOverdueOverviewResponse>("/", {
      params,
    });
    return res.data;
  };

export const getLdrOverview = async (): Promise<GetLDROverviewResponse> => {
  const params: GetPerformanceOverviewRequest = {
    RequestID: "LDR",
  };

  const res = await apiClient.get<GetLDROverviewResponse>("/", {
    params,
  });
  return res.data;
};

export const getProfitSummary = async (): Promise<ProfitSummaryResponse> => {
  const params = { RequestID: "ProfitSummary" };
  const res = await apiClient.get<ProfitSummaryResponse>("/", { params });
  return res.data;
};

export const getFluidSummary = async (): Promise<FluidSummaryResponse> => {
  const params = { RequestID: "FluidSummary" };
  const res = await apiClient.get<FluidSummaryResponse>("/", { params });
  return res.data;
};

export const getODSummary = async (): Promise<ODSummaryResponse> => {
  const params = { RequestID: "ODSummary" };
  const res = await apiClient.get<ODSummaryResponse>("/", { params });
  return res.data;
};

export const getWCSummary = async (): Promise<WCSummaryResponse> => {
  const params = { RequestID: "WCSummary" };
  const res = await apiClient.get<WCSummaryResponse>("/", { params });
  return res.data;
};

export const getLDRSummary = async (): Promise<LDRSummaryResponse> => {
  const params = { RequestID: "LDRSummary" };
  const res = await apiClient.get<LDRSummaryResponse>("/", { params });
  return res.data;
};