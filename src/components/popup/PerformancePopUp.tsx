import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Modal,
  Slide,
  CircularProgress,
  Alert,
} from '@mui/material';

// MUI Icons
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// API Services
import {
  getProfitSummary,
  getFluidSummary,
  getODSummary,
  getWCSummary,
  getLDRSummary,
} from '../../api/services/performanceService';

// Transformers
import {
  transformProfitData,
  transformFluidData,
  transformODData,
  transformWCData,
  transformLDRData,
} from '../../utils/performanceDataTransformer';

// Types (Keeping existing types for context)
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
  data: PerformanceData | null;
  isLoading: boolean;
  error: string | null;
}

// Color schemes and order (Keeping existing static data)
export const colorSchemes: Record<TabType, ColorScheme> = {
  'profit': {
    primary: '#10B981',
    secondary: '#ECFDF5',
    progressBar: '#10B981',
    barChart: '#10B981',
    iconBackground: '#10B981',
    changePositive: '#10B981',
    changeNegative: '#EF4444',
  },
  'fluid-resources': {
    primary: '#288AD3',
    secondary: '#EEF7FF',
    progressBar: '#5BB2F2',
    barChart: '#6DC1FF',
    iconBackground: '#288AD3',
    changePositive: '#298A42',
    changeNegative: '#EF4444',
  },
  'overdue': {
    primary: '#F59E0B',
    secondary: '#FFFBEB',
    progressBar: '#F59E0B',
    barChart: '#F59E0B',
    iconBackground: '#F59E0B',
    changePositive: '#10B981',
    changeNegative: '#EF4444',
  },
  'working-capital': {
    primary: '#8B5CF6',
    secondary: '#F5F3FF',
    progressBar: '#8B5CF6',
    barChart: '#8B5CF6',
    iconBackground: '#8B5CF6',
    changePositive: '#10B981',
    changeNegative: '#EF4444',
  },
  'ldr': {
    primary: '#EC4899',
    secondary: '#FDF2F8',
    progressBar: '#EC4899',
    barChart: '#EC4899',
    iconBackground: '#EC4899',
    changePositive: '#10B981',
    changeNegative: '#EF4444',
  },
};

export const tabOrder: TabType[] = ['profit', 'fluid-resources', 'overdue', 'working-capital', 'ldr'];

// API mapping
const apiMap: Record<TabType, () => Promise<any>> = {
  'profit': getProfitSummary,
  'fluid-resources': getFluidSummary,
  'overdue': getODSummary,
  'working-capital': getWCSummary,
  'ldr': getLDRSummary,
};

const transformerMap: Record<TabType, (data: any) => any> = {
  'profit': transformProfitData,
  'fluid-resources': transformFluidData,
  'overdue': transformODData,
  'working-capital': transformWCData,
  'ldr': transformLDRData,
};

// Initial state function for tabs
const getInitialTabsState = (): Record<TabType, TabConfig> => ({
    'profit': { id: 'profit', label: 'Profit', data: null, isLoading: false, error: null },
    'fluid-resources': { id: 'fluid-resources', label: 'Fluid Resources', data: null, isLoading: false, error: null },
    'overdue': { id: 'overdue', label: 'Overdue %', data: null, isLoading: false, error: null },
    'working-capital': { id: 'working-capital', label: 'Working Capital', data: null, isLoading: false, error: null },
    'ldr': { id: 'ldr', label: 'LDR', data: null, isLoading: false, error: null },
});

interface PerformancePopUpProps {
  onClose: () => void;
  open: boolean;
}

const PerformancePopUp: React.FC<PerformancePopUpProps> = ({ onClose, open }) => {
  const [activeTab, setActiveTab] = useState<TabType>('profit');
  const [tabs, setTabs] = useState<Record<TabType, TabConfig>>(getInitialTabsState());
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load state

  // Use a useCallback to wrap the fetch logic to make it reusable and stable
  const fetchTabData = useCallback(async (tabId: TabType) => {
    setTabs(prev => ({
        ...prev,
        [tabId]: { ...prev[tabId], isLoading: true, error: null }
    }));

    try {
        const apiFunction = apiMap[tabId];
        const transformer = transformerMap[tabId];
        
        const response = await apiFunction();
        const transformedData = transformer(response);
        
        setTabs(prev => ({
            ...prev,
            [tabId]: {
                ...prev[tabId],
                data: {
                    ...transformedData,
                    colorScheme: colorSchemes[tabId]
                },
                isLoading: false,
                error: null
            }
        }));
    } catch (error) {
        console.error(`Error fetching ${tabId} data:`, error);
        setTabs(prev => ({
            ...prev,
            [tabId]: {
                ...prev[tabId],
                isLoading: false,
                error: `Failed to load ${prev[tabId].label} data`
            }
        }));
    }
  }, []); // Dependencies are stable, so safe to include an empty array

  // 1. Reset all tabs when popup closes
  useEffect(() => {
    if (!open) {
      setTabs(getInitialTabsState());
      setActiveTab('profit');
      setIsInitialLoad(true); // Reset initial load flag
    }
  }, [open]);

  // 2. Fetch all data when the popup *opens* for the first time
  useEffect(() => {
    if (open && isInitialLoad) {
      setIsInitialLoad(false); // Set to false so it only runs once per open
      
      // Fetch all tabs concurrently
      tabOrder.forEach(tabId => {
        // You might want to skip fetching if data is already present, but
        // since we reset `tabs` when closing, it will always be null here.
        fetchTabData(tabId);
      });
    }
  }, [open, isInitialLoad, fetchTabData]); // Removed dependency on `tabs` to avoid unnecessary re-runs

  // The previous useEffect that fetched data on tab change is now removed,
  // as all data is fetched in the `useEffect` above.

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
  };

  const currentTab = tabs[activeTab];
  const currentData = currentTab.data;
  const colors = colorSchemes[activeTab];
  const isPositiveChange = currentData ? !currentData.change.startsWith('-') : true;

  const renderTab = (tabId: TabType) => {
    const tab = tabs[tabId];
    const isActive = activeTab === tabId;
    const tabColors = colorSchemes[tabId];

    return (
      <Box
        key={tabId}
        onClick={() => handleTabChange(tabId)}
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
          position: 'relative',
        }}
      >
        {/* Loading indicator on tab */}
        {tab.isLoading && (
          <CircularProgress 
            size={16} 
            sx={{ 
              position: 'absolute',
              top: 4,
              right: 4,
              color: isActive ? '#FFFFFF' : tabColors.primary // Changed color logic for visibility
            }} 
          />
        )}
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

  // Generate mock trend data based on current values (since API doesn't provide trend)
  const generateTrendData = () => {
    if (!currentData) return [62, 66, 65, 62, 67, 67, 72];
    
    // Simple algorithm to generate trend based on current value
    const baseValue = 60;
    const variation = [0, 4, 3, 0, 5, 5, 10]; // Weekly pattern
    return variation.map(v => baseValue + v);
  };

  // Render loading state while waiting for the *first* tab to load its data
  if (isInitialLoad && open) {
    return (
      <Modal open={open} onClose={onClose}>
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Box
            sx={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              p: '20px',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Loading all performance data...</Typography>
            </Box>
          </Box>
        </Slide>
      </Modal>
    );
  }

  // The error check below will now work correctly for the initially selected tab ('profit')
  // if its fetch failed.
  if (currentTab.error && !currentData) {
    return (
      <Modal open={open} onClose={onClose}>
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Box
            sx={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              p: '20px',
            }}
          >
            <Alert severity="error" sx={{ mt: 2 }}>
              {currentTab.error}
            </Alert>
          </Box>
        </Slide>
      </Modal>
    );
  }

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
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            maxWidth: '600px', // Added maxWidth for better mobile/center view
            mx: 'auto', // Centering the box
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            p: '20px',
            boxShadow: '0px -4px 20px rgba(0,0,0,0.1)',
          }}
        >
          {/* Header */}
          <Box sx={{ width: '100%', maxWidth: '600px', mx: 'auto', flexShrink: 0 }}>
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

            {/* Tabs */}
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

          {/* Content Area */}
          <Box
            sx={{
              width: '100%',
              maxWidth: '600px',
              mx: 'auto',
              flexGrow: 1,
              overflowY: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {/* Show individual tab loading/error states if needed */}
            {currentTab.isLoading && !currentData ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading {currentTab.label} data...</Typography>
              </Box>
            ) : currentTab.error ? (
              <Alert severity="error" sx={{ mx: 2 }}>
                {currentTab.error}
              </Alert>
            ) : currentData ? (
              <>
                {/* Main Metric Section (Same as original) */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                  <Stack direction="row" alignItems="center">
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
                        ? `${colors.changePositive}26`
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

                {/* 7-Day Trend Graph (Same as original) */}
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
                      {generateTrendData().map((height, index) => (
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

                {/* Period Comparison (Same as original) */}
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

                {/* Summary Cards (Same as original) */}
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
              </>
            ) : null}
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default PerformancePopUp;
