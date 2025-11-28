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

export interface GetTopDefaultersResponse {
  Header: SummaryHeader;
  DefaulterList: Defaulter[];
}

export const getTopDefaulters = async (): Promise<GetTopDefaultersResponse> => {
  const params: DefaultersRequest = {
    RequestID: "TopDefaulters"
  };

  const res = await apiClient.get<GetTopDefaultersResponse>("/", {
    params,
  });
  return res.data;
};