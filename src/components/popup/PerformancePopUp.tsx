import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Modal,
  Slide,
} from '@mui/material';

// MUI Icons
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// --- Types & Data (Retained from your input) ---
export type TabType = 'profit' | 'fluid-resources' | 'overdue' | 'working-capital' | 'ldr';

export interface ColorScheme {
  primary: string;
  secondary: string;
  progressBar: string;
  barChart: string;
  iconBackground: string;
  changePositive: string;
  changeNegative: string;
}

export interface PerformanceData {
  label: string;
  value: string;
  change: string;
  changeValue: string;
  periodComparison: {
    today: string;
    lastMonth: string;
    lastYear: string;
  };
  summary: {
    monthlyAvg: string;
    yoyGrowth: string;
  };
  progressBars: {
    today: number;
    lastMonth: number;
    lastYear: number;
  };
  colorScheme: ColorScheme;
}

export interface TabConfig {
  id: TabType;
  label: string;
  data: PerformanceData;
}

export const performanceData: Record<string, TabConfig> = {
  profit: {
    id: 'profit',
    label: 'Profit',
    data: {
      label: "Today's Profit",
      value: '₹ 18.5L',
      change: '+0.35',
      changeValue: '+0.35',
      periodComparison: {
        today: '₹ 18.5L',
        lastMonth: '₹ 17.1L',
        lastYear: '₹ 15.2L',
      },
      summary: {
        monthlyAvg: '₹ 17.1L',
        yoyGrowth: '+8.2%',
      },
      progressBars: {
        today: 100,
        lastMonth: 92,
        lastYear: 82,
      },
      colorScheme: {
        primary: '#10B981', // Emerald Green
        secondary: '#ECFDF5',
        progressBar: '#10B981',
        barChart: '#10B981',
        iconBackground: '#10B981',
        changePositive: '#10B981',
        changeNegative: '#EF4444',
      },
    },
  },
  'fluid-resources': {
    id: 'fluid-resources',
    label: 'Fluid Resources',
    data: {
      label: 'Fluid Resources',
      value: '₹ 125.8L',
      change: '+0.35',
      changeValue: '+0.35',
      periodComparison: {
        today: '₹ 125.8L',
        lastMonth: '₹ 119.3L',
        lastYear: '₹ 112.5L',
      },
      summary: {
        monthlyAvg: '₹ 119.3L',
        yoyGrowth: '+5.4%',
      },
      progressBars: {
        today: 100,
        lastMonth: 95,
        lastYear: 89,
      },
      colorScheme: {
        primary: '#288AD3', // Blue
        secondary: '#EEF7FF',
        progressBar: '#5BB2F2',
        barChart: '#6DC1FF',
        iconBackground: '#288AD3',
        changePositive: '#298A42',
        changeNegative: '#EF4444',
      },
    },
  },
  overdue: {
    id: 'overdue',
    label: 'Overdue %',
    data: {
      label: 'Overdue %',
      value: '3.2%',
      change: '+0.35',
      changeValue: '+0.35',
      periodComparison: {
        today: '3.2%',
        lastMonth: '4.3%',
        lastYear: '5.8%',
      },
      summary: {
        monthlyAvg: '4.3%',
        yoyGrowth: '-1.1%',
      },
      progressBars: {
        today: 55,
        lastMonth: 74,
        lastYear: 100,
      },
      colorScheme: {
        primary: '#F59E0B', // Amber
        secondary: '#FFFBEB',
        progressBar: '#F59E0B',
        barChart: '#F59E0B',
        iconBackground: '#F59E0B',
        changePositive: '#10B981',
        changeNegative: '#EF4444',
      },
    },
  },
  'working-capital': {
    id: 'working-capital',
    label: 'Working Capital',
    data: {
      label: 'Working Capital',
      value: '₹ 62.4L',
      change: '+0.35',
      changeValue: '+0.35',
      periodComparison: {
        today: '₹ 62.4L',
        lastMonth: '₹ 58.1L',
        lastYear: '₹ 55.5L',
      },
      summary: {
        monthlyAvg: '₹ 55.5L',
        yoyGrowth: '+12.3%',
      },
      progressBars: {
        today: 100,
        lastMonth: 93,
        lastYear: 89,
      },
      colorScheme: {
        primary: '#8B5CF6', // Violet
        secondary: '#F5F3FF',
        progressBar: '#8B5CF6',
        barChart: '#8B5CF6',
        iconBackground: '#8B5CF6',
        changePositive: '#10B981',
        changeNegative: '#EF4444',
      },
    },
  },
  ldr: {
    id: 'ldr',
    label: 'LDR',
    data: {
      label: 'LDR',
      value: '78.5%',
      change: '-0.35',
      changeValue: '-0.35',
      periodComparison: {
        today: '78.5%',
        lastMonth: '80.8%',
        lastYear: '82.1%',
      },
      summary: {
        monthlyAvg: '80.8%',
        yoyGrowth: '-2.3%',
      },
      progressBars: {
        today: 96,
        lastMonth: 98,
        lastYear: 100,
      },
      colorScheme: {
        primary: '#EC4899', // Pink
        secondary: '#FDF2F8',
        progressBar: '#EC4899',
        barChart: '#EC4899',
        iconBackground: '#EC4899',
        changePositive: '#10B981',
        changeNegative: '#EF4444',
      },
    },
  },
};

export const tabOrder: TabType[] = ['profit', 'fluid-resources', 'overdue', 'working-capital', 'ldr'];
// --- End Types & Data ---

// Props Interface
interface PerformancePopUpProps {
  onClose: () => void;
  open: boolean;
}

// Main Component
const PerformancePopUp: React.FC<PerformancePopUpProps> = ({ onClose, open }) => {
  const [activeTab, setActiveTab] = useState<TabType>('profit');

  const currentData = performanceData[activeTab].data;
  const colors = currentData.colorScheme;
  const isPositiveChange = !currentData.change.startsWith('-');

  const renderTab = (tabId: TabType) => {
    const tab = performanceData[tabId];
    const isActive = activeTab === tabId;
    const tabColors = tab.data.colorScheme;

    return (
      <Box
        key={tabId}
        onClick={() => setActiveTab(tabId)}
        sx={{
          cursor: 'pointer',
          border: isActive ? 'none' : '1px solid #ECECEC',
          borderRadius: '12px',
          px: 2,
          py: 1,
          mr: 1,
          whiteSpace: 'nowrap',
          backgroundColor: isActive ? tabColors.primary : '#FFFFFF',
          transition: 'all 0.2s ease',
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '14px',
            fontWeight: isActive ? 600 : 400,
            color: isActive ? '#FFFFFF' : '#737373',
          }}
        >
          {tab.label}
        </Typography>
      </Box>
    );
  };

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
        {/* Main Container - Adjusted to be a flex container for fixed header/scrollable content */}
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            // --- Bottom Sheet Positioning ---
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            maxHeight: '85vh',
            // **Crucial for layout control:**
            display: 'flex',
            flexDirection: 'column',
            // -------------------------------
            boxShadow: '0px -4px 20px rgba(0,0,0,0.1)',
            // Padding added here to apply to the whole container
            p: '20px', 
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '600px', mx: 'auto', flexShrink: 0 }}>
            {/* 1. Header (Fixed part) */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#000000',
                }}
              >
                Performance Details
              </Typography>

              <IconButton
                onClick={onClose}
                sx={{
                  backgroundColor: '#F6F6F6',
                  width: '38px',
                  height: '38px',
                  '&:hover': { backgroundColor: '#E0E0E0' },
                }}
              >
                <CloseRoundedIcon sx={{ color: '#000', fontSize: '20px' }} />
              </IconButton>
            </Stack>

            {/* 2. Horizontal Tabs (Fixed part) */}
            <Box
              sx={{
                display: 'flex',
                overflowX: 'auto',
                mb: 2.5,
                pb: 0.5,
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              {tabOrder.map(renderTab)}
            </Box>
          </Box>

          {/* 3. Scrollable Content Area */}
          <Box
            sx={{
              width: '100%',
              maxWidth: '600px',
              mx: 'auto',
              flexGrow: 1, // Allows this box to take up remaining vertical space
              overflowY: 'auto', // **Only this box scrolls**
              // Remove padding here since it's already on the outer container
              // You might want to adjust margin/padding to prevent content from touching the edges,
              // but keeping the '20px' padding on the outer Box is the standard approach here.
            }}
          >
            {/* Main Metric Section */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Stack direction="row" alignItems="center">
                {/* Icon Box */}
                <Box
                  sx={{
                    borderRadius: '16px',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mr: 1.5,
                    backgroundColor: colors.iconBackground,
                  }}
                >
                  <ShowChartIcon sx={{ color: '#FFFFFF', fontSize: '20px' }} />
                </Box>

                {/* Text */}
                <Box>
                  <Typography
                    sx={{
                      color: '#737373',
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      mb: 0.25,
                    }}
                  >
                    {currentData.label}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#000000',
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '24px',
                      fontWeight: 600,
                    }}
                  >
                    {currentData.value}
                  </Typography>
                </Box>
              </Stack>

              {/* Change Badge */}
              <Box
                sx={{
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  px: 1,
                  py: 0.6,
                  backgroundColor: isPositiveChange
                    ? `${colors.changePositive}26` // 26 is hex for ~15% opacity
                    : `${colors.changeNegative}26`,
                }}
              >
                {isPositiveChange ? (
                  <ArrowUpwardIcon sx={{ fontSize: '14px', color: colors.changePositive }} />
                ) : (
                  <ArrowDownwardIcon sx={{ fontSize: '14px', color: colors.changeNegative }} />
                )}
                <Typography
                  sx={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    ml: 0.5,
                    color: isPositiveChange ? colors.changePositive : colors.changeNegative,
                  }}
                >
                  {currentData.change}
                </Typography>
              </Box>
            </Stack>

            {/* 7-Day Trend Graph */}
            <Box mb={3}>
              <Typography
                sx={{
                  color: '#737373',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  mb: 1.5,
                  textTransform: 'uppercase',
                }}
              >
                7-DAY TREND
              </Typography>

              <Box
                sx={{
                  border: '1px solid #ECECEC',
                  borderRadius: '12px',
                  p: 2,
                  backgroundColor: colors.secondary,
                }}
              >
                {/* Bars */}
                <Stack direction="row" alignItems="flex-end" height="72px" mb={1} spacing={0.5}>
                  {[62, 66, 65, 62, 67, 67, 72].map((height, index) => (
                    <Box
                      key={index}
                      sx={{
                        height: `${height}%`,
                        backgroundColor: colors.barChart,
                        opacity: index === 5 ? 1 : 0.3, // Highlight Saturday
                        flex: 1,
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                      }}
                    />
                  ))}
                </Stack>

                {/* Days Labels */}
                <Stack direction="row" justifyContent="space-between">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <Typography
                      key={day}
                      sx={{
                        color: index === 5 ? '#161616' : '#737373', // Highlight Saturday
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '12px',
                        fontWeight: 500,
                        flex: 1,
                        textAlign: 'center',
                      }}
                    >
                      {day}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Box>

            {/* Period Comparison */}
            <Box mb={3}>
              <Typography
                sx={{
                  color: '#737373',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  mb: 1.5,
                  textTransform: 'uppercase',
                }}
              >
                PERIOD COMPARISON
              </Typography>

              <Stack spacing={2}>
                {/* Helper to render comparison rows */}
                {[
                  { label: 'Today', value: currentData.periodComparison.today, progress: currentData.progressBars.today },
                  { label: 'Last Month', value: currentData.periodComparison.lastMonth, progress: currentData.progressBars.lastMonth },
                  { label: 'Last Year', value: currentData.periodComparison.lastYear, progress: currentData.progressBars.lastYear },
                ].map((item) => (
                  <Box key={item.label}>
                    <Stack direction="row" justifyContent="space-between" mb={1}>
                      <Typography sx={{ color: '#070707', fontSize: '14px', fontWeight: 500, fontFamily: '"DM Sans"' }}>
                        {item.label}
                      </Typography>
                      <Typography sx={{ color: '#070707', fontSize: '14px', fontWeight: 500, fontFamily: '"DM Sans"' }}>
                        {item.value}
                      </Typography>
                    </Stack>
                    {/* Custom Progress Bar */}
                    <Box
                      sx={{
                        backgroundColor: '#F4F4F4',
                        borderRadius: '4px',
                        height: '8px',
                        width: '100%',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          width: `${item.progress}%`,
                          height: '100%',
                          borderRadius: '4px',
                          backgroundColor: colors.progressBar,
                          transition: 'width 0.5s ease-in-out',
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Summary Cards */}
            <Stack direction="row" spacing={2} pb={2}>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #ECECEC',
                  borderRadius: '12px',
                  p: 2,
                }}
              >
                <Typography sx={{ color: '#737373', fontSize: '14px', mb: 0.5, fontFamily: '"DM Sans"' }}>
                  Monthly Avg
                </Typography>
                <Typography sx={{ color: '#000000', fontSize: '20px', fontWeight: 600, fontFamily: '"DM Sans"' }}>
                  {currentData.summary.monthlyAvg}
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #ECECEC',
                  borderRadius: '12px',
                  p: 2,
                }}
              >
                <Typography sx={{ color: '#737373', fontSize: '14px', mb: 0.5, fontFamily: '"DM Sans"' }}>
                  YoY Growth
                </Typography>
                <Typography
                  sx={{
                    color: currentData.summary.yoyGrowth.startsWith('+') ? colors.changePositive : colors.changeNegative,
                    fontSize: '20px',
                    fontWeight: 600,
                    fontFamily: '"DM Sans"',
                  }}
                >
                  {currentData.summary.yoyGrowth}
                </Typography>
              </Box>
            </Stack>

          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default PerformancePopUp;