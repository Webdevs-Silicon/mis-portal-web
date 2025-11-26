import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Modal, // Imported Modal for the dialog behavior
  Slide // Imported Slide for the animation
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// --- Types ---

interface CashInvestmentsDetailsPopupProps {
  onClose: () => void;
  open: boolean; // Added open prop for Modal control
}

type ActiveTab = 'cash' | 'investments' | 'period' | 'banks';

interface InvestmentRowData {
  asset: string;
  balance: string; // Balance in ₹L
  growthVal: string; // Growth value (e.g., '+5.2')
  growthPercent: string; // Growth percentage (e.g., '7.5%')
  cagr: string;
  growthColor?: string;
  percentBg?: string;
  percentColor?: string;
}

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

// --- Data ---
const investmentData: InvestmentRowData[] = [
  { asset: 'Mutual Funds', balance: '125.4', growthVal: '+12.8', growthPercent: '7.5%', cagr: '9.2%', growthColor: COLORS.textGreen, percentBg: COLORS.bgGreen, percentColor: COLORS.textGreen },
  { asset: 'Stocks & Bonds', balance: '80.2', growthVal: '+5.2', growthPercent: '3.6%', cagr: '4.1%', growthColor: COLORS.primaryBlue, percentBg: '#EFF8FF', percentColor: '#175CD3' },
  { asset: 'Real Estate', balance: '154.5', growthVal: '-8.5', growthPercent: '-2.1%', cagr: '5.8%', growthColor: COLORS.textRed, percentBg: COLORS.bgRed, percentColor: COLORS.textRed },
  { asset: 'Alternative', balance: '45.8', growthVal: '+1.2', growthPercent: '1.2%', cagr: '2.5%', growthColor: '#B54708', percentBg: '#FFFAEB', percentColor: '#B54708' },
];

const bankData: BankRowData[] = [
    { name: 'State Bank', balance: '28.5', rate: '28.5' }, // Assuming the second column is Rate % based on the header
    { name: 'Union Bank', balance: '15.7', rate: '15.7' },
    { name: 'Central Bank', balance: '12.3', rate: '12.3' },
    { name: 'Regional Bank', balance: '8.4', rate: '8.4' },
    { name: 'Cooperative Bank', balance: '3.3', rate: '3.3' },
];

const periodData: PeriodRowData[] = [
    // Note: Data is duplicated/simplified for structure based on provided snippet
    { period: 'Today', cash: '360.1', bank: '360.1', inv: '358.8', totalGrowth: '3.5%' },
    { period: 'Yesterday', cash: '358.8', bank: '358.8', inv: '358.8', totalGrowth: '3.6%' },
    { period: 'Last Month', cash: '358.8', bank: '358.8', inv: '358.8', totalGrowth: '3.6%' },
    { period: 'Last Year', cash: '358.8', bank: '358.8', inv: '358.8', totalGrowth: '3.6%' },
];

// --- Layout Constants ---

const investmentColWidths = {
  asset: '120px',
  balance: '80px',
  growth: '80px',
  percent: '80px',
  cagr: '80px',
};

const bankColWidths = {
    name: '140px',
    balance: '80px',
    rate: '80px',
};

const minTableWidth = '500px'; 

// --- Main Component ---

const CashInvestmentsDetailsPopup: React.FC<CashInvestmentsDetailsPopupProps> = ({ onClose, open }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('period'); // Default to Period as it's the first new tab

  // --- Render Functions ---

  const renderContentWrapper = (children: React.ReactNode, title: string, subtitle: React.ReactNode = null) => {
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
          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark }}>{title}</Typography>
          {subtitle}
        </Box>
        {children}
      </Box>
    );
  };

  const renderPeriodContent = () => {
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

                    {/* Table Rows */}
                    {periodData.map((row) => (
                        <Box key={row.period} sx={rowStyle}>
                            <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.primaryBlue }}>{row.period}</Typography>
                            <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.textDark, textAlign: 'center' }}>{row.cash}</Typography>
                            <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.textDark, textAlign: 'center' }}>{row.bank}</Typography>
                            <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.textDark, textAlign: 'center' }}>{row.inv}</Typography>
                            <Box sx={{ textAlign: 'center' }}>
                                <PercentageBadge value={row.totalGrowth} type={row.totalGrowth.includes('-') ? 'negative' : 'positive'} />
                            </Box>
                        </Box>
                    ))}

                    {/* Footer Insight/Comment */}
                    <Box sx={{ bgcolor: COLORS.bgGrey, px: 2, py: 1.5 }}>
                        <Typography sx={{ fontSize: '12px', color: COLORS.textGrey, lineHeight: 1.5 }}>
                            Current period highlighted • Growth of **15.6%** over last year.
                        </Typography>
                    </Box>
                </>
            , "Historical Overview")}
        </Box>
    );
  };

  const renderBanksContent = () => {
    const cellStyle = { flexShrink: 0, paddingRight: '8px' };
    
    return (
        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {renderContentWrapper(
                <Box sx={{ overflowX: 'auto', width: '100%' }}>
                    <Box sx={{ minWidth: '350px' }}>
                        
                        {/* Table Header */}
                        <Box sx={{ display: 'flex', px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.border}`, bgcolor: '#fff' }}>
                            <Typography sx={{ ...cellStyle, width: bankColWidths.name, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Bank Name</Typography>
                            <Typography sx={{ ...cellStyle, width: bankColWidths.balance, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Balance (₹L)</Typography>
                            <Typography sx={{ ...cellStyle, width: bankColWidths.rate, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Rate %</Typography>
                        </Box>

                        <Box sx={{ maxHeight: '350px', overflowY: 'auto' }}>
                            {bankData.map((row, index) => (
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
                                <Typography sx={{ ...cellStyle, width: bankColWidths.balance, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>68.2</Typography>
                                <Typography sx={{ ...cellStyle, width: bankColWidths.rate, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>-</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            , "Bank Breakdown", (
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: COLORS.textDark }}>
                    Average Interest Rate: **3.5%**
                </Typography>
            ))}
        </Box>
    );
  };

  const renderCashContent = () => {
    // Re-using simplified content from previous Cash tab
    const rowStyle = {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr 1fr 1fr',
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
                        <Typography sx={{ fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Category</Typography>
                        <Typography sx={{ fontSize: '11px', fontWeight: 500, color: COLORS.textGrey, textAlign: 'center' }}>Balance (₹L)</Typography>
                        <Typography sx={{ fontSize: '11px', fontWeight: 500, color: COLORS.textGrey, textAlign: 'center' }}>Growth (MoM)</Typography>
                        <Typography sx={{ fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textAlign: 'center' }}>Rate (%)</Typography>
                    </Box>

                    {/* Table Rows */}
                    <Box sx={rowStyle}>
                        <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.primaryBlue }}>Savings &amp; Current</Typography>
                        <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.textDark, textAlign: 'center' }}>90.5</Typography>
                        <Box sx={{ textAlign: 'center' }}><PercentageBadge value="+1.8%" /></Box>
                        <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.textGrey, textAlign: 'center' }}>0.5</Typography>
                    </Box>

                    <Box sx={rowStyle}>
                        <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.primaryBlue }}>Fixed Deposits</Typography>
                        <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.textDark, textAlign: 'center' }}>210.8</Typography>
                        <Box sx={{ textAlign: 'center' }}><PercentageBadge value="+3.5%" /></Box>
                        <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.textGreen, textAlign: 'center' }}>6.5</Typography>
                    </Box>
                    
                    {/* Footer Insight/Comment */}
                    <Box sx={{ bgcolor: COLORS.bgGrey, px: 2, py: 1.5 }}>
                        <Typography sx={{ fontSize: '12px', color: COLORS.textGrey, lineHeight: 1.5 }}>
                            Fixed Deposits are performing well. Focus on growing Savings accounts.
                        </Typography>
                    </Box>
                </>
            , "Cash & Deposits", (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: '12px', color: COLORS.textGrey }}>Overall Growth</Typography>
                    <PercentageBadge value="+2.1%" type="positive" />
                </Box>
            ))}
        </Box>
    );
  };

  const renderInvestmentContent = () => {
    // Re-using investment table structure
    const cellStyle = { flexShrink: 0, paddingRight: '8px' };

    return (
        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {renderContentWrapper(
                <Box sx={{ overflowX: 'auto', width: '100%' }}>
                    <Box sx={{ minWidth: minTableWidth }}>
                        
                        {/* Table Header */}
                        <Box sx={{ display: 'flex', px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.border}`, bgcolor: '#fff' }}>
                            <Typography sx={{ ...cellStyle, width: investmentColWidths.asset, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Asset Class</Typography>
                            <Typography sx={{ ...cellStyle, width: investmentColWidths.balance, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Balance (₹L)</Typography>
                            <Typography sx={{ ...cellStyle, width: investmentColWidths.growth, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Growth (₹L)</Typography>
                            <Typography sx={{ ...cellStyle, width: investmentColWidths.percent, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>Growth %</Typography>
                            <Typography sx={{ ...cellStyle, width: investmentColWidths.cagr, fontSize: '11px', fontWeight: 600, color: COLORS.textGrey, textTransform: 'uppercase' }}>CAGR %</Typography>
                        </Box>

                        <Box sx={{ maxHeight: '350px', overflowY: 'auto' }}>
                            {investmentData.map((row, index) => (
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
                                    <Typography noWrap sx={{ ...cellStyle, width: investmentColWidths.asset, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>{row.asset}</Typography>
                                    <Typography sx={{ ...cellStyle, width: investmentColWidths.balance, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>{row.balance}</Typography>
                                    <Typography sx={{ ...cellStyle, width: investmentColWidths.growth, fontSize: '13px', fontWeight: 500, color: row.growthColor }}>{row.growthVal}</Typography>
                                    <Box sx={{ ...cellStyle, width: investmentColWidths.percent }}>
                                        <Box sx={{ bgcolor: row.percentBg, borderRadius: '16px', px: 1, py: 0.5, display: 'inline-block' }}>
                                            <Typography sx={{ fontSize: '12px', fontWeight: 600, color: row.percentColor, lineHeight: 1 }}>{row.growthPercent}</Typography>
                                        </Box>
                                    </Box>
                                    <Typography sx={{ ...cellStyle, width: investmentColWidths.cagr, fontSize: '13px', fontWeight: 500, color: COLORS.textDark }}>{row.cagr}</Typography>
                                </Box>
                            ))}
                        </Box>
                        {/* Total Row */}
                        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, bgcolor: COLORS.bgGrey }}>
                            <Typography sx={{ ...cellStyle, width: investmentColWidths.asset, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>Total</Typography>
                            <Typography sx={{ ...cellStyle, width: investmentColWidths.balance, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>405.9</Typography>
                            <Typography sx={{ ...cellStyle, width: investmentColWidths.growth, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>10.7</Typography>
                            <Typography sx={{ ...cellStyle, width: investmentColWidths.percent, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>2.7%</Typography>
                            <Typography sx={{ ...cellStyle, width: investmentColWidths.cagr, fontSize: '13px', fontWeight: 600, color: COLORS.primaryBlue }}>6.5%</Typography>
                        </Box>
                    </Box>
                </Box>
            , "Investment Breakdown")}
        </Box>
    );
  };

  // --- Main Render (Using Modal and Slide) ---
  return (
    // Replaced the outermost Box with MUI Modal for standard popup behavior
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
      {/* Wrap the content box with Slide for the 'slide up' animation */}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            // Styles adjusted for the modal content positioning
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
            
            // Desktop/Tablet-specific styles
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
                    flexShrink: 0, // Prevent shrinking in the scrollable row
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
                      color: isActive ? '#fff' : '#344054',
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