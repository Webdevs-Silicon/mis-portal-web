import apiClient from "../client/apiClient";

export interface GetAssetSummaryRequest {
  RequestID: string;
}

export interface SummaryHeader {
  RC: string;
  TokenNo: string;
}

// Asset Interfaces

export interface Asset {
  Main: {
    Total: string;
    Percentage: number;
    Int: number;
    IntPercentage: number;
  };
  0: {
    TypeName: string;
    Balance: number;
    Percentage: number;
    YesterdayPer: number;
  };
  1: {
    TypeName: string;
    Balance: number;
    Percentage: number;
    YesterdayPer: number;
  };
  2: {
    TypeName: string;
    Balance: number;
    Percentage: number;
    YesterdayPer: number;
  };
}

export interface GetAssetSummaryResponse {
  Header: SummaryHeader;
  Asset: Asset;
}

// Assets API functions
export const getAssetSummary = async (): Promise<GetAssetSummaryResponse> => {
  const params: GetAssetSummaryRequest = {
    RequestID: "AssetSummary",
  };

  const res = await apiClient.get<GetAssetSummaryResponse>("/", {
    params,
  });
  return res.data;
};
