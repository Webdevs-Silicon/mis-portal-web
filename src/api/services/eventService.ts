// src/api/services/eventService.ts
import apiClient from "../client/apiClient";

export interface EventRequest {
  RequestID: string;
}

export interface SummaryHeader {
  RC: string;
  TokenNo: string;
}

export interface EventDetails {
  ScheduleDate: string;
  Heading: string;
  "Heading 2"?: string;
  "Heading 3"?: string;
  "Heading 4"?: string;
  "Heading 5"?: string;
  Subject: string;
  Time: string;
  Duration: string;
  Address: string;
}

export interface GetAllEventResponse {
  Header: SummaryHeader;
  EventDetails: EventDetails[];
}

export const getAllEvent = async (): Promise<GetAllEventResponse> => {
  const params: EventRequest = {
    RequestID: "AllEvent"
  };

  const res = await apiClient.get<GetAllEventResponse>("/", {
    params,
  });
  return res.data;
};