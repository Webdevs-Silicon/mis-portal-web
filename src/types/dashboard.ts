import type { ReactNode } from "react";

export type PerformanceData = {
  profit: number; // 1850000
  change: string; // +0.35 or -0.25
  trend: "up" | "down";
};

export type InfoCardData = {
  title: string;
  value: number; // example: 12580000
  change: number; // example: 0.35
  trend: "up" | "down";
  icon: ReactNode; // any icon component
  valueType: "currency" | "percentage";
  primaryAccentColor?: string;
  secondaryAccentColor?: string;
  showBarGraph?: boolean;
  barValues?: number[]; // [0.2, 0.5, 1, ...]
};
