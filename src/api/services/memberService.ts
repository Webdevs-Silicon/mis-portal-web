// // src/api/services/memberService.ts
// import apiClient from "../client/apiClient";

// export interface GetMemberRequest {
//   RequestID: string;
// }

// export interface SummaryHeader {
//   RC: string;
//   TokenNo: string;
// }

// // Member Details Interfaces
// export interface MainMemberDetails {
//   Total: number;
//   Percentage: number;
//   Balance: number;
//   BalPercentage: number;
// }

// export interface MemberClassDetails {
//   Class: string;
//   ClassPercentage: number;
//   MemberCount: number;
//   ShareBal: number;
// }

// export interface MemberDetails {
//   Main: MainMemberDetails;
//   [key: string]: MainMemberDetails | MemberClassDetails; // Index signature for dynamic keys (0, 1, 2, 3, etc.)
// }

// export interface GetMemberResponse {
//   Header: SummaryHeader;
//   MemberDetails: MemberDetails;
// }

// // API Functions for Member-related endpoints
// export const getMemberDetails = async (): Promise<GetMemberResponse> => {
//   const params: GetMemberRequest = {
//     RequestID: "Member"
//   };

//   const res = await apiClient.get<GetMemberResponse>("/", {
//     params,
//   });
//   return res.data;
// };
// src/api/services/memberService.ts
import apiClient from "../client/apiClient";

// ==========================
// Common Interfaces
// ==========================
export interface SummaryHeader {
  RC: string;
  TokenNo: string;
}

// ==========================
// Existing Member Details Interfaces
// ==========================
export interface GetMemberRequest {
  RequestID: string;
}

export interface MainMemberDetails {
  Total: number;
  Percentage: number;
  Balance: number;
  BalPercentage: number;
}

export interface MemberClassDetails {
  Class: string;
  ClassPercentage: number;
  MemberCount: number;
  ShareBal: number;
}

export interface MemberDetails {
  Main: MainMemberDetails;
  [key: string]: MainMemberDetails | MemberClassDetails; // dynamic keys (0, 1, 2, 3, etc.)
}

export interface GetMemberResponse {
  Header: SummaryHeader;
  MemberDetails: MemberDetails;
}

// ==========================
// New: Member Classifications Interfaces
// ==========================
export interface MemberClassMain {
  Class: string;
}

export interface MemberClassStats {
  YesterdayCount?: number;
  YesterdayCapital?: number;
  YesterdayBor?: number;
  LastMonthCount?: number;
  LastMonthCapital?: number;
  LastMonthBor?: number;
  LastYearCount?: number;
  LastYearCapital?: number;
  LastYearBor?: number;
}

export interface MemberClassificationsDetails {
  Main: MemberClassMain;
  [key: string]: MemberClassMain | MemberClassStats; // dynamic keys like 0,1,2
}

export interface GetMemberClassificationsResponse {
  Header: SummaryHeader;
  MemberDetails: MemberClassificationsDetails;
}

// ==========================
// API Functions
// ==========================
export const getMemberDetails = async (): Promise<GetMemberResponse> => {
  const params: GetMemberRequest = {
    RequestID: "Member"
  };

  const res = await apiClient.get<GetMemberResponse>("/", { params });
  return res.data;
};

export const getMemberClassifications = async (): Promise<GetMemberClassificationsResponse> => {
  const params: GetMemberRequest = {
    RequestID: "MemberClassifications"
  };

  const res = await apiClient.get<GetMemberClassificationsResponse>("/", { params });
  return res.data;
};
