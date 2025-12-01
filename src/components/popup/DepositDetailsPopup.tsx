// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   IconButton,
//   Modal, // 💡 Added Modal
//   Slide, // 💡 Added Slide
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { getDepositBranchWise, getDepositGrowthWise } from '../../api/services/depositService';

// // --- Types ---

// // 💡 Updated Props to include 'open' for modal control
// interface DepositDetailsPopupProps {
//   onClose: () => void;
//   open: boolean; 
// }

// interface BranchData {
//   name: string;
//   balance: string;
//   growthVal: string;
//   growthPercent: string;
//   accounts: string;
//   growthColor?: string;
//   percentBg?: string;
//   percentColor?: string;
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
//   const isPositive = type === 'positive';
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

// // --- Main Component ---

// const DepositDetailsPopup: React.FC<DepositDetailsPopupProps> = ({ onClose, open }) => { // 💡 Destructure 'open'
//   const [activeTab, setActiveTab] = useState<'growth' | 'branch'>('growth');

//   // --- Data ---
//   const branchData: BranchData[] = [
//     { name: 'Main Branch', balance: '125.4', growthVal: '+12.8%', growthPercent: '4.2%', accounts: '1832', growthColor: '#027A48', percentBg: COLORS.bgGreen, percentColor: COLORS.textGreen },
//     { name: 'East Zone', balance: '125.4', growthVal: '+12.8%', growthPercent: '4.2%', accounts: '1832', growthColor: '#027A48', percentBg: COLORS.bgGreen, percentColor: COLORS.textGreen },
//     { name: 'West Zone', balance: '125.4', growthVal: '+12.8%', growthPercent: '4.2%', accounts: '1832', growthColor: '#027A48', percentBg: COLORS.bgGreen, percentColor: COLORS.textGreen },
//     { name: 'City Center', balance: '125.4', growthVal: '+12.8%', growthPercent: '4.2%', accounts: '1832', growthColor: '#027A48', percentBg: COLORS.bgGreen, percentColor: COLORS.textGreen },
//     { name: 'North Plaza', balance: '125.4', growthVal: '+5.2%', growthPercent: '3.6%', accounts: '892', growthColor: '#0068B5', percentBg: '#EFF8FF', percentColor: '#175CD3' },
//     { name: 'Kannur Town', balance: '125.4', growthVal: '+1.2%', growthPercent: '1.2%', accounts: '412', growthColor: '#B54708', percentBg: '#FFFAEB', percentColor: '#B54708' },
//   ];

//   const branchColWidths = {
//     branch: '140px',
//     balance: '80px',
//     growth: '80px',
//     percent: '80px',
//     accounts: '80px',
//   };

//   const minTableWidth = '500px';

//   // --- Render Functions ---

//   const renderGrowthContent = () => {
//     const rowStyle = {
//       display: 'grid',
//       gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr',
//       alignItems: 'center',
//       padding: '12px 16px',
//       borderBottom: `1px solid ${COLORS.border}`,
//     };

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
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             px: 2,
//             py: 1.5,
//             borderBottom: `1px solid ${COLORS.border}`,
//             bgcolor: '#fff',
//           }}
//         >
//           <Typography sx={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark }}>Todays Growth</Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Typography sx={{ fontSize: '12px', color: COLORS.textGrey }}>Overall Growth</Typography>
//             <PercentageBadge value="+4.3%" type="positive" />
//           </Box>
//         </Box>

//         <Box sx={{ ...rowStyle, py: 1.5, bgcolor: '#fff' }}>
//           <Typography sx={{ fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>VS</Typography>
//           <Typography sx={{ fontSize: '11px', fontWeight: 500, color: COLORS.textGrey, textAlign: 'center' }}>SB/CA</Typography>
//           <Typography sx={{ fontSize: '11px', fontWeight: 500, color: COLORS.textGrey, textAlign: 'center' }}>DAILY</Typography>
//           <Typography sx={{ fontSize: '11px', fontWeight: 500, color: COLORS.textGrey, textAlign: 'center' }}>TERM</Typography>
//           <Typography sx={{ fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textAlign: 'center' }}>OVERALL</Typography>
//         </Box>

//         <Box sx={rowStyle}>
//           <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.primaryBlue }}>Yesterday</Typography>
//           <Box sx={{ textAlign: 'center' }}><PercentageBadge value="+4.3%" /></Box>
//           <Box sx={{ textAlign: 'center' }}><PercentageBadge value="+4.3%" /></Box>
//           <Box sx={{ textAlign: 'center' }}><PercentageBadge value="-4.2%" type="negative" /></Box>
//           <Box sx={{ textAlign: 'center' }}><PercentageBadge value="+4.3%" /></Box>
//         </Box>

//         <Box sx={rowStyle}>
//           <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.primaryBlue }}>Last Month</Typography>
//           <Box sx={{ textAlign: 'center' }}><PercentageBadge value="+4.3%" /></Box>
//           <Box sx={{ textAlign: 'center' }}><PercentageBadge value="-4.2%" type="negative" /></Box>
//           <Box sx={{ textAlign: 'center' }}><PercentageBadge value="+4.3%" /></Box>
//           <Box sx={{ textAlign: 'center' }}><PercentageBadge value="-4.2%" type="negative" /></Box>
//         </Box>

//         <Box sx={rowStyle}>
//           <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.primaryBlue }}>Last year</Typography>
//           <Box sx={{ textAlign: 'center' }}><PercentageBadge value="-4.2%" type="negative" /></Box>
//           <Box sx={{ textAlign: 'center' }}><PercentageBadge value="+4.3%" /></Box>
//           <Box sx={{ textAlign: 'center' }}><PercentageBadge value="-4.2%" type="negative" /></Box>
//           <Box sx={{ textAlign: 'center' }}><PercentageBadge value="+4.3%" /></Box>
//         </Box>

//         <Box sx={{ bgcolor: COLORS.bgGrey, px: 2, py: 1.5 }}>
//           <Typography sx={{ fontSize: '12px', color: COLORS.textGrey, lineHeight: 1.5 }}>
//             Term deposits experiencing slight decline- Consider promoting campaigns to boost this category.
//           </Typography>
//         </Box>
//       </Box>
//     );
//   };

//   const renderBranchContent = () => {
//     const cellStyle = { flexShrink: 0, paddingRight: '8px' };

//     return (
//       <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
//         <Box
//           sx={{
//             border: `1px solid ${COLORS.border}`,
//             borderRadius: '12px',
//             overflow: 'hidden',
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <Box sx={{ overflowX: 'auto', width: '100%' }}>
//             <Box sx={{ minWidth: minTableWidth }}>

//               <Box sx={{ display: 'flex', px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.border}`, bgcolor: '#fff' }}>
//                 <Typography sx={{ ...cellStyle, width: branchColWidths.branch, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Branch</Typography>
//                 <Typography sx={{ ...cellStyle, width: branchColWidths.balance, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Balance (₹L)</Typography>
//                 <Typography sx={{ ...cellStyle, width: branchColWidths.growth, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Growth (₹L)</Typography>
//                 <Typography sx={{ ...cellStyle, width: branchColWidths.percent, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Growth %</Typography>
//                 <Typography sx={{ ...cellStyle, width: branchColWidths.accounts, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Accounts</Typography>
//               </Box>

//               <Box sx={{ maxHeight: '350px', overflowY: 'auto' }}>
//                 {branchData.map((row, index) => (
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
//                     <Typography noWrap sx={{ ...cellStyle, width: branchColWidths.branch, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>{row.name}</Typography>
//                     <Typography sx={{ ...cellStyle, width: branchColWidths.balance, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>{row.balance}</Typography>
//                     <Typography sx={{ ...cellStyle, width: branchColWidths.growth, fontSize: '13px', fontWeight: 500, color: row.growthColor }}>{row.growthVal}</Typography>
//                     <Box sx={{ ...cellStyle, width: branchColWidths.percent }}>
//                       <Box sx={{ bgcolor: row.percentBg, borderRadius: '16px', px: 1, py: 0.5, display: 'inline-block' }}>
//                         <Typography sx={{ fontSize: '12px', fontWeight: 600, color: row.percentColor, lineHeight: 1 }}>{row.growthPercent}</Typography>
//                       </Box>
//                     </Box>
//                     <Typography sx={{ ...cellStyle, width: branchColWidths.accounts, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>{row.accounts}</Typography>
//                   </Box>
//                 ))}

//                 <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, bgcolor: '#F9FAFB' }}>
//                   <Typography sx={{ ...cellStyle, width: branchColWidths.branch, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>Total</Typography>
//                   <Typography sx={{ ...cellStyle, width: branchColWidths.balance, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>360.1</Typography>
//                   <Typography sx={{ ...cellStyle, width: branchColWidths.growth, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>12.5</Typography>
//                   <Typography sx={{ ...cellStyle, width: branchColWidths.percent, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>360.1</Typography>
//                   <Typography sx={{ ...cellStyle, width: branchColWidths.accounts, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>12.5</Typography>
//                 </Box>
//               </Box>

//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     );
//   };

//   // --- Main Render (Using Modal and Slide) ---
//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       slotProps={{
//         backdrop: {
//           sx: {
//             // Match the desired dark overlay
//             backgroundColor: 'rgba(0,0,0,0.5)',
//           },
//         },
//       }}
//     >
//       <Slide direction="up" in={open} mountOnEnter unmountOnExit>
//         {/* Container for the content, positioned at the bottom */}
//         <Box
//           // 💡 Styles moved from the outer Box to this one for animation
//           sx={{
//             position: 'fixed',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             bgcolor: '#fff',
//             borderTopLeftRadius: '24px',
//             borderTopRightRadius: '24px',
//             width: '100%',
//             height: 'auto',
//             maxHeight: '90vh',
//             display: 'flex',
//             flexDirection: 'column',
//             p: '24px',
//             pb: '32px',
//             gap: '20px',
//             boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.1)',
//             fontFamily: '"Inter", sans-serif',
//             // Desktop width constraint
//             '@media (min-width: 600px)': {
//               maxWidth: '500px',
//               mx: 'auto', // Center horizontally
//               left: 0, // Override fixed positioning for centering
//               right: 0, // Override fixed positioning for centering
//               bottom: '16px', // Add margin bottom on desktop
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
//                 Deposit Details
//               </Typography>
//               <Typography variant="body2" sx={{ fontSize: '14px', color: COLORS.textGrey, fontWeight: 400 }}>
//                 Comprehensive deposit analysis
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
//           <Box sx={{ display: 'flex', gap: 1.5 }}>
//             {['growth', 'branch'].map((tab) => {
//               const isActive = activeTab === tab;
//               return (
//                 <Box
//                   key={tab}
//                   onClick={() => setActiveTab(tab as 'growth' | 'branch')}
//                   sx={{
//                     flex: 1,
//                     bgcolor: isActive ? COLORS.primaryBlue : '#fff',
//                     border: isActive ? `1px solid ${COLORS.primaryBlue}` : `1px solid ${COLORS.border}`,
//                     borderRadius: '8px',
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
//                       color: isActive ? '#fff' : '#344054',
//                       fontWeight: 600,
//                       textTransform: 'capitalize'
//                     }}
//                   >
//                     {tab}
//                   </Typography>
//                 </Box>
//               );
//             })}
//           </Box>

//           {/* Content Area */}
//           {activeTab === 'growth' ? renderGrowthContent() : renderBranchContent()}

//         </Box>
//       </Slide>
//     </Modal>
//   );
// };

// export default DepositDetailsPopup;
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getDepositBranchWise, getDepositGrowthWise } from '../../api/services/depositService';

// --- Types ---
interface DepositDetailsPopupProps {
  onClose: () => void;
  open: boolean; 
}

interface BranchData {
  name: string;
  balance: string;
  growthVal: string;
  growthPercent: string;
  accounts: string;
  growthColor?: string;
  percentBg?: string;
  percentColor?: string;
}

interface GrowthData {
  typeName: string;
  yesterday: number;
  lastMonth: number;
  lastYear: number;
}

interface ApiData {
  branchData: BranchData[];
  growthData: GrowthData[];
  totalData: {
    balance: string;
    growth: string;
    growthPercent: string;
    growthPercentValue: number;
    accounts: string;
  } | null;
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
  const isPositive = type === 'positive';
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

// --- Main Component ---
const DepositDetailsPopup: React.FC<DepositDetailsPopupProps> = ({ onClose, open }) => {
  const [activeTab, setActiveTab] = useState<'growth' | 'branch'>('growth');
  const [apiData, setApiData] = useState<ApiData>({
    branchData: [],
    growthData: [],
    totalData: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- API Calls - Fetch both APIs when modal opens ---
  useEffect(() => {
    const fetchAllData = async () => {
      if (!open) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch both APIs in parallel
        const [branchResponse, growthResponse] = await Promise.all([
          getDepositBranchWise(),
          getDepositGrowthWise()
        ]);

        let branchData: BranchData[] = [];
        let totalData = null;

        // Process branch data
        if (branchResponse.Header.RC === "0") {
          branchData = Object.entries(branchResponse.BranchWise)
            .filter(([key]) => key !== 'Total') // Exclude Total from main list
            .map(([branchName, data]) => {
              const growthPercent = data.GrowthPer;
              const isPositive = growthPercent >= 0;
              return {
                name: branchName,
                balance: (data.Balance / 100000).toFixed(1), // Convert to lakhs
                growthVal: data.Growth >= 0 ? `+${(data.Growth / 100000).toFixed(1)}` : `${(data.Growth / 100000).toFixed(1)}`,
                growthPercent: `${growthPercent.toFixed(1)}%`,
                accounts: data.BranchAccs.toString(),
                growthColor: isPositive ? COLORS.textGreen : COLORS.textRed,
                percentBg: isPositive ? COLORS.bgGreen : COLORS.bgRed,
                percentColor: isPositive ? COLORS.textGreen : COLORS.textRed,
              };
            });

          // Get total data
          const totalBranchData = branchResponse.BranchWise.Total;
          if (totalBranchData) {
            totalData = {
              balance: (totalBranchData.Balance / 100000).toFixed(1),
              growth: totalBranchData.Growth >= 0 ? `+${(totalBranchData.Growth / 100000).toFixed(1)}` : `${(totalBranchData.Growth / 100000).toFixed(1)}`,
              growthPercent: `${totalBranchData.GrowthPer.toFixed(1)}%`,
              growthPercentValue: totalBranchData.GrowthPer,
              accounts: totalBranchData.BranchAccs.toString(),
            };
          }
        }

        // Process growth data
        let growthData: GrowthData[] = [];
        if (growthResponse.Header.RC === "0") {
          growthData = growthResponse.GrowthWise.map(item => ({
            typeName: item.TypeName,
            yesterday: item.LastDayPer,
            lastMonth: item.LastMonthPer,
            lastYear: item.LastYearPer,
          }));
        }

        setApiData({
          branchData,
          growthData,
          totalData
        });

      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching deposit data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [open]); // Only depend on open prop

  const branchColWidths = {
    branch: '140px',
    balance: '80px',
    growth: '80px',
    percent: '80px',
    accounts: '80px',
  };

  const minTableWidth = '500px';

  // --- Render Functions ---
  const renderGrowthContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography>Loading growth data...</Typography>
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
      gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr',
      alignItems: 'center',
      padding: '12px 16px',
      borderBottom: `1px solid ${COLORS.border}`,
    };

    // Find overall growth data
    const overallGrowth = apiData.growthData.find(item => item.typeName === 'OVERALL');
    const overallGrowthValue = overallGrowth ? overallGrowth.yesterday : 0;

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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            borderBottom: `1px solid ${COLORS.border}`,
            bgcolor: '#fff',
          }}
        >
          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark }}>Today's Growth</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: '12px', color: COLORS.textGrey }}>Overall Growth</Typography>
            <PercentageBadge 
              value={`${overallGrowthValue >= 0 ? '+' : ''}${overallGrowthValue.toFixed(1)}%`} 
              type={overallGrowthValue >= 0 ? 'positive' : 'negative'} 
            />
          </Box>
        </Box>

        {/* Header Row */}
        <Box sx={{ ...rowStyle, py: 1.5, bgcolor: '#fff' }}>
          <Typography sx={{ fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>VS</Typography>
          {apiData.growthData.map((item) => (
            <Typography 
              key={item.typeName}
              sx={{ fontSize: '11px', fontWeight: 500, color: COLORS.textGrey, textAlign: 'center' }}
            >
              {item.typeName}
            </Typography>
          ))}
        </Box>

        {/* Yesterday Row */}
        <Box sx={rowStyle}>
          <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.primaryBlue }}>Yesterday</Typography>
          {apiData.growthData.map((item) => (
            <Box key={`yesterday-${item.typeName}`} sx={{ textAlign: 'center' }}>
              <PercentageBadge 
                value={`${item.yesterday >= 0 ? '+' : ''}${item.yesterday.toFixed(1)}%`}
                type={item.yesterday >= 0 ? 'positive' : 'negative'}
              />
            </Box>
          ))}
        </Box>

        {/* Last Month Row */}
        <Box sx={rowStyle}>
          <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.primaryBlue }}>Last Month</Typography>
          {apiData.growthData.map((item) => (
            <Box key={`month-${item.typeName}`} sx={{ textAlign: 'center' }}>
              <PercentageBadge 
                value={`${item.lastMonth >= 0 ? '+' : ''}${item.lastMonth.toFixed(1)}%`}
                type={item.lastMonth >= 0 ? 'positive' : 'negative'}
              />
            </Box>
          ))}
        </Box>

        {/* Last Year Row */}
        <Box sx={rowStyle}>
          <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.primaryBlue }}>Last Year</Typography>
          {apiData.growthData.map((item) => (
            <Box key={`year-${item.typeName}`} sx={{ textAlign: 'center' }}>
              <PercentageBadge 
                value={`${item.lastYear >= 0 ? '+' : ''}${item.lastYear.toFixed(1)}%`}
                type={item.lastYear >= 0 ? 'positive' : 'negative'}
              />
            </Box>
          ))}
        </Box>

        <Box sx={{ bgcolor: COLORS.bgGrey, px: 2, py: 1.5 }}>
          <Typography sx={{ fontSize: '12px', color: COLORS.textGrey, lineHeight: 1.5 }}>
            {overallGrowthValue >= 0 
              ? 'Deposit growth is positive across most categories. Consider maintaining current strategies.'
              : 'Some deposit categories showing decline. Review and adjust strategies accordingly.'}
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderBranchContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography>Loading branch data...</Typography>
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
        <Box
          sx={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ overflowX: 'auto', width: '100%' }}>
            <Box sx={{ minWidth: minTableWidth }}>
              {/* Header */}
              <Box sx={{ display: 'flex', px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.border}`, bgcolor: '#fff' }}>
                <Typography sx={{ ...cellStyle, width: branchColWidths.branch, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Branch</Typography>
                <Typography sx={{ ...cellStyle, width: branchColWidths.balance, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Balance (₹L)</Typography>
                <Typography sx={{ ...cellStyle, width: branchColWidths.growth, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Growth (₹L)</Typography>
                <Typography sx={{ ...cellStyle, width: branchColWidths.percent, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Growth %</Typography>
                <Typography sx={{ ...cellStyle, width: branchColWidths.accounts, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Accounts</Typography>
              </Box>

              {/* Data Rows */}
              <Box sx={{ maxHeight: '350px', overflowY: 'auto' }}>
                {apiData.branchData.map((row, index) => (
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
                    <Typography noWrap sx={{ ...cellStyle, width: branchColWidths.branch, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>{row.name}</Typography>
                    <Typography sx={{ ...cellStyle, width: branchColWidths.balance, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>{row.balance}</Typography>
                    <Typography sx={{ ...cellStyle, width: branchColWidths.growth, fontSize: '13px', fontWeight: 500, color: row.growthColor }}>{row.growthVal}</Typography>
                    <Box sx={{ ...cellStyle, width: branchColWidths.percent }}>
                      <Box sx={{ bgcolor: row.percentBg, borderRadius: '16px', px: 1, py: 0.5, display: 'inline-block' }}>
                        <Typography sx={{ fontSize: '12px', fontWeight: 600, color: row.percentColor, lineHeight: 1 }}>{row.growthPercent}</Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ ...cellStyle, width: branchColWidths.accounts, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>{row.accounts}</Typography>
                  </Box>
                ))}

                {/* Total Row - FIXED: Now shows GrowthPer value */}
                {apiData.totalData && (
                  <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, bgcolor: '#F9FAFB' }}>
                    <Typography sx={{ ...cellStyle, width: branchColWidths.branch, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>Total</Typography>
                    <Typography sx={{ ...cellStyle, width: branchColWidths.balance, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>{apiData.totalData.balance}</Typography>
                    <Typography sx={{ ...cellStyle, width: branchColWidths.growth, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>{apiData.totalData.growth}</Typography>
                    <Box sx={{ ...cellStyle, width: branchColWidths.percent }}>
                      <Box sx={{ 
                        bgcolor: apiData.totalData.growthPercentValue >= 0 ? COLORS.bgGreen : COLORS.bgRed, 
                        borderRadius: '16px', 
                        px: 1, 
                        py: 0.5, 
                        display: 'inline-block' 
                      }}>
                        <Typography sx={{ 
                          fontSize: '12px', 
                          fontWeight: 600, 
                          color: apiData.totalData.growthPercentValue >= 0 ? COLORS.textGreen : COLORS.textRed, 
                          lineHeight: 1 
                        }}>
                          {apiData.totalData.growthPercent}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ ...cellStyle, width: branchColWidths.accounts, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>{apiData.totalData.accounts}</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

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
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: '#fff',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            width: '100%',
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
              maxWidth: '500px',
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
                Deposit Details
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '14px', color: COLORS.textGrey, fontWeight: 400 }}>
                Comprehensive deposit analysis
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

          {/* Custom Tabs */}
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {['growth', 'branch'].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <Box
                  key={tab}
                  onClick={() => setActiveTab(tab as 'growth' | 'branch')}
                  sx={{
                    flex: 1,
                    bgcolor: isActive ? COLORS.primaryBlue : '#fff',
                    border: isActive ? `1px solid ${COLORS.primaryBlue}` : `1px solid ${COLORS.border}`,
                    borderRadius: '8px',
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
                      color: isActive ? '#fff' : '#344054',
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}
                  >
                    {tab}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* Content Area */}
          {activeTab === 'growth' ? renderGrowthContent() : renderBranchContent()}
        </Box>
      </Slide>
    </Modal>
  );
};

export default DepositDetailsPopup;