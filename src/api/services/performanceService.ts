import apiClient from "../client/apiClient";

export interface GetPerformanceOverviewRequest {
  RequestID: string;
}

export interface OverviewItem {
  Date: string;
  Amount: number;
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
