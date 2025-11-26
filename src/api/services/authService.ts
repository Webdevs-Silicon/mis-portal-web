import apiClient from "../client/apiClient";

export interface BankLogoResponse {
  RC: string;
  TokenNo: string;
  ProfileImage: string;
}

export interface VerifyOtpRequest {
  RequestID: string;
  OTP: string;
}

export interface VerifyOtpResponse {
  RC: string;
  TokenNo: string;
}

export interface ResendOTPRequest {
  RequestID: string;
}

export interface ResendOTPResponse {
  RC: string;
  TokenNo: string;
}

// ----------------- LOGIN RESPONSE -----------------

export interface LoginResponseHeader {
  RC: string;
  TokenNo: string;
}

export interface DirectorDetail {
  Name?: string;
  Photo?: string;
  Date?: string;
}

export interface LoginResponse {
  Header: LoginResponseHeader;
  DirectorDetails: DirectorDetail[];
}

// ----------------- API FUNCTIONS -----------------

export const fetchBankLogo = async (): Promise<string | null> => {
  const response = await apiClient.get<BankLogoResponse>("/", {
    params: {
      RequestID: "Logo",
    },
  });

  return response.data?.ProfileImage ?? null;
};

export const verifyOtp = async (
  payload: Omit<VerifyOtpRequest, "RequestID">
): Promise<VerifyOtpResponse> => {
  const requestId = "SignIn";
  const response = await apiClient.get<VerifyOtpResponse>("/", {
    params: {
      ...payload,
      RequestID: requestId,
    },
  });

  return response.data;
};

export const resendOtp = async (
  payload: Omit<ResendOTPRequest, "RequestID">
): Promise<ResendOTPResponse> => {
  const requestId = "ResendOTP";
  const response = await apiClient.get<ResendOTPResponse>("/", {
    params: {
      ...payload,
      RequestID: requestId,
    },
  });

  return response.data;
};

export const loginDetails = async (): Promise<LoginResponse> => {
  const response = await apiClient.get<LoginResponse>("/", {
    params: {
      RequestID: "LogIn",
      TokenNo: 0,
    },
  });
  return response.data;
};
