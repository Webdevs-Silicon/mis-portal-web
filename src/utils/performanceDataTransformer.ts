// // utils/performanceDataTransformer.ts

// // Helper functions to format values
// export const formatCurrency = (amount: number): string => {
//   if (amount >= 100000) {
//     return `₹ ${(amount / 100000).toFixed(1)}L`;
//   }
//   if (amount >= 1000) {
//     return `₹ ${(amount / 1000).toFixed(1)}K`;
//   }
//   return `₹ ${amount}`;
// };

// export const formatPercentage = (percentage: number): string => {
//   return `${percentage.toFixed(1)}%`;
// };

// export const calculateChange = (current: number, previous: number): number => {
//   if (previous === 0) return 0;
//   return ((current - previous) / previous) * 100;
// };

// // API response to UI data transformers
// export const transformProfitData = (apiData: any) => {
//   const yesterday = apiData.ProfitPeriod.Yesterday.Amount || 0;
//   const lastMonth = apiData.ProfitPeriod.LastMonth.Amount || 0;
//   const change = calculateChange(yesterday, lastMonth);

//   return {
//     label: "Today's Profit",
//     value: formatCurrency(yesterday),
//     change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}`,
//     changeValue: `${change >= 0 ? '+' : ''}${change.toFixed(2)}`,
//     periodComparison: {
//       today: formatCurrency(yesterday),
//       lastMonth: formatCurrency(lastMonth),
//       lastYear: formatCurrency(apiData.ProfitPeriod.LastYear.Amount || 0),
//     },
//     summary: {
//       monthlyAvg: formatCurrency(apiData.ProfitPeriod.MonthlyAverage.Amount || 0),
//       yoyGrowth: `${(apiData.ProfitPeriod.YOY.Percentage || 0) >= 0 ? '+' : ''}${formatPercentage(apiData.ProfitPeriod.YOY.Percentage || 0)}`,
//     },
//     progressBars: {
//       today: 100,
//       lastMonth: lastMonth > 0 ? Math.min(100, (lastMonth / yesterday) * 100) : 0,
//       lastYear: apiData.ProfitPeriod.LastYear.Amount > 0 ? Math.min(100, (apiData.ProfitPeriod.LastYear.Amount / yesterday) * 100) : 0,
//     },
//   };
// };

// export const transformFluidData = (apiData: any) => {
//   const yesterday = apiData.FluidPeriod.Yesterday.Amount || 0;
//   const lastMonth = apiData.FluidPeriod.LastMonth.Amount || 0;
//   const change = calculateChange(yesterday, lastMonth);

//   return {
//     label: "Fluid Resources",
//     value: formatCurrency(yesterday),
//     change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}`,
//     changeValue: `${change >= 0 ? '+' : ''}${change.toFixed(2)}`,
//     periodComparison: {
//       today: formatCurrency(yesterday),
//       lastMonth: formatCurrency(lastMonth),
//       lastYear: formatCurrency(apiData.FluidPeriod.LastYear.Amount || 0),
//     },
//     summary: {
//       monthlyAvg: formatCurrency(apiData.FluidPeriod.MonthlyAverage.Amount || 0),
//       yoyGrowth: `${(apiData.FluidPeriod.YOY.Percentage || 0) >= 0 ? '+' : ''}${formatPercentage(apiData.FluidPeriod.YOY.Percentage || 0)}`,
//     },
//     progressBars: {
//       today: 100,
//       lastMonth: lastMonth > 0 ? Math.min(100, (lastMonth / yesterday) * 100) : 0,
//       lastYear: apiData.FluidPeriod.LastYear.Amount > 0 ? Math.min(100, (apiData.FluidPeriod.LastYear.Amount / yesterday) * 100) : 0,
//     },
//   };
// };

// export const transformODData = (apiData: any) => {
//   const yesterday = apiData.ODPeriod.Yesterday.Percentage || 0;
//   const lastMonth = apiData.ODPeriod.LastMonth.Percentage || 0;
//   const change = calculateChange(yesterday, lastMonth);

//   return {
//     label: "Overdue %",
//     value: formatPercentage(yesterday),
//     change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}`,
//     changeValue: `${change >= 0 ? '+' : ''}${change.toFixed(2)}`,
//     periodComparison: {
//       today: formatPercentage(yesterday),
//       lastMonth: formatPercentage(lastMonth),
//       lastYear: formatPercentage(apiData.ODPeriod.LastYear.Percentage || 0),
//     },
//     summary: {
//       monthlyAvg: formatPercentage(apiData.ODPeriod.MonthlyAverage.Percentage || 0),
//       yoyGrowth: `${(apiData.ODPeriod.YOY.Percentage || 0) >= 0 ? '+' : ''}${formatPercentage(apiData.ODPeriod.YOY.Percentage || 0)}`,
//     },
//     progressBars: {
//       today: Math.min(100, yesterday),
//       lastMonth: Math.min(100, lastMonth),
//       lastYear: Math.min(100, apiData.ODPeriod.LastYear.Percentage || 0),
//     },
//   };
// };

// export const transformWCData = (apiData: any) => {
//   const yesterday = apiData.WCPeriod.Yesterday.Amount || 0;
//   const lastMonth = apiData.WCPeriod.LastMonth.Amount || 0;
//   const change = calculateChange(yesterday, lastMonth);

//   return {
//     label: "Working Capital",
//     value: formatCurrency(yesterday),
//     change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}`,
//     changeValue: `${change >= 0 ? '+' : ''}${change.toFixed(2)}`,
//     periodComparison: {
//       today: formatCurrency(yesterday),
//       lastMonth: formatCurrency(lastMonth),
//       lastYear: formatCurrency(apiData.WCPeriod.LastYear.Amount || 0),
//     },
//     summary: {
//       monthlyAvg: formatCurrency(apiData.WCPeriod.MonthlyAverage.Amount || 0),
//       yoyGrowth: `${(apiData.WCPeriod.YOY.Percentage || 0) >= 0 ? '+' : ''}${formatPercentage(apiData.WCPeriod.YOY.Percentage || 0)}`,
//     },
//     progressBars: {
//       today: 100,
//       lastMonth: lastMonth > 0 ? Math.min(100, (lastMonth / yesterday) * 100) : 0,
//       lastYear: apiData.WCPeriod.LastYear.Amount > 0 ? Math.min(100, (apiData.WCPeriod.LastYear.Amount / yesterday) * 100) : 0,
//     },
//   };
// };

// export const transformLDRData = (apiData: any) => {
//   const yesterday = apiData.LDRPeriod.Yesterday.Percentage || 0;
//   const lastMonth = apiData.LDRPeriod.LastMonth.Percentage || 0;
//   const change = calculateChange(yesterday, lastMonth);

//   return {
//     label: "LDR",
//     value: formatPercentage(yesterday),
//     change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}`,
//     changeValue: `${change >= 0 ? '+' : ''}${change.toFixed(2)}`,
//     periodComparison: {
//       today: formatPercentage(yesterday),
//       lastMonth: formatPercentage(lastMonth),
//       lastYear: formatPercentage(apiData.LDRPeriod.LastYear.Percentage || 0),
//     },
//     summary: {
//       monthlyAvg: formatPercentage(apiData.LDRPeriod.MonthlyAverage.Percentage || 0),
//       yoyGrowth: `${(apiData.LDRPeriod.YOY.Percentage || 0) >= 0 ? '+' : ''}${formatPercentage(apiData.LDRPeriod.YOY.Percentage || 0)}`,
//     },
//     progressBars: {
//       today: Math.min(100, yesterday),
//       lastMonth: Math.min(100, lastMonth),
//       lastYear: Math.min(100, apiData.LDRPeriod.LastYear.Percentage || 0),
//     },
//   };
// };
// utils/performanceDataTransformer.ts

// Helper functions to format values
export const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) {
    return `₹ ${(amount / 10000000).toFixed(1)}Cr`;
  }
  if (amount >= 100000) {
    return `₹ ${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹ ${(amount / 1000).toFixed(1)}K`;
  }
  return `₹ ${amount}`;
};

export const formatPercentage = (percentage: number): string => {
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(1)}%`;
};

export const formatPercentageValue = (percentage: number): string => {
  return `${percentage.toFixed(1)}%`;
};

export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
};

// API response to UI data transformers
export const transformProfitData = (apiData: any) => {
  const yesterday = apiData.ProfitPeriod?.Yesterday?.Amount || 0;
  const lastMonth = apiData.ProfitPeriod?.LastMonth?.Amount || 0;
  const lastYear = apiData.ProfitPeriod?.LastYear?.Amount || 0;
  const monthlyAvg = apiData.ProfitPeriod?.MonthlyAverage?.Amount || 0;
  const yoyPercentage = apiData.ProfitPeriod?.YOY?.Percentage || 0;
  
  const change = calculateChange(yesterday, lastMonth);

  return {
    label: "Today's Profit",
    value: formatCurrency(yesterday),
    change: formatPercentage(change),
    changeValue: formatPercentage(change),
    periodComparison: {
      today: formatCurrency(yesterday),
      lastMonth: formatCurrency(lastMonth),
      lastYear: formatCurrency(lastYear),
    },
    summary: {
      monthlyAvg: formatCurrency(monthlyAvg),
      yoyGrowth: formatPercentage(yoyPercentage),
    },
    progressBars: {
      today: 100,
      lastMonth: lastMonth > 0 ? Math.min(100, (lastMonth / yesterday) * 100) : 0,
      lastYear: lastYear > 0 ? Math.min(100, (lastYear / yesterday) * 100) : 0,
    },
  };
};

export const transformFluidData = (apiData: any) => {
  const yesterday = apiData.FluidPeriod?.Yesterday?.Amount || 0;
  const lastMonth = apiData.FluidPeriod?.LastMonth?.Amount || 0;
  const lastYear = apiData.FluidPeriod?.LastYear?.Amount || 0;
  const monthlyAvg = apiData.FluidPeriod?.MonthlyAverage?.Amount || 0;
  const yoyPercentage = apiData.FluidPeriod?.YOY?.Percentage || 0;
  
  const change = calculateChange(yesterday, lastMonth);

  return {
    label: "Fluid Resources",
    value: formatCurrency(yesterday),
    change: formatPercentage(change),
    changeValue: formatPercentage(change),
    periodComparison: {
      today: formatCurrency(yesterday),
      lastMonth: formatCurrency(lastMonth),
      lastYear: formatCurrency(lastYear),
    },
    summary: {
      monthlyAvg: formatCurrency(monthlyAvg),
      yoyGrowth: formatPercentage(yoyPercentage),
    },
    progressBars: {
      today: 100,
      lastMonth: lastMonth > 0 ? Math.min(100, (lastMonth / yesterday) * 100) : 0,
      lastYear: lastYear > 0 ? Math.min(100, (lastYear / yesterday) * 100) : 0,
    },
  };
};

export const transformODData = (apiData: any) => {
  const yesterday = apiData.ODPeriod?.Yesterday?.Percentage || 0;
  const lastMonth = apiData.ODPeriod?.LastMonth?.Percentage || 0;
  const lastYear = apiData.ODPeriod?.LastYear?.Percentage || 0;
  const monthlyAvg = apiData.ODPeriod?.MonthlyAverage?.Percentage || 0;
  const yoyPercentage = apiData.ODPeriod?.YOY?.Percentage || 0;
  
  const change = calculateChange(yesterday, lastMonth);

  return {
    label: "Overdue %",
    value: formatPercentageValue(yesterday),
    change: formatPercentage(change),
    changeValue: formatPercentage(change),
    periodComparison: {
      today: formatPercentageValue(yesterday),
      lastMonth: formatPercentageValue(lastMonth),
      lastYear: formatPercentageValue(lastYear),
    },
    summary: {
      monthlyAvg: formatPercentageValue(monthlyAvg),
      yoyGrowth: formatPercentage(yoyPercentage),
    },
    progressBars: {
      today: Math.min(100, yesterday),
      lastMonth: Math.min(100, lastMonth),
      lastYear: Math.min(100, lastYear),
    },
  };
};

export const transformWCData = (apiData: any) => {
  const yesterday = apiData.WCPeriod?.Yesterday?.Amount || 0;
  const lastMonth = apiData.WCPeriod?.LastMonth?.Amount || 0;
  const lastYear = apiData.WCPeriod?.LastYear?.Amount || 0;
  const monthlyAvg = apiData.WCPeriod?.MonthlyAverage?.Amount || 0;
  const yoyPercentage = apiData.WCPeriod?.YOY?.Percentage || 0;
  
  const change = calculateChange(yesterday, lastMonth);

  return {
    label: "Working Capital",
    value: formatCurrency(yesterday),
    change: formatPercentage(change),
    changeValue: formatPercentage(change),
    periodComparison: {
      today: formatCurrency(yesterday),
      lastMonth: formatCurrency(lastMonth),
      lastYear: formatCurrency(lastYear),
    },
    summary: {
      monthlyAvg: formatCurrency(monthlyAvg),
      yoyGrowth: formatPercentage(yoyPercentage),
    },
    progressBars: {
      today: 100,
      lastMonth: lastMonth > 0 ? Math.min(100, (lastMonth / yesterday) * 100) : 0,
      lastYear: lastYear > 0 ? Math.min(100, (lastYear / yesterday) * 100) : 0,
    },
  };
};

export const transformLDRData = (apiData: any) => {
  const yesterday = apiData.LDRPeriod?.Yesterday?.Percentage || 0;
  const lastMonth = apiData.LDRPeriod?.LastMonth?.Percentage || 0;
  const lastYear = apiData.LDRPeriod?.LastYear?.Percentage || 0;
  const monthlyAvg = apiData.LDRPeriod?.MonthlyAverage?.Percentage || 0;
  const yoyPercentage = apiData.LDRPeriod?.YOY?.Percentage || 0;
  
  const change = calculateChange(yesterday, lastMonth);

  return {
    label: "LDR",
    value: formatPercentageValue(yesterday),
    change: formatPercentage(change),
    changeValue: formatPercentage(change),
    periodComparison: {
      today: formatPercentageValue(yesterday),
      lastMonth: formatPercentageValue(lastMonth),
      lastYear: formatPercentageValue(lastYear),
    },
    summary: {
      monthlyAvg: formatPercentageValue(monthlyAvg),
      yoyGrowth: formatPercentage(yoyPercentage),
    },
    progressBars: {
      today: Math.min(100, yesterday),
      lastMonth: Math.min(100, lastMonth),
      lastYear: Math.min(100, lastYear),
    },
  };
};