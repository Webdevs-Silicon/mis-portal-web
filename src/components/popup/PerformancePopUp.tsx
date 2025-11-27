
import React, { useState, useEffect, useCallback, useRef } from 'react'; 
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
  // THE BELOW API CALLS ARE FOR 7 DAY TREND CHART
  getProfitAndLoss,
  getFluidOverview,
  getWorkingCapitalOverview,
  getLdrOverview,
  getOverDueOverview
} from '../../api/services/performanceService';

// Transformers - Assumed to be imported
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

export interface TrendData {
  date: string;
  value: number;
  percentage: number;
}

export interface PerformanceData {
  label: string;
  value: string;
  change: string;
  changeValue: string;
  periodComparison: {
    lastDay: string;
    lastMonth: string;
    lastYear: string;
  };
  progressBars: {
    lastDay: number;
    lastMonth: number;
    lastYear: number;
  };
  summary: {
    monthlyAvg: string;
    yoyGrowth: string;
  };
  colorScheme: ColorScheme;
  trendData?: TrendData[];
}

export interface TabConfig {
  id: TabType;
  label: string;
  data: PerformanceData | null;
  isLoading: boolean;
  error: string | null;
  trendData: TrendData[] | null;
  isTrendLoading: boolean;
  trendError: string | null;
}

// NEW TYPE: Tooltip State
interface TooltipState {
  show: boolean;
  x: number;
  y: number;
  data: TrendData | null;
  isNegative: boolean;
  formattedValue: string;
  dateLabel: string;
}

// NEW TYPE: Selected Bar Data State
interface SelectedBarData {
  value: string;
  change: string;
  isPositive: boolean;
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

// API mapping for data
const apiMap: Record<TabType, () => Promise<any>> = {
  'profit': getProfitSummary,
  'fluid-resources': getFluidSummary,
  'overdue': getODSummary,
  'working-capital': getWCSummary,
  'ldr': getLDRSummary,
};

const trendApiMap: Record<TabType, () => Promise<any>> = {
  'profit': getProfitAndLoss,
  'fluid-resources': getFluidOverview,
  'overdue': getOverDueOverview,
  'working-capital': getWorkingCapitalOverview,
  'ldr': getLdrOverview,
};

const transformerMap: Record<TabType, (data: any) => any> = {
  'profit': transformProfitData,
  'fluid-resources': transformFluidData,
  'overdue': transformODData,
  'working-capital': transformWCData,
  'ldr': transformLDRData,
};

// FIXED: Helper function to transform trend API data
const transformTrendData = (apiData: any, tabId: TabType): TrendData[] => {
  if (!apiData) return [];

  let dataArray: any[] = [];
  let valueKey = 'Amount';
  let percentageKey = 'Percentage';

  switch (tabId) {
    case 'profit':
      dataArray = apiData.ProfitAndLoss || [];
      break;
    case 'fluid-resources':
      dataArray = apiData.FluidDetails || [];
      break;
    case 'overdue':
      dataArray = apiData.OverDueDetails || [];
      valueKey = 'ODPercentage';
      break;
    case 'working-capital':
      dataArray = apiData.WorkingCapital || [];
      break;
    case 'ldr':
      dataArray = apiData.LDRDetails || [];
      valueKey = 'LDRPercentage';
      break;
    default:
      return [];
  }

  const transformedData = dataArray.map((item: any) => {
    // For overdue and ldr tabs, use the percentage field as the value
    const value = tabId === 'overdue' || tabId === 'ldr' ? 
      (item[valueKey] || 0) : 
      (item[valueKey] || 0);
    
    // For percentage change, always use the Percentage field
    const percentage = item[percentageKey] || 0;

    return {
      date: item.Date,
      value: value,
      percentage: percentage
    };
  });

  // Return in chronological order (oldest to newest)
  return transformedData.reverse();
};

const getInitialTabsState = (): Record<TabType, TabConfig> => ({
  'profit': { id: 'profit', label: 'Profit', data: null, isLoading: false, error: null, trendData: null, isTrendLoading: false, trendError: null },
  'fluid-resources': { id: 'fluid-resources', label: 'Fluid Resources', data: null, isLoading: false, error: null, trendData: null, isTrendLoading: false, trendError: null },
  'overdue': { id: 'overdue', label: 'Overdue %', data: null, isLoading: false, error: null, trendData: null, isTrendLoading: false, trendError: null },
  'working-capital': { id: 'working-capital', label: 'Working Capital', data: null, isLoading: false, error: null, trendData: null, isTrendLoading: false, trendError: null },
  'ldr': { id: 'ldr', label: 'LDR', data: null, isLoading: false, error: null, trendData: null, isTrendLoading: false, trendError: null },
});

interface PerformancePopUpProps {
  onClose: () => void;
  open: boolean;
}

// NEW HELPER: Formats the value for the Tooltip and Main Display
const formatTooltipValue = (value: number, tabId: TabType): string => {
    if (tabId === 'overdue' || tabId === 'ldr') {
        return `${value.toFixed(1)}%`;
    }
    const absValue = Math.abs(value);
    if (absValue >= 10000000) {
        return `₹ ${(value / 10000000).toFixed(1)} Cr`;
    }
    if (absValue >= 100000) {
        return `₹ ${(value / 100000).toFixed(1)} L`;
    }
    if (absValue >= 1000) {
        return `₹ ${(value / 1000).toFixed(1)} K`;
    }
    return `₹ ${value.toFixed(0)}`; 
};

// NEW HELPER: Format percentage change for display
const formatPercentageChange = (percentage: number): string => {
  return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(1)}%`;
};

const PerformancePopUp: React.FC<PerformancePopUpProps> = ({ onClose, open }) => {
  const [activeTab, setActiveTab] = useState<TabType>('profit');
  const [tabs, setTabs] = useState<Record<TabType, TabConfig>>(getInitialTabsState());
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // State for chart normalization
  const [trendChartMaxValue, setTrendChartMaxValue] = useState<number>(0);

  // NEW STATE: Tooltip Management
  const [tooltipState, setTooltipState] = useState<TooltipState>({
    show: false,
    x: 0,
    y: 0,
    data: null,
    isNegative: false,
    formattedValue: '',
    dateLabel: '',
  });
  
  // NEW STATE: Selected Bar Data for Main Display
  const [selectedBarData, setSelectedBarData] = useState<SelectedBarData | null>(null);
  
  // Ref for the chart container to calculate tooltip position
  const chartContainerRef = useRef<HTMLDivElement>(null); 

  // FIXED: Effect to set initial selectedBarData when active tab's trend data loads
  useEffect(() => {
    const currentTabData = tabs[activeTab];
    if (currentTabData.trendData && currentTabData.trendData.length > 0 && !selectedBarData) {
      const latestData = currentTabData.trendData[currentTabData.trendData.length - 1];
      const formattedValue = formatTooltipValue(latestData.value, activeTab);
      const changeText = formatPercentageChange(latestData.percentage);
      const isPositive = latestData.percentage >= 0;

      console.log(`Setting initial selectedBarData for ${activeTab}:`, {
        value: formattedValue,
        change: changeText,
        isPositive
      });

      setSelectedBarData({
        value: formattedValue,
        change: changeText,
        isPositive: isPositive
      });
    }
  }, [tabs, activeTab, selectedBarData]);
  
  // --- Tooltip Handlers ---
  const handleBarHover = useCallback((
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    data: TrendData,
    dayLabel: string,
    tabId: TabType
  ) => {
    if (chartContainerRef.current) {
        // Use the bar's own position (event target)
        const targetRect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
        const containerRect = chartContainerRef.current.getBoundingClientRect();

        const isNegative = data.value < 0;
        const formattedValue = formatTooltipValue(data.value, tabId);
        
        setTooltipState({
            show: true,
            // Position the tooltip above the bar:
            x: targetRect.left + (targetRect.width / 2) - containerRect.left, 
            // Y is targetRect.top relative to the container, which works well for absolute positioning inside the relative container
            y: targetRect.top - containerRect.top, 
            data,
            isNegative,
            formattedValue,
            dateLabel: dayLabel,
        });
    }
  }, []);

  const handleBarLeave = useCallback(() => {
    setTooltipState(prev => ({ ...prev, show: false }));
  }, []);

  // NEW HANDLER: Bar Click to update main display
  const handleBarClick = useCallback((
    data: TrendData,
    tabId: TabType
  ) => {
    const formattedValue = formatTooltipValue(data.value, tabId);
    const changeText = formatPercentageChange(data.percentage);
    const isPositive = data.percentage >= 0;

    setSelectedBarData({
      value: formattedValue,
      change: changeText,
      isPositive: isPositive
    });
  }, []);
  // -------------------------

  // Fetch main tab data
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
  }, []);

  // Fetch trend data for a specific tab
  const fetchTrendData = useCallback(async (tabId: TabType) => {
    setTabs(prev => ({
      ...prev,
      [tabId]: { ...prev[tabId], isTrendLoading: true, trendError: null }
    }));

    try {
      const apiFunction = trendApiMap[tabId];
      const response = await apiFunction();
      const transformedTrendData = transformTrendData(response, tabId);

      setTabs(prev => ({
        ...prev,
        [tabId]: {
          ...prev[tabId],
          trendData: transformedTrendData,
          isTrendLoading: false,
          trendError: null
        }
      }));

    } catch (error) {
      console.error(`Error fetching ${tabId} trend data:`, error);
      setTabs(prev => ({
        ...prev,
        [tabId]: {
          ...prev[tabId],
          isTrendLoading: false,
          trendError: `Failed to load ${prev[tabId].label} trend data`
        }
      }));
    }
  }, []);

  // Reset all tabs when popup closes
  useEffect(() => {
    if (!open) {
      setTabs(getInitialTabsState());
      setActiveTab('profit');
      setIsInitialLoad(true);
      setTrendChartMaxValue(0);
      setTooltipState(prev => ({ ...prev, show: false }));
      setSelectedBarData(null);
    }
  }, [open]);

  // Fetch all data when the popup opens for the first time
  useEffect(() => {
    if (open && isInitialLoad) {
      setIsInitialLoad(false);
      tabOrder.forEach(tabId => {
        fetchTabData(tabId);
        fetchTrendData(tabId);
      });
    }
  }, [open, isInitialLoad, fetchTabData, fetchTrendData]);

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
    setTrendChartMaxValue(0);
    setTooltipState(prev => ({ ...prev, show: false }));
    setSelectedBarData(null); // Reset selected bar data when tab changes

    if (!tabs[tabId].trendData && !tabs[tabId].isTrendLoading && !tabs[tabId].trendError) {
      fetchTrendData(tabId);
    }
  };

  const currentTab = tabs[activeTab];
  const currentData = currentTab.data;
  const currentTrendData = currentTab.trendData;
  const colors = colorSchemes[activeTab];

  // FIXED: Use selected bar data if available, otherwise use latest trend data, otherwise fallback to currentData
  const getDisplayData = () => {
    if (selectedBarData) {
      return selectedBarData;
    }
    
    if (currentTrendData && currentTrendData.length > 0) {
      const latestData = currentTrendData[currentTrendData.length - 1];
      const formattedValue = formatTooltipValue(latestData.value, activeTab);
      const changeText = formatPercentageChange(latestData.percentage);
      const isPositive = latestData.percentage >= 0;
      
      return {
        value: formattedValue,
        change: changeText,
        isPositive: isPositive
      };
    }
    
    // Fallback to currentData if no trend data is available
    return {
      value: currentData?.value || '₹ 0',
      change: currentData?.change || '+0.0%',
      isPositive: currentData ? !currentData.change.startsWith('-') : true
    };
  };

  const displayData = getDisplayData();

  // Calculate max value when trend data changes
  useEffect(() => {
    if (currentTrendData && currentTrendData.length > 0) {
      // Find the largest magnitude (absolute value) in the dataset.
      const allValues = currentTrendData.map(d => Math.abs(d.value));
      const maxValue = Math.max(...allValues, 1);
      setTrendChartMaxValue(maxValue);
    } else {
      setTrendChartMaxValue(0);
    }
  }, [currentTrendData]);

  // Generate trend chart data
  const generateTrendChartData = () => {
    if (!currentTrendData || currentTrendData.length === 0) {
      // Default dummy data for placeholder rendering
      return [62, 66, 65, 62, 67, 67, 72]; 
    }

    const maxValue = trendChartMaxValue;

    if (maxValue === 0) {
      return currentTrendData.map(() => 0);
    }

    // Normalize the values for bar height (0-100 scale)
    const values = currentTrendData.map(item => {
      const normalizedValue = (Math.abs(item.value) / maxValue) * 100;

      // Minimum height for visibility
      if (item.value !== 0 && normalizedValue > 0 && normalizedValue < 5) {
        return 5;
      }

      return Math.min(100, normalizedValue);
    });

    return values;
  };

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
        {(tab.isLoading || tab.isTrendLoading) && (
          <CircularProgress 
            size={16} 
            sx={{ 
              position: 'absolute',
              top: 4,
              right: 4,
              color: isActive ? '#FFFFFF' : tabColors.primary
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

  // Get day labels from trend data or use default
  const getDayLabels = () => {
    if (!currentTrendData || currentTrendData.length === 0) {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }

    return currentTrendData.map(item => {
      const parts = item.date.split('/');
      let date: Date;
      if (parts.length === 3) {
        // Assumes DD/MM/YYYY format and converts to MM/DD/YYYY for Date object
        date = new Date(`${parts[1]}/${parts[0]}/${parts[2]}`); 
      } else {
        date = new Date(item.date);
      }

      if (isNaN(date.getTime())) {
          return item.date; // Fallback to original string if parsing fails
      }

      // This maintains the chronological order of the trend data (e.g., Fri, Sat, Sun, Mon...)
      return date.toLocaleDateString('en-US', { weekday: 'short' }); 
    });
  };

  // NEW COMPONENT: Individual Bar with Tooltip and Click Logic
  const BarWithTooltip = ({ 
    height, 
    index, 
    data, 
    dayLabel, 
    barColor, 
    isLatest 
  }: {
    height: number,
    index: number,
    data: TrendData,
    dayLabel: string,
    barColor: string,
    isLatest: boolean
  }) => {
    return (
        <Box
            key={index}
            // Event Handlers for interaction
            onMouseEnter={(e) => handleBarHover(e, data, dayLabel, activeTab)}
            onMouseLeave={handleBarLeave}
            onTouchStart={(e) => handleBarHover(e, data, dayLabel, activeTab)}
            onTouchEnd={handleBarLeave}
            onClick={() => handleBarClick(data, activeTab)}
            sx={{
                height: `${height}%`,
                backgroundColor: barColor, 
                opacity: isLatest ? 1 : 0.4, 
                flex: 1,
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  opacity: 0.8,
                  transform: 'scale(1.05)',
                },
            }}
        />
    );
  };

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
            maxWidth: '600px',
            mx: 'auto',
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
                {/* Main Metric Section - UPDATED TO USE TREND DATA */}
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
                                {displayData.value}
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
                            backgroundColor: displayData.isPositive
                                ? `${colors.changePositive}26`
                                : `${colors.changeNegative}26`,
                        }}
                    >
                        {displayData.isPositive ? (
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
                                color: displayData.isPositive ? colors.changePositive : colors.changeNegative,
                            }}
                        >
                            {displayData.change}
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

                  {currentTab.trendError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {currentTab.trendError}
                    </Alert>
                  )}

                  <Box
                    // Set the ref on the container for position calculation
                    ref={chartContainerRef} 
                    sx={{
                      border: '1px solid #ECECEC',
                      borderRadius: '12px',
                      p: 2,
                      backgroundColor: colors.secondary,
                      position: 'relative', // IMPORTANT for Tooltip positioning
                    }}
                  >
                    {/* Tooltip Renderer */}
                    {tooltipState.show && (
                        <Box
                            sx={{
                                position: 'absolute',
                                // Position above the hovered bar's top
                                bottom: `calc(100% - ${tooltipState.y}px + 8px)`,
                                left: `${tooltipState.x}px`,
                                transform: 'translateX(-50%)', // Center the tooltip horizontally
                                zIndex: 10,
                                backgroundColor: '#333333',
                                color: '#FFFFFF',
                                borderRadius: '4px',
                                p: '4px 8px',
                                pointerEvents: 'none', // Prevents it from blocking the bars
                                whiteSpace: 'nowrap',
                                opacity: tooltipState.show ? 1 : 0,
                                transition: 'opacity 0.1s ease-in-out',
                            }}
                        >
                            <Typography sx={{ fontSize: '12px', fontWeight: 600, fontFamily: '"DM Sans"' }}>
                                {tooltipState.dateLabel}: {tooltipState.formattedValue}
                            </Typography>
                        </Box>
                    )}
                    
                    {/* Max Value Label for Context */}
                    <Typography
                        sx={{
                            color: '#070707',
                            fontSize: '12px',
                            fontWeight: 500,
                            fontFamily: '"DM Sans"',
                            textAlign: 'right',
                            mb: 0.5
                        }}
                    >
                        Max Value: {trendChartMaxValue > 0 ? (activeTab === 'overdue' || activeTab === 'ldr' ? `${trendChartMaxValue.toFixed(1)}%` : `₹ ${trendChartMaxValue.toFixed(2)}`) : 'N/A'}
                    </Typography>

                    {currentTab.isTrendLoading ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '72px' }}>
                        <CircularProgress size={24} />
                      </Box>
                    ) : (
                      <>
                        {/* Bars */}
                        <Stack direction="row" alignItems="flex-end" height="72px" mb={1} spacing={0.5}>
                          {generateTrendChartData().map((height, index) => {
                            const dayLabels = getDayLabels();
                            const currentTrendItem = currentTrendData ? currentTrendData[index] : null;
                            // FIX 3: Check original data for negative value to apply color
                            const isNegative = currentTrendItem ? currentTrendItem.value < 0 : false;
                            const barColor = isNegative ? colors.changeNegative : colors.barChart;
                            const isLatest = index === generateTrendChartData().length - 1;

                            return (
                                <BarWithTooltip
                                    key={index}
                                    height={height}
                                    index={index}
                                    data={currentTrendItem || { date: dayLabels[index], value: 0, percentage: 0 }}
                                    dayLabel={dayLabels[index]}
                                    barColor={barColor}
                                    isLatest={isLatest}
                                />
                            );
                          })}
                        </Stack>

                        {/* Days Labels */}
                        <Stack direction="row" justifyContent="space-between">
                          {getDayLabels().map((day, index) => (
                            <Typography
                              key={index}
                              sx={{
                                // Highlight the latest day dynamically
                                color: index === getDayLabels().length - 1 ? '#161616' : '#737373', 
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
                      </>
                    )}
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
                    {[
                      { label: 'Last Day', value: currentData.periodComparison.lastDay, progress: currentData.progressBars.lastDay },
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
              </>
            ) : null}
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default PerformancePopUp;