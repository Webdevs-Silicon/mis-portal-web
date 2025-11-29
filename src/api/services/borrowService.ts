import apiClient from "../client/apiClient";

export interface GetBorrowSummaryRequest {
  RequestID: string;
}

export interface SummaryHeader {
  RC: string;
  TokenNo: string;
}

export interface BorrowMain {
  Total: string;
  Percentage: number;
  Int: number;
  IntPercentage: number;
}

export interface BorrowingsWrapper {
  Main: BorrowMain;
}

export interface GetBorrowSummaryResponse {
  Header: SummaryHeader;
  Borrowings: BorrowingsWrapper;
}

// Borrowings API functions
export const getBorrowSummary = async (): Promise<GetBorrowSummaryResponse> => {
  const params: GetBorrowSummaryRequest = {
    RequestID: "BOR",
  };

  const res = await apiClient.get<GetBorrowSummaryResponse>("/", {
    params,
  });
  return res.data;
};
