// src/api/services/branchService.ts
import apiClient from "../client/apiClient";

export interface BranchRequest {
  RequestID: string;
}

export interface SummaryHeader {
  RC: string;
  TokenNo: string;
}

export interface BranchDetails {
  Branch: string;
  Head: string;
  StaffCount: number;
  MobNo: number;
}

export interface GetAllBranchResponse {
  Header: SummaryHeader;
  MemberDetails: BranchDetails[];
}

export interface BranchNStaff {
  Branch: string;
  Staff: number;
}

export interface GetBranchDetailsResponse {
  Header: SummaryHeader;
  BranchNStaff: BranchNStaff;
}

export const getAllBranch = async (): Promise<GetAllBranchResponse> => {
  const params: BranchRequest = {
    RequestID: "AllBranch",
  };

  const res = await apiClient.get<GetAllBranchResponse>("/", {
    params,
  });
  return res.data;
};

export const getBranchDetails = async (): Promise<GetBranchDetailsResponse> => {
  const params: BranchRequest = {
    RequestID: "Branch",
  };

  const res = await apiClient.get<GetBranchDetailsResponse>("/", {
    params,
  });
  return res.data;
};
