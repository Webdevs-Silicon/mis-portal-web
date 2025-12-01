// src/api/services/defaultersService.ts
import apiClient from "../client/apiClient";

export interface DefaultersRequest {
  RequestID: string;
}

export interface SummaryHeader {
  RC: string;
  TokenNo: string;
}

export interface Defaulter {
  Name: string;
  AcNo: number;
  Product: string;
  Balance: number;
  Branch: string;
  Day: string;
}

export interface TopDefaulterSummary {
  Balance: string;
  Percentage: number;
}

export interface GetTopDefaultersResponse {
  Header: SummaryHeader;
  DefaulterList: Defaulter[];
}
export interface GetTopDefaulterSummaryResponse {
  Header: SummaryHeader;
  TopDefaulters: TopDefaulterSummary;
}

export const getTopDefaulters = async (): Promise<GetTopDefaultersResponse> => {
  const params: DefaultersRequest = {
    RequestID: "TopDefaulters",
  };

  const res = await apiClient.get<GetTopDefaultersResponse>("/", {
    params,
  });
  return res.data;
};

export const getDefaulterSummary =
  async (): Promise<GetTopDefaulterSummaryResponse> => {
    const params: DefaultersRequest = {
      RequestID: "Defaulters",
    };

    const res = await apiClient.get<GetTopDefaulterSummaryResponse>("/", {
      params,
    });
    return res.data;
  };
