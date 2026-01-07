
// src/components/popup/CashInvestmentsDetailsPopup.tsx
// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Typography, 
//   IconButton, 
//   Modal,
//   Slide 
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { 
//   getAssetPeriodWise, 
//   getCashBranchWise, 
//   getBankBranchWise, 
//   getInvestmentDetails 
// } from '../../api/services/assetService';

// // --- Types ---
// interface CashInvestmentsDetailsPopupProps {
//   onClose: () => void;
//   open: boolean;
// }

// type ActiveTab = 'cash' | 'investments' | 'period' | 'banks';

// interface BankRowData {
//   name: string;
//   balance: string;
//   rate: string;
// }

// interface PeriodRowData {
//   period: string;
//   cash: string;
//   bank: string;
//   inv: string;
//   totalGrowth: string;
// }

// interface CashRowData {
//   branch: string;
//   balance: string;
// }

// interface InvestmentRowData {
//   institution: string;
//   balance: string;
//   rate: string;
// }

// interface ApiData {
//   periodData: PeriodRowData[];
//   cashData: CashRowData[];
//   bankData: BankRowData[];
//   investmentsData: InvestmentRowData[];
//   totalCash: string;
//   totalBank: string;
//   totalInvestments: string;
//   averageBankRate: string;
//   averageInvestmentRate: string;
// }

// // --- Constants & Styles ---
// const COLORS = {
//   primaryBlue: '#0068B5',
//   textDark: '#101828',
//   textGrey: '#667085',
//   bgGreen: '#ECFDF3',
//   textGreen: '#027A48',
//   bgRed: '#FEF3F2',
//   textRed: '#B42318',
//   bgGrey: '#F9FAFB',
//   border: '#EAECF0',
// };

// // --- Helper Components ---
// const PercentageBadge: React.FC<{ value: string; type?: 'positive' | 'negative' }> = ({ value, type = 'positive' }) => {
//   const isPositive = type !== 'negative';
//   return (
//     <Box
//       sx={{
//         bgcolor: isPositive ? COLORS.bgGreen : COLORS.bgRed,
//         borderRadius: '16px',
//         px: '8px',
//         py: '2px',
//         display: 'inline-flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <Typography
//         sx={{
//           fontSize: '12px',
//           fontWeight: 500,
//           color: isPositive ? COLORS.textGreen : COLORS.textRed,
//           lineHeight: '18px',
//         }}
//       >
//         {value}
//       </Typography>
//     </Box>
//   );
// };

// // --- Layout Constants ---
// const bankColWidths = {
//   name: '130px',
//   balance: '80px',
//   rate: '80px',
// };

// // const minTableWidth = '500px'; 

// // --- Main Component ---
// const CashInvestmentsDetailsPopup: React.FC<CashInvestmentsDetailsPopupProps> = ({ onClose, open }) => {
//   const [activeTab, setActiveTab] = useState<ActiveTab>('period');
//   const [apiData, setApiData] = useState<ApiData>({
//     periodData: [],
//     cashData: [],
//     bankData: [],
//     investmentsData: [],
//     totalCash: '0',
//     totalBank: '0',
//     totalInvestments: '0',
//     averageBankRate: '0',
//     averageInvestmentRate: '0'
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // --- API Calls - Fetch all data when modal opens ---
//   useEffect(() => {
//     const fetchAllData = async () => {
//       if (!open) return;
      
//       setLoading(true);
//       setError(null);
      
//       try {
//         // Fetch all APIs in parallel
//         const [periodResponse, cashResponse, bankResponse, investmentResponse] = await Promise.all([
//           getAssetPeriodWise(),
//           getCashBranchWise(),
//           getBankBranchWise(),
//           getInvestmentDetails()
//         ]);

//         // Process period data - CORRECTED
//         let periodData: PeriodRowData[] = [];
//         if (periodResponse.Header.RC === "0") {
//           const cashData = periodResponse.GrowthWise.find(item => item.TypeName === 'Cash');
//           const bankData = periodResponse.GrowthWise.find(item => item.TypeName === 'Bank');
//           const invData = periodResponse.GrowthWise.find(item => item.TypeName === 'INV');
//           const totalData = periodResponse.GrowthWise.find(item => item.TypeName === 'Total');
          
//           periodData = [
//             {
//               period: 'Last Day',
//               cash: cashData ? (cashData.LastDayBal / 100000).toFixed(1) : '0',
//               bank: bankData ? (bankData.LastDayBal / 100000).toFixed(1) : '0',
//               inv: invData ? (invData.LastDayBal / 100000).toFixed(1) : '0',
//               totalGrowth: totalData ? `${((totalData.LastDayBal - totalData.LastYearBal) / totalData.LastYearBal * 100).toFixed(1)}%` : '0%'
//             },
//             {
//               period: 'Last Month',
//               cash: cashData ? (cashData.LastMonthBal / 100000).toFixed(1) : '0',
//               bank: bankData ? (bankData.LastMonthBal / 100000).toFixed(1) : '0',
//               inv: invData ? (invData.LastMonthBal / 100000).toFixed(1) : '0',
//               totalGrowth: totalData ? `${((totalData.LastMonthBal - totalData.LastYearBal) / totalData.LastYearBal * 100).toFixed(1)}%` : '0%'
//             },
//             {
//               period: 'Last Year',
//               cash: cashData ? (cashData.LastYearBal / 100000).toFixed(1) : '0',
//               bank: bankData ? (bankData.LastYearBal / 100000).toFixed(1) : '0',
//               inv: invData ? (invData.LastYearBal / 100000).toFixed(1) : '0',
//               totalGrowth: '0%'
//             },
//             {
//               period: 'Total',
//               cash: cashData ? (cashData.Total / 100000).toFixed(1) : '0',
//               bank: bankData ? (bankData.Total / 100000).toFixed(1) : '0',
//               inv: invData ? (invData.Total / 100000).toFixed(1) : '0',
//               totalGrowth: '0%'
//             }
//           ];
//         }

//         // Process cash data
//         let cashData: CashRowData[] = [];
//         let totalCash = '0';
//         if (cashResponse.Header.RC === "0") {
//           cashData = Object.entries(cashResponse.BranchWise)
//             .filter(([key]) => key !== 'Total')
//             .map(([_, data]) => ({
//               branch: data.BranchName,
//               balance: (data.Balance / 100000).toFixed(1)
//             }));
          
//           totalCash = cashResponse.BranchWise.Total ? 
//             (cashResponse.BranchWise.Total.Balance / 100000).toFixed(1) : '0';
//         }

//         // Process bank data
//         let bankData: BankRowData[] = [];
//         let totalBank = '0';
//         let averageBankRate = '0';
//         if (bankResponse.Header.RC === "0") {
//           bankData = Object.entries(bankResponse.BankWise)
//             .filter(([key]) => key !== 'Total')
//             .map(([_, data]) => ({
//               name: data.BankName,
//               balance: (data.Balance / 100000).toFixed(1),
//               rate: `${data.IntRate}%`
//             }));
          
//           totalBank = bankResponse.BankWise.Total ? 
//             (bankResponse.BankWise.Total.Balance / 100000).toFixed(1) : '0';
          
//           // Calculate average interest rate
//           const banks = Object.entries(bankResponse.BankWise)
//             .filter(([key]) => key !== 'Total')
//             .map(([_, data]) => data);
          
//           if (banks.length > 0) {
//             const avgRate = banks.reduce((sum, bank) => sum + bank.IntRate, 0) / banks.length;
//             averageBankRate = avgRate.toFixed(1);
//           }
//         }

//         // Process investment data
//         let investmentsData: InvestmentRowData[] = [];
//         let totalInvestments = '0';
//         let averageInvestmentRate = '0';
//         if (investmentResponse.Header.RC === "0") {
//           investmentsData = Object.entries(investmentResponse.INVWise)
//             .filter(([key]) => key !== 'Total')
//             .map(([_, data]) => ({
//               institution: data.INVName,
//               balance: (data.Balance / 100000).toFixed(1),
//               rate: `${data.IntRate}%`
//             }));
          
//           totalInvestments = investmentResponse.INVWise.Total ? 
//             (investmentResponse.INVWise.Total.Balance / 100000).toFixed(1) : '0';
          
//           // Calculate average interest rate
//           const investments = Object.entries(investmentResponse.INVWise)
//             .filter(([key]) => key !== 'Total')
//             .map(([_, data]) => data);
          
//           if (investments.length > 0) {
//             const avgRate = investments.reduce((sum, inv) => sum + inv.IntRate, 0) / investments.length;
//             averageInvestmentRate = avgRate.toFixed(1);
//           }
//         }

//         setApiData({
//           periodData,
//           cashData,
//           bankData,
//           investmentsData,
//           totalCash,
//           totalBank,
//           totalInvestments,
//           averageBankRate,
//           averageInvestmentRate
//         });

//       } catch (err) {
//         setError('Failed to fetch data');
//         console.error('Error fetching asset data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, [open]);

//   // --- Render Functions ---
//   const renderContentWrapper = (children: React.ReactNode) => {
//     return (
//       <Box
//         sx={{
//           border: `1px solid ${COLORS.border}`,
//           borderRadius: '12px',
//           overflow: 'hidden',
//           display: 'flex',
//           flexDirection: 'column',
//           boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
//         }}
//       >
//         {children}
//       </Box>
//     );
//   };

//   const renderPeriodContent = () => {
//     if (loading) {
//       return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//           <Typography>Loading period data...</Typography>
//         </Box>
//       );
//     }

//     if (error) {
//       return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//           <Typography color="error">{error}</Typography>
//         </Box>
//       );
//     }

//     const rowStyle = {
//       display: 'grid',
//       gridTemplateColumns: `repeat(5, 1fr)`,
//       alignItems: 'center',
//       padding: '12px 16px',
//       borderBottom: `1px solid ${COLORS.border}`,
//     };

//     return (
//       <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
//         {renderContentWrapper(
//           <>
//             {/* Table Header */}
//             <Box sx={{ ...rowStyle, py: 1.5, bgcolor: '#fff' }}>
//               <Typography sx={{ fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Period</Typography>
//               <Typography sx={{ fontSize: '11px', fontWeight: 500, color: COLORS.textGrey, textAlign: 'center' }}>Cash (₹L)</Typography>
//               <Typography sx={{ fontSize: '11px', fontWeight: 500, color: COLORS.textGrey, textAlign: 'center' }}>Bank (₹L)</Typography>
//               <Typography sx={{ fontSize: '11px', fontWeight: 500, color: COLORS.textGrey, textAlign: 'center' }}>Inv. (₹L)</Typography>
//               <Typography sx={{ fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textAlign: 'center' }}>Total</Typography>
//             </Box>

//                     {apiData.periodData.map((row, index) => {
//           const isTotalRow = row.period === "Total";
//           const textColor = isTotalRow ? COLORS.primaryBlue : COLORS.textDark;

//           return (
//             <Box key={index} sx={rowStyle}>
//               <Typography sx={{ fontSize: '13px', fontWeight: 500, color: textColor }}>
//                 {row.period}
//               </Typography>
//               <Typography sx={{ fontSize: '13px', fontWeight: 500, color: textColor, textAlign: 'center' }}>
//                 {row.cash}
//               </Typography>
//               <Typography sx={{ fontSize: '13px', fontWeight: 500, color: textColor, textAlign: 'center' }}>
//                 {row.bank}
//               </Typography>
//               <Typography sx={{ fontSize: '13px', fontWeight: 500, color: textColor, textAlign: 'center' }}>
//                 {row.inv}
//               </Typography>
//               <Box sx={{ textAlign: 'center' }}>
//                 <PercentageBadge
//                   value={row.totalGrowth}
//                   type={row.totalGrowth.includes('-') ? 'negative' : 'positive'}
//                 />
//               </Box>
//             </Box>
//           );
//         })}


//             {/* Footer Insight/Comment */}
//             <Box sx={{ bgcolor: COLORS.bgGrey, px: 2, py: 1.5 }}>
//               <Typography sx={{ fontSize: '12px', color: COLORS.textGrey, lineHeight: 1.5 }}>
//                 Current period highlighted • Comprehensive asset performance analysis.
//               </Typography>
//             </Box>
//           </>
//         )}
//       </Box>
//     );
//   };

//   const renderBanksContent = () => {
//     if (loading) {
//       return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//           <Typography>Loading bank data...</Typography>
//         </Box>
//       );
//     }

//     if (error) {
//       return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//           <Typography color="error">{error}</Typography>
//         </Box>
//       );
//     }

//     const cellStyle = { flexShrink: 0, paddingRight: '8px' };
    
//     return (
//       <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
//         {renderContentWrapper(
//           <Box sx={{ overflowX: 'auto', width: '100%' }}>
//             <Box sx={{ minWidth: '300px' }}>
//               {/* Table Header */}
//               <Box sx={{ display: 'flex', px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.border}`, bgcolor: '#fff' }}>
//                 <Typography sx={{ ...cellStyle, width: bankColWidths.name, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Bank Name</Typography>
//                 <Typography sx={{ ...cellStyle, width: bankColWidths.balance, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Balance (₹L)</Typography>
//                 <Typography sx={{ ...cellStyle, width: bankColWidths.rate, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Rate %</Typography>
//               </Box>

//               <Box sx={{ maxHeight: '350px', overflowY: 'auto' }}>
//                 {apiData.bankData.map((row, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       px: 2,
//                       py: 1.5,
//                       borderBottom: `1px solid ${COLORS.border}`,
//                       bgcolor: '#fff',
//                     }}
//                   >
//                     <Typography noWrap sx={{ ...cellStyle, width: bankColWidths.name, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>{row.name}</Typography>
//                     <Typography sx={{ ...cellStyle, width: bankColWidths.balance, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>{row.balance}</Typography>
//                     <Typography sx={{ ...cellStyle, width: bankColWidths.rate, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>{row.rate}</Typography>
//                   </Box>
//                 ))}

//                 {/* Total Row */}
//                 <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, bgcolor: COLORS.bgGrey }}>
//                   <Typography sx={{ ...cellStyle, width: bankColWidths.name, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>Total</Typography>
//                   <Typography sx={{ ...cellStyle, width: bankColWidths.balance, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>{apiData.totalBank}</Typography>
//                   <Typography sx={{ ...cellStyle, width: bankColWidths.rate, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>-</Typography>
//                 </Box>

//                 {/* Average Interest Rate */}
//                 <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, bgcolor: '#E9FCEE' }}>
//                   <Typography sx={{ ...cellStyle, width: bankColWidths.name, fontSize: '13px', fontWeight: 600, color: "#2B8241" }}>
//                     Average Interest Rate:
//                   </Typography>
//                   <Typography sx={{ ...cellStyle, width: bankColWidths.balance, fontSize: '13px', fontWeight: 600, color: "#2B8241" }}>
//                     {apiData.averageBankRate}%
//                   </Typography>
//                   <Typography sx={{ ...cellStyle, width: bankColWidths.rate, fontSize: '13px', fontWeight: 600, color: "#2B8241" }}>
//                     -
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//         )}
//       </Box>
//     );
//   };

//   const renderCashContent = () => {
//     if (loading) {
//       return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//           <Typography>Loading cash data...</Typography>
//         </Box>
//       );
//     }

//     if (error) {
//       return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//           <Typography color="error">{error}</Typography>
//         </Box>
//       );
//     }

//     const cellStyle = { flexShrink: 0, paddingRight: '8px' };
//     const cashColWidths = {
//       branch: '200px',
//       balance: '80px',
//     };

//     return (
//       <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
//         {renderContentWrapper(
//           <Box sx={{ overflowX: 'auto', width: '100%' }}>
//             <Box sx={{ minWidth: '300px' }}>
//               {/* Table Header */}
//               <Box sx={{ display: 'flex', px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.border}`, bgcolor: '#fff' }}>
//                 <Typography sx={{ ...cellStyle, width: cashColWidths.branch, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>
//                   Branch
//                 </Typography>
//                 <Typography sx={{ ...cellStyle, width: cashColWidths.balance, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>
//                   Balance (₹L)
//                 </Typography>
//               </Box>

//               <Box sx={{ maxHeight: '350px', overflowY: 'auto' }}>
//                 {apiData.cashData.map((row, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       px: 2,
//                       py: 1.5,
//                       borderBottom: `1px solid ${COLORS.border}`,
//                       bgcolor: '#fff',
//                     }}
//                   >
//                     <Typography noWrap sx={{ ...cellStyle, width: cashColWidths.branch, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>
//                       {row.branch}
//                     </Typography>
//                     <Typography sx={{ ...cellStyle, width: cashColWidths.balance, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>
//                       {row.balance}
//                     </Typography>
//                   </Box>
//                 ))}

//                 {/* Total Row */}
//                 <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, bgcolor: COLORS.bgGrey }}>
//                   <Typography sx={{ ...cellStyle, width: cashColWidths.branch, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>
//                     Total
//                   </Typography>
//                   <Typography sx={{ ...cellStyle, width: cashColWidths.balance, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>
//                     {apiData.totalCash}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//         )}
//       </Box>
//     );
//   };

//   const renderInvestmentContent = () => {
//     if (loading) {
//       return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//           <Typography>Loading investment data...</Typography>
//         </Box>
//       );
//     }

//     if (error) {
//       return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//           <Typography color="error">{error}</Typography>
//         </Box>
//       );
//     }

//     const cellStyle = { flexShrink: 0, paddingRight: '8px' };
//     const investmentsColWidths = {
//       institution: '130px',
//       balance: '80px',
//       rate: '80px',
//     };

//     return (
//       <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
//         {renderContentWrapper(
//           <Box sx={{ overflowX: 'auto', width: '100%' }}>
//             <Box sx={{ minWidth: '300px' }}>
//               {/* Table Header */}
//               <Box sx={{ display: 'flex', px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.border}`, bgcolor: '#fff' }}>
//                 <Typography sx={{ ...cellStyle, width: investmentsColWidths.institution, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>
//                   Institution
//                 </Typography>
//                 <Typography sx={{ ...cellStyle, width: investmentsColWidths.balance, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>
//                   Balance (₹L)
//                 </Typography>
//                 <Typography sx={{ ...cellStyle, width: investmentsColWidths.rate, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>
//                   Rate %
//                 </Typography>
//               </Box>

//               <Box sx={{ maxHeight: '350px', overflowY: 'auto' }}>
//                 {apiData.investmentsData.map((row, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       px: 2,
//                       py: 1.5,
//                       borderBottom: `1px solid ${COLORS.border}`,
//                       bgcolor: '#fff',
//                     }}
//                   >
//                     <Typography noWrap sx={{ ...cellStyle, width: investmentsColWidths.institution, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>
//                       {row.institution}
//                     </Typography>
//                     <Typography sx={{ ...cellStyle, width: investmentsColWidths.balance, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>
//                       {row.balance}
//                     </Typography>
//                     <Typography sx={{ ...cellStyle, width: investmentsColWidths.rate, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>
//                       {row.rate}
//                     </Typography>
//                   </Box>
//                 ))}

//                 {/* Total Row */}
//                 <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, bgcolor: COLORS.bgGrey }}>
//                   <Typography sx={{ ...cellStyle, width: investmentsColWidths.institution, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>
//                     Total
//                   </Typography>
//                   <Typography sx={{ ...cellStyle, width: investmentsColWidths.balance, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>
//                     {apiData.totalInvestments}
//                   </Typography>
//                   <Typography sx={{ ...cellStyle, width: investmentsColWidths.rate, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>
//                     -
//                   </Typography>
//                 </Box>

//                 {/* Average Interest Rate */}
//                 <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, bgcolor: '#E9FCEE' }}>
//                   <Typography sx={{ ...cellStyle, width: investmentsColWidths.institution, fontSize: '13px', fontWeight: 600, color: "#2B8241" }}>
//                     Average Interest Rate:
//                   </Typography>
//                   <Typography sx={{ ...cellStyle, width: investmentsColWidths.balance, fontSize: '13px', fontWeight: 600, color: "#2B8241" }}>
//                     {apiData.averageInvestmentRate}%
//                   </Typography>
//                   <Typography sx={{ ...cellStyle, width: investmentsColWidths.rate, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>
//                     -
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//         )}
//       </Box>
//     );
//   };

//   // --- Main Render ---
//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       slotProps={{
//         backdrop: {
//           sx: {
//             backgroundColor: 'rgba(0,0,0,0.5)',
//           },
//         },
//       }}
//     >
//       <Slide direction="up" in={open} mountOnEnter unmountOnExit>
//         <Box
//           onClick={(e) => e.stopPropagation()}
//           sx={{
//             position: 'fixed',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             bgcolor: '#fff',
//             borderTopLeftRadius: '24px',
//             borderTopRightRadius: '24px',
//             width: '100%',
//             maxWidth: '100%',
//             height: 'auto',
//             maxHeight: '90vh',
//             display: 'flex',
//             flexDirection: 'column',
//             p: '24px',
//             pb: '32px',
//             gap: '20px',
//             boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.1)',
//             fontFamily: '"Inter", sans-serif',
//             '@media (min-width: 600px)': {
//               maxWidth: '550px',
//               mx: 'auto', 
//               left: 0, 
//               right: 0, 
//               bottom: '16px', 
//               borderRadius: '24px', 
//               borderBottomLeftRadius: '24px',
//               borderBottomRightRadius: '24px',
//             }
//           }}
//         >
//           {/* Header */}
//           <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
//             <Box>
//               <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, color: COLORS.textDark, lineHeight: '28px' }}>
//                 Cash &amp; Investments Details
//               </Typography>
//               <Typography variant="body2" sx={{ fontSize: '14px', color: COLORS.textGrey, fontWeight: 400 }}>
//                 Comprehensive asset analysis
//               </Typography>
//             </Box>
//             <IconButton
//               onClick={onClose}
//               sx={{
//                 p: 0.5,
//                 bgcolor: '#F2F4F7',
//                 '&:hover': { bgcolor: '#EAECF0' }
//               }}
//             >
//               <CloseIcon sx={{ fontSize: 20, color: '#667085' }} />
//             </IconButton>
//           </Box>

//           {/* Custom Tabs */}
//           <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: '4px' }}>
//             {['period', 'cash', 'banks', 'investments'].map((tab) => {
//               const isActive = activeTab === tab;
//               const label = tab.charAt(0).toUpperCase() + tab.slice(1);
//               return (
//                 <Box
//                   key={tab}
//                   onClick={() => setActiveTab(tab as ActiveTab)}
//                   sx={{
//                     flexShrink: 0,
//                     bgcolor: isActive ? COLORS.primaryBlue : '#fff',
//                     border: isActive ? `1px solid ${COLORS.primaryBlue}` : `1px solid ${COLORS.border}`,
//                     borderRadius: '8px',
//                     px: 2,
//                     py: 1,
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     cursor: 'pointer',
//                     transition: 'all 0.2s',
//                     boxShadow: isActive ? '0px 1px 2px rgba(16, 24, 40, 0.05)' : 'none'
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       fontSize: '14px',
//                       color: isActive ? '#fff' : COLORS.textGrey,
//                       fontWeight: 600,
//                       textTransform: 'capitalize'
//                     }}
//                   >
//                     {label === 'Cash' ? 'Cash' : label}
//                   </Typography>
//                 </Box>
//               );
//             })}
//           </Box>

//           {/* Content Area */}
//           {activeTab === 'period' && renderPeriodContent()}
//           {activeTab === 'cash' && renderCashContent()}
//           {activeTab === 'banks' && renderBanksContent()}
//           {activeTab === 'investments' && renderInvestmentContent()}
//         </Box>
//       </Slide>
//     </Modal>
//   );
// };

// export default CashInvestmentsDetailsPopup;
// ========================= AFTER MAKING SEQUENTIAL API CALLS ======================

// src/components/popup/CashInvestmentsDetailsPopup.tsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Modal,
  Slide,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { 
  getAssetPeriodWise, 
  getCashBranchWise, 
  getBankBranchWise, 
  getInvestmentDetails 
} from '../../api/services/assetService';

// --- Types ---
interface CashInvestmentsDetailsPopupProps {
  onClose: () => void;
  open: boolean;
}

type ActiveTab = 'period' | 'cash' | 'banks' | 'investments';

interface BankRowData {
  name: string;
  balance: string;
  rate: string;
}

interface PeriodRowData {
  period: string;
  cash: string;
  bank: string;
  inv: string;
  totalGrowth: string;
}

interface CashRowData {
  branch: string;
  balance: string;
}

interface InvestmentRowData {
  institution: string;
  balance: string;
  rate: string;
}

interface ApiData {
  periodData: PeriodRowData[];
  cashData: CashRowData[];
  bankData: BankRowData[];
  investmentsData: InvestmentRowData[];
  totalCash: string;
  totalBank: string;
  totalInvestments: string;
  averageBankRate: string;
  averageInvestmentRate: string;
}

// --- Constants & Styles ---
const COLORS = {
  primaryBlue: '#0068B5',
  textDark: '#101828',
  textGrey: '#667085',
  bgGreen: '#ECFDF3',
  textGreen: '#027A48',
  bgRed: '#FEF3F2',
  textRed: '#B42318',
  bgGrey: '#F9FAFB',
  border: '#EAECF0',
};

// --- Helper Components ---
const PercentageBadge: React.FC<{ value: string; type?: 'positive' | 'negative' }> = ({ value, type = 'positive' }) => {
  const isPositive = type !== 'negative';
  return (
    <Box
      sx={{
        bgcolor: isPositive ? COLORS.bgGreen : COLORS.bgRed,
        borderRadius: '16px',
        px: '8px',
        py: '2px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: '12px',
          fontWeight: 500,
          color: isPositive ? COLORS.textGreen : COLORS.textRed,
          lineHeight: '18px',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

// Helper function for delays between API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Layout Constants ---
const bankColWidths = {
  name: '130px',
  balance: '80px',
  rate: '80px',
};

// --- Main Component ---
const CashInvestmentsDetailsPopup: React.FC<CashInvestmentsDetailsPopupProps> = ({ onClose, open }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('period');
  const [apiData, setApiData] = useState<ApiData>({
    periodData: [],
    cashData: [],
    bankData: [],
    investmentsData: [],
    totalCash: '0',
    totalBank: '0',
    totalInvestments: '0',
    averageBankRate: '0',
    averageInvestmentRate: '0'
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Sequential data fetching function
  const fetchAllDataSequentially = async () => {
    setLoading(true);
    setError(null);
    setProgress(0);
    
    try {
      console.group('🚀 Cash & Investments Sequential Fetch');
      
      const totalSteps = 4; // 4 API calls total
      let currentStep = 0;
      
      const updateProgress = () => {
        currentStep++;
        const progressPercent = Math.round((currentStep / totalSteps) * 100);
        setProgress(progressPercent);
        console.log(`Progress: ${progressPercent}% (Step ${currentStep}/${totalSteps})`);
      };

      // 1️⃣ ASSET PERIOD WISE
      console.log(`${currentStep + 1}. Fetching Asset Period Wise data...`);
      const periodResponse = await getAssetPeriodWise();
      console.log('PERIOD_WISE_RESPONSE',periodResponse)
      updateProgress();
      await delay(100); // Wait for token update
      
      // Process period data
      let periodData: PeriodRowData[] = [];
      if (periodResponse.Header.RC === "0") {
        const cashData = periodResponse.GrowthWise.find(item => item.TypeName === 'Cash');
        const bankData = periodResponse.GrowthWise.find(item => item.TypeName === 'Bank');
        const invData = periodResponse.GrowthWise.find(item => item.TypeName === 'INV');
        const totalData = periodResponse.GrowthWise.find(item => item.TypeName === 'Total');
        console.log('TOTAL',totalData)
        
        periodData = [
          {
            period: 'Last Day',
            cash: cashData ? (cashData.LastDayBal / 100000).toFixed(1) : '0',
            bank: bankData ? (bankData.LastDayBal / 100000).toFixed(1) : '0',
            inv: invData ? (invData.LastDayBal / 100000).toFixed(1) : '0',
            // totalGrowth: totalData ? `${((totalData.LastDayBal - totalData.LastYearBal) / totalData.LastYearBal * 100).toFixed(1)}%` : '0%'
            totalGrowth: totalData ? (totalData.LastDayBal / 100000).toFixed(1) : '0'
          },
          {
            period: 'Last Month',
            cash: cashData ? (cashData.LastMonthBal / 100000).toFixed(1) : '0',
            bank: bankData ? (bankData.LastMonthBal / 100000).toFixed(1) : '0',
            inv: invData ? (invData.LastMonthBal / 100000).toFixed(1) : '0',
            // totalGrowth: totalData ? `${((totalData.LastMonthBal - totalData.LastYearBal) / totalData.LastYearBal * 100).toFixed(1)}%` : '0%'
             totalGrowth: totalData ? (totalData.LastMonthBal / 100000).toFixed(1) : '0'
          },
          {
            period: 'Last Year',
            cash: cashData ? (cashData.LastYearBal / 100000).toFixed(1) : '0',
            bank: bankData ? (bankData.LastYearBal / 100000).toFixed(1) : '0',
            inv: invData ? (invData.LastYearBal / 100000).toFixed(1) : '0',
            // totalGrowth: '0%'
             totalGrowth: totalData ? (totalData.LastYearBal / 100000).toFixed(1) : '0'
          },
          {
            period: 'Total',
            cash: cashData ? (cashData.Total / 100000).toFixed(1) : '0',
            bank: bankData ? (bankData.Total / 100000).toFixed(1) : '0',
            inv: invData ? (invData.Total / 100000).toFixed(1) : '0',
            // totalGrowth: '0%'
             totalGrowth: totalData ? (totalData.Total / 100000).toFixed(1) : '0'
          }
        ];
      }

      setApiData(prev => ({
        ...prev,
        periodData
      }));
      console.log('✅ Asset Period Wise loaded');
      await delay(100);

      // 2️⃣ CASH BRANCH WISE
      console.log(`${currentStep + 1}. Fetching Cash Branch Wise data...`);
      const cashResponse = await getCashBranchWise();
      updateProgress();
      await delay(100);
      
      // Process cash data
      let cashData: CashRowData[] = [];
      let totalCash = '0';
      if (cashResponse.Header.RC === "0") {
        cashData = Object.entries(cashResponse.BranchWise)
          .filter(([key]) => key !== 'Total')
          .map(([_, data]) => ({
            branch: data.BranchName,
            balance: (data.Balance / 100000).toFixed(1)
          }));
        
        totalCash = cashResponse.BranchWise.Total ? 
          (cashResponse.BranchWise.Total.Balance / 100000).toFixed(1) : '0';
      }

      setApiData(prev => ({
        ...prev,
        cashData,
        totalCash
      }));
      console.log('✅ Cash Branch Wise loaded');
      await delay(100);

      // 3️⃣ BANK BRANCH WISE
      console.log(`${currentStep + 1}. Fetching Bank Branch Wise data...`);
      const bankResponse = await getBankBranchWise();
      updateProgress();
      await delay(100);
      
      // Process bank data
      let bankData: BankRowData[] = [];
      let totalBank = '0';
      let averageBankRate = '0';
      if (bankResponse.Header.RC === "0") {
        bankData = Object.entries(bankResponse.BankWise)
          .filter(([key]) => key !== 'Total')
          .map(([_, data]) => ({
            name: data.BankName,
            balance: (data.Balance / 100000).toFixed(1),
            rate: `${data.IntRate}%`
          }));
        
        totalBank = bankResponse.BankWise.Total ? 
          (bankResponse.BankWise.Total.Balance / 100000).toFixed(1) : '0';
        
        // Calculate average interest rate
        const banks = Object.entries(bankResponse.BankWise)
          .filter(([key]) => key !== 'Total')
          .map(([_, data]) => data);
        
        if (banks.length > 0) {
          const avgRate = banks.reduce((sum, bank) => sum + bank.IntRate, 0) / banks.length;
          averageBankRate = avgRate.toFixed(1);
        }
      }

      setApiData(prev => ({
        ...prev,
        bankData,
        totalBank,
        averageBankRate
      }));
      console.log('✅ Bank Branch Wise loaded');
      await delay(100);

      // 4️⃣ INVESTMENT DETAILS
      console.log(`${currentStep + 1}. Fetching Investment Details...`);
      const investmentResponse = await getInvestmentDetails();
      updateProgress();
      
      // Process investment data
      let investmentsData: InvestmentRowData[] = [];
      let totalInvestments = '0';
      let averageInvestmentRate = '0';
      if (investmentResponse.Header.RC === "0") {
        investmentsData = Object.entries(investmentResponse.INVWise)
          .filter(([key]) => key !== 'Total')
          .map(([_, data]) => ({
            institution: data.INVName,
            balance: (data.Balance / 100000).toFixed(1),
            rate: `${data.IntRate}%`
          }));
        
        totalInvestments = investmentResponse.INVWise.Total ? 
          (investmentResponse.INVWise.Total.Balance / 100000).toFixed(1) : '0';
        
        // Calculate average interest rate
        const investments = Object.entries(investmentResponse.INVWise)
          .filter(([key]) => key !== 'Total')
          .map(([_, data]) => data);
        
        if (investments.length > 0) {
          const avgRate = investments.reduce((sum, inv) => sum + inv.IntRate, 0) / investments.length;
          averageInvestmentRate = avgRate.toFixed(1);
        }
      }

      setApiData(prev => ({
        ...prev,
        investmentsData,
        totalInvestments,
        averageInvestmentRate
      }));
      console.log('✅ Investment Details loaded');

      setInitialLoad(true);
      console.log('🎉 All cash & investment data loaded sequentially!');
      console.groupEnd();
      
    } catch (err: any) {
      console.error('❌ Error in sequential cash & investments fetch:', err);
      setError(err.message || 'Failed to load cash & investments data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all data when popup opens - Sequential
  useEffect(() => {
    if (open && !initialLoad) {
      fetchAllDataSequentially();
    }
  }, [open, initialLoad]);

  // Reset when popup closes
  useEffect(() => {
    if (!open) {
      setApiData({
        periodData: [],
        cashData: [],
        bankData: [],
        investmentsData: [],
        totalCash: '0',
        totalBank: '0',
        totalInvestments: '0',
        averageBankRate: '0',
        averageInvestmentRate: '0'
      });
      setActiveTab('period');
      setInitialLoad(false);
      setError(null);
      setProgress(0);
    }
  }, [open]);

  // --- Render Functions ---
  const renderContentWrapper = (children: React.ReactNode) => {
    return (
      <Box
        sx={{
          border: `1px solid ${COLORS.border}`,
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
        }}
      >
        {children}
      </Box>
    );
  };

  const renderPeriodContent = () => {
    if (loading && !initialLoad) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading period data...</Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography color="error">{error}</Typography>
        </Box>
      );
    }

    const rowStyle = {
      display: 'grid',
      gridTemplateColumns: `repeat(5, 1fr)`,
      alignItems: 'center',
      padding: '12px 16px',
      borderBottom: `1px solid ${COLORS.border}`,
    };

    return (
      <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {renderContentWrapper(
          <>
            {/* Table Header */}
            <Box sx={{ ...rowStyle, py: 1.5, bgcolor: '#fff' }}>
              <Typography sx={{ fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Period</Typography>
              <Typography sx={{ fontSize: '11px', fontWeight: 500, color: COLORS.textGrey, textAlign: 'center' }}>Cash (₹L)</Typography>
              <Typography sx={{ fontSize: '11px', fontWeight: 500, color: COLORS.textGrey, textAlign: 'center' }}>Bank (₹L)</Typography>
              <Typography sx={{ fontSize: '11px', fontWeight: 500, color: COLORS.textGrey, textAlign: 'center' }}>Inv. (₹L)</Typography>
              <Typography sx={{ fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textAlign: 'center' }}>Total</Typography>
            </Box>

            {apiData.periodData.map((row, index) => {
              const isTotalRow = row.period === "Total";
              const textColor = isTotalRow ? COLORS.primaryBlue : COLORS.textDark;

              return (
                <Box key={index} sx={rowStyle}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 500, color: textColor }}>
                    {row.period}
                  </Typography>
                  <Typography sx={{ fontSize: '13px', fontWeight: 500, color: textColor, textAlign: 'center' }}>
                    {row.cash}
                  </Typography>
                  <Typography sx={{ fontSize: '13px', fontWeight: 500, color: textColor, textAlign: 'center' }}>
                    {row.bank}
                  </Typography>
                  <Typography sx={{ fontSize: '13px', fontWeight: 500, color: textColor, textAlign: 'center' }}>
                    {row.inv}
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <PercentageBadge
                      value={row.totalGrowth}
                      type={row.totalGrowth.includes('-') ? 'negative' : 'positive'}
                    />
                  </Box>
                </Box>
              );
            })}

            {/* Footer Insight/Comment */}
            <Box sx={{ bgcolor: COLORS.bgGrey, px: 2, py: 1.5 }}>
              <Typography sx={{ fontSize: '12px', color: COLORS.textGrey, lineHeight: 1.5 }}>
                Current period highlighted • Comprehensive asset performance analysis.
              </Typography>
            </Box>
          </>
        )}
      </Box>
    );
  };

  const renderBanksContent = () => {
    if (loading && !initialLoad) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading bank data...</Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography color="error">{error}</Typography>
        </Box>
      );
    }

    const cellStyle = { flexShrink: 0, paddingRight: '8px' };
    
    return (
      <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {renderContentWrapper(
          <Box sx={{ overflowX: 'auto', width: '100%' }}>
            <Box sx={{ minWidth: '300px' }}>
              {/* Table Header */}
              <Box sx={{ display: 'flex', px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.border}`, bgcolor: '#fff' }}>
                <Typography sx={{ ...cellStyle, width: bankColWidths.name, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Bank Name</Typography>
                <Typography sx={{ ...cellStyle, width: bankColWidths.balance, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Balance (₹L)</Typography>
                <Typography sx={{ ...cellStyle, width: bankColWidths.rate, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Rate %</Typography>
              </Box>

              <Box sx={{ maxHeight: '350px', overflowY: 'auto' }}>
                {apiData.bankData.map((row, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      px: 2,
                      py: 1.5,
                      borderBottom: `1px solid ${COLORS.border}`,
                      bgcolor: '#fff',
                    }}
                  >
                    <Typography noWrap sx={{ ...cellStyle, width: bankColWidths.name, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>{row.name}</Typography>
                    <Typography sx={{ ...cellStyle, width: bankColWidths.balance, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>{row.balance}</Typography>
                    <Typography sx={{ ...cellStyle, width: bankColWidths.rate, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>{row.rate}</Typography>
                  </Box>
                ))}

                {/* Total Row */}
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, bgcolor: COLORS.bgGrey }}>
                  <Typography sx={{ ...cellStyle, width: bankColWidths.name, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>Total</Typography>
                  <Typography sx={{ ...cellStyle, width: bankColWidths.balance, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>{apiData.totalBank}</Typography>
                  <Typography sx={{ ...cellStyle, width: bankColWidths.rate, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>-</Typography>
                </Box>

                {/* Average Interest Rate */}
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, bgcolor: '#E9FCEE' }}>
                  <Typography sx={{ ...cellStyle, width: bankColWidths.name, fontSize: '13px', fontWeight: 600, color: "#2B8241" }}>
                    Average Interest Rate:
                  </Typography>
                  <Typography sx={{ ...cellStyle, width: bankColWidths.balance, fontSize: '13px', fontWeight: 600, color: "#2B8241" }}>
                    {apiData.averageBankRate}%
                  </Typography>
                  <Typography sx={{ ...cellStyle, width: bankColWidths.rate, fontSize: '13px', fontWeight: 600, color: "#2B8241" }}>
                    -
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    );
  };

  const renderCashContent = () => {
    if (loading && !initialLoad) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading cash data...</Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography color="error">{error}</Typography>
        </Box>
      );
    }

    const cellStyle = { flexShrink: 0, paddingRight: '8px' };
    const cashColWidths = {
      branch: '200px',
      balance: '80px',
    };

    return (
      <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {renderContentWrapper(
          <Box sx={{ overflowX: 'auto', width: '100%' }}>
            <Box sx={{ minWidth: '300px' }}>
              {/* Table Header */}
              <Box sx={{ display: 'flex', px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.border}`, bgcolor: '#fff' }}>
                <Typography sx={{ ...cellStyle, width: cashColWidths.branch, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>
                  Branch
                </Typography>
                <Typography sx={{ ...cellStyle, width: cashColWidths.balance, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>
                  Balance (₹L)
                </Typography>
              </Box>

              <Box sx={{ maxHeight: '350px', overflowY: 'auto' }}>
                {apiData.cashData.map((row, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      px: 2,
                      py: 1.5,
                      borderBottom: `1px solid ${COLORS.border}`,
                      bgcolor: '#fff',
                    }}
                  >
                    <Typography noWrap sx={{ ...cellStyle, width: cashColWidths.branch, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>
                      {row.branch}
                    </Typography>
                    <Typography sx={{ ...cellStyle, width: cashColWidths.balance, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>
                      {row.balance}
                    </Typography>
                  </Box>
                ))}

                {/* Total Row */}
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, bgcolor: COLORS.bgGrey }}>
                  <Typography sx={{ ...cellStyle, width: cashColWidths.branch, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>
                    Total
                  </Typography>
                  <Typography sx={{ ...cellStyle, width: cashColWidths.balance, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>
                    {apiData.totalCash}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    );
  };

  const renderInvestmentContent = () => {
    if (loading && !initialLoad) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading investment data...</Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography color="error">{error}</Typography>
        </Box>
      );
    }

    const cellStyle = { flexShrink: 0, paddingRight: '8px' };
    const investmentsColWidths = {
      institution: '130px',
      balance: '80px',
      rate: '80px',
    };

    return (
      <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {renderContentWrapper(
          <Box sx={{ overflowX: 'auto', width: '100%' }}>
            <Box sx={{ minWidth: '300px' }}>
              {/* Table Header */}
              <Box sx={{ display: 'flex', px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.border}`, bgcolor: '#fff' }}>
                <Typography sx={{ ...cellStyle, width: investmentsColWidths.institution, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>
                  Institution
                </Typography>
                <Typography sx={{ ...cellStyle, width: investmentsColWidths.balance, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>
                  Balance (₹L)
                </Typography>
                <Typography sx={{ ...cellStyle, width: investmentsColWidths.rate, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>
                  Rate %
                </Typography>
              </Box>

              <Box sx={{ maxHeight: '350px', overflowY: 'auto' }}>
                {apiData.investmentsData.map((row, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      px: 2,
                      py: 1.5,
                      borderBottom: `1px solid ${COLORS.border}`,
                      bgcolor: '#fff',
                    }}
                  >
                    <Typography noWrap sx={{ ...cellStyle, width: investmentsColWidths.institution, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>
                      {row.institution}
                    </Typography>
                    <Typography sx={{ ...cellStyle, width: investmentsColWidths.balance, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>
                      {row.balance}
                    </Typography>
                    <Typography sx={{ ...cellStyle, width: investmentsColWidths.rate, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>
                      {row.rate}
                    </Typography>
                  </Box>
                ))}

                {/* Total Row */}
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, bgcolor: COLORS.bgGrey }}>
                  <Typography sx={{ ...cellStyle, width: investmentsColWidths.institution, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>
                    Total
                  </Typography>
                  <Typography sx={{ ...cellStyle, width: investmentsColWidths.balance, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>
                    {apiData.totalInvestments}
                  </Typography>
                  <Typography sx={{ ...cellStyle, width: investmentsColWidths.rate, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>
                    -
                  </Typography>
                </Box>

                {/* Average Interest Rate */}
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, bgcolor: '#E9FCEE' }}>
                  <Typography sx={{ ...cellStyle, width: investmentsColWidths.institution, fontSize: '13px', fontWeight: 600, color: "#2B8241" }}>
                    Average Interest Rate:
                  </Typography>
                  <Typography sx={{ ...cellStyle, width: investmentsColWidths.balance, fontSize: '13px', fontWeight: 600, color: "#2B8241" }}>
                    {apiData.averageInvestmentRate}%
                  </Typography>
                  <Typography sx={{ ...cellStyle, width: investmentsColWidths.rate, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>
                    -
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    );
  };

  // Show loading overlay
  if (loading && !initialLoad) {
    return (
      <Modal
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
            },
          },
        }}
      >
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: '#fff',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              width: '100%',
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              p: '24px',
              pb: '32px',
              gap: '20px',
              boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.1)',
              fontFamily: '"Inter", sans-serif',
              alignItems: 'center',
              justifyContent: 'center',
              '@media (min-width: 600px)': {
                maxWidth: '550px',
                mx: 'auto', 
                left: 0, 
                right: 0, 
                bottom: '16px', 
                borderRadius: '24px', 
                borderBottomLeftRadius: '24px',
                borderBottomRightRadius: '24px',
              }
            }}
          >
            <CircularProgress size={48} />
            <Typography variant="h6" sx={{ fontFamily: '"Inter", sans-serif', mt: 2 }}>
              Loading Cash & Investments Data...
            </Typography>
            <Box sx={{ width: '80%', mt: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: '"Inter", sans-serif', 
                  textAlign: 'center', 
                  mt: 1,
                  color: 'text.secondary'
                }}
              >
                {progress}% complete
              </Typography>
            </Box>
          </Box>
        </Slide>
      </Modal>
    );
  }

  // --- Main Render ---
  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        },
      }}
    >
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: '#fff',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            p: '24px',
            pb: '32px',
            gap: '20px',
            boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.1)',
            fontFamily: '"Inter", sans-serif',
            '@media (min-width: 600px)': {
              maxWidth: '550px',
              mx: 'auto', 
              left: 0, 
              right: 0, 
              bottom: '16px', 
              borderRadius: '24px', 
              borderBottomLeftRadius: '24px',
              borderBottomRightRadius: '24px',
            }
          }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, color: COLORS.textDark, lineHeight: '28px' }}>
                Cash &amp; Investments Details
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '14px', color: COLORS.textGrey, fontWeight: 400 }}>
                Comprehensive asset analysis
              </Typography>
            </Box>
            <IconButton
              onClick={onClose}
              sx={{
                p: 0.5,
                bgcolor: '#F2F4F7',
                '&:hover': { bgcolor: '#EAECF0' }
              }}
            >
              <CloseIcon sx={{ fontSize: 20, color: '#667085' }} />
            </IconButton>
          </Box>

          {/* Error Message */}
          {error && (
            <Box
              sx={{
                bgcolor: '#FFE6E6',
                border: '1px solid #FFCDD2',
                borderRadius: 1,
                p: 2,
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 14,
                  color: '#D32F2F',
                  textAlign: 'center',
                }}
              >
                {error}
              </Typography>
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <button 
                  onClick={fetchAllDataSequentially}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Retry
                </button>
              </Box>
            </Box>
          )}

          {/* Custom Tabs */}
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: '4px' }}>
            {['period', 'cash', 'banks', 'investments'].map((tab) => {
              const isActive = activeTab === tab;
              const label = tab.charAt(0).toUpperCase() + tab.slice(1);
              return (
                <Box
                  key={tab}
                  onClick={() => setActiveTab(tab as ActiveTab)}
                  sx={{
                    flexShrink: 0,
                    bgcolor: isActive ? COLORS.primaryBlue : '#fff',
                    border: isActive ? `1px solid ${COLORS.primaryBlue}` : `1px solid ${COLORS.border}`,
                    borderRadius: '8px',
                    px: 2,
                    py: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isActive ? '0px 1px 2px rgba(16, 24, 40, 0.05)' : 'none'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: isActive ? '#fff' : COLORS.textGrey,
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}
                  >
                    {label === 'Cash' ? 'Cash' : label}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* Content Area */}
          {activeTab === 'period' && renderPeriodContent()}
          {activeTab === 'cash' && renderCashContent()}
          {activeTab === 'banks' && renderBanksContent()}
          {activeTab === 'investments' && renderInvestmentContent()}
        </Box>
      </Slide>
    </Modal>
  );
};

export default CashInvestmentsDetailsPopup;