import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Slide,
  useTheme,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { 
  getLoanPeriodWise, 
  getLoanBranchWise, 
  getLoanCategoryWise,
} from '../../api/services/loanService';
import type {
  GetLoanPeriodWiseResponse,
  GetLoanBranchWiseResponse,
  GetLoanCategoryWiseResponse
} from '../../api/services/loanService';

// Types
type LoanTabType = 'Period' | 'Categories' | 'Branch';

interface LoanRow {
  key: string;
  balance: string;
  od: string;
  odPercent: string;
  textColor?: string;
  indicator?: boolean;
}

interface LoanTabContent {
  key: LoanTabType;
  primaryColumnHeader: string;
  rows: LoanRow[];
  totalRow?: Omit<LoanRow, 'key' | 'indicator' | 'textColor'>;
  footerNote?: string;
}

type LoanData = Partial<Record<LoanTabType, LoanTabContent>>;

// Color scheme constants
const OD_COLORS = {
  GOOD: {
    text: '#379A50',
    background: '#E9FCEE',
    balanceText: 'black',
  },
  AVERAGE: {
    text: '#CD7532',
    background: '#FFF7F1',
    balanceText: 'black',
  },
  POOR: {
    // text: '#CD4444',
    text: '#ffffffff',
    background: '#DF5F5F',
    balanceText: '#CD4444',
  },
};

// Helper function to determine OD color
const getOdColorStyle = (odPercent: string, isTotal: boolean) => {
  if (isTotal) {
    return OD_COLORS.GOOD;
  }
  
  const percentValue = parseFloat(odPercent.replace('%', ''));

  if (percentValue <= 3.5) {
    return OD_COLORS.GOOD;
  } else if (percentValue <= 4.0) {
    return OD_COLORS.AVERAGE;
  } else {
    return OD_COLORS.POOR;
  }
};

// Helper function to format numbers
const formatNumber = (value: number): string => {
  return (value / 100000).toFixed(1); // Convert to lakhs and format to 1 decimal
};

// Helper function to format percentage
const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// LoanTableContent Component
interface LoanTableContentProps {
  data: LoanTabContent;
  isLoading?: boolean;
}

const LoanTableContent: React.FC<LoanTableContentProps> = ({ data, isLoading = false }) => {
  const theme = useTheme();

  const DataRow: React.FC<{ row: LoanRow; isTotal?: boolean; }> = ({ row, isTotal = false }) => {
    const styles = getOdColorStyle(row.odPercent, isTotal);
    const TOTAL_ROW_BG = '#F8FCFF';
    const TOTAL_TEXT_COLOR = '#0068B5';
    const keyTextColor = isTotal ? TOTAL_TEXT_COLOR : 'black';
    const balanceAndODTextColor = isTotal ? TOTAL_TEXT_COLOR : styles.balanceText;

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          py: isTotal ? 1.5 : 1.75,
          borderBottom: isTotal ? 'none' : '1px solid #ececec',
          bgcolor: isTotal ? TOTAL_ROW_BG : (row.indicator ? '#F7FBFF' : 'transparent'),
          fontWeight: isTotal ? 600 : 500,
        }}
      >
        {/* Primary Column (Key) */}
        <Box sx={{ flex: 1.2, display: 'flex', alignItems: 'center', gap: 1 }}>
          {row.indicator && (
            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: theme.palette.primary.main,
                borderRadius: '3px',
              }}
            />
          )}
          <Typography
            sx={{
              fontFamily: 'DM Sans',
              fontWeight: isTotal ? 600 : 500,
              fontSize: 14,
              color: keyTextColor,
            }}
          >
            {row.key}
          </Typography>
        </Box>

        {/* Balance */}
        <Typography
          sx={{
            flex: 0.8,
            fontFamily: 'DM Sans',
            fontWeight: isTotal ? 600 : 500,
            fontSize: 14,
            color: balanceAndODTextColor,
          }}
        >
          {row.balance}
        </Typography>

        {/* OD (Overdue) */}
        <Typography
          sx={{
            flex: 0.5,
            fontFamily: 'DM Sans',
            fontWeight: isTotal ? 600 : 500,
            fontSize: 14,
            color: balanceAndODTextColor,
          }}
        >
          {row.od}
        </Typography>

        {/* OD% Badge */}
        <Box
          sx={{
            bgcolor: styles.background,
            borderRadius: '50px',
            px: 1,
            py: '3px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'DM Sans',
              fontSize: 12,
              fontWeight: 600,
              color: styles.text,
            }}
          >
            {row.odPercent}
          </Typography>
        </Box>
      </Box>
    );
  };

  const totalRowData = data.totalRow;
  const totalRow = totalRowData
    ? ({ key: 'Total', ...totalRowData } as LoanRow & { key: string })
    : null;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
          border: '1px solid #ececec',
          borderRadius: 2,
        }}
      >
        <CircularProgress size={32} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        border: '1px solid #ececec',
        borderRadius: 2,
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Table Header */}
      <Box
        sx={{
          borderBottom: '1px solid #ececec',
          display: 'flex',
          px: 1.5,
          py: 1.25,
        }}
      >
        {[data.primaryColumnHeader, 'Balance (₹L)', 'OD (₹L)', 'OD%'].map((header) => (
          <Typography
            key={header}
            sx={{
              flex:
                header === data.primaryColumnHeader
                  ? 1.2
                  : header === 'Balance (₹L)'
                  ? 0.8
                  : 0.5,
              fontFamily: 'DM Sans',
              fontSize: 12,
              color: '#737373',
              fontWeight: 400,
              textTransform: 'uppercase',
            }}
          >
            {header}
          </Typography>
        ))}
      </Box>

      {/* Data Rows */}
      <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
        {data.rows.map((row) => (
          <DataRow key={row.key} row={row} />
        ))}
      </Box>

      {/* Total Row */}
      {totalRow && <DataRow row={totalRow} isTotal={true} />}

      {/* Footer Note */}
      {data.footerNote && (
        <Box
          sx={{
            bgcolor: '#f7f7f7',
            borderTop: '1px solid #ececec',
            px: 1.5,
            py: 1,
          }}
        >
          <Typography
            sx={{
              fontFamily: 'DM Sans',
              fontSize: 12,
              color: '#6F6F6F',
              lineHeight: '18px',
            }}
          >
            {data.footerNote}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

// Main LoanDetailsPopup Component
interface LoanDetailsPopupProps {
  onClose: () => void;
  open: boolean;
}

const LoanDetailsPopup: React.FC<LoanDetailsPopupProps> = ({ onClose, open }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<LoanTabType>('Period');
  const [loanData, setLoanData] = useState<LoanData>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const loanTabOrder: LoanTabType[] = ['Period', 'Categories', 'Branch'];

  // Fetch all data when popup opens
  useEffect(() => {
    if (open && !initialLoad) {
      fetchAllData();
    }
  }, [open, initialLoad]);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch all APIs in parallel
      const [periodData, categoryData, branchData] = await Promise.all([
        getLoanPeriodWise(),
        getLoanCategoryWise(),
        getLoanBranchWise(),
      ]);

      // Transform and set all data at once
      setLoanData({
        Period: transformPeriodData(periodData),
        Categories: transformCategoryData(categoryData),
        Branch: transformBranchData(branchData),
      });

      setInitialLoad(true);
    } catch (err) {
      console.error('Error fetching loan data:', err);
      setError('Failed to load loan data');
    } finally {
      setLoading(false);
    }
  };

  // Transform API response for Period tab
  const transformPeriodData = (data: GetLoanPeriodWiseResponse): LoanTabContent => {
    const { PeriodWise } = data;
    
    const rows: LoanRow[] = [
      {
        key: 'Yesterday',
        balance: formatNumber(PeriodWise.Yesterday.YesterdayAmt),
        od: formatNumber(PeriodWise.Yesterday.YesterdayOD),
        odPercent: formatPercentage(PeriodWise.Yesterday.YesterdayPer),
        indicator: true, // Highlight current period
      },
      {
        key: 'Last Month',
        balance: formatNumber(PeriodWise.LastMonth.LastMonthAmt),
        od: formatNumber(PeriodWise.LastMonth.LastMonthOD),
        odPercent: formatPercentage(PeriodWise.LastMonth.LastMonthPer),
      },
      {
        key: 'Last Year',
        balance: formatNumber(PeriodWise.LastYear.LastYearAmt),
        od: formatNumber(PeriodWise.LastYear.LastYearOD),
        odPercent: formatPercentage(PeriodWise.LastYear.LastYearPer),
      },
    ];

    return {
      key: 'Period',
      primaryColumnHeader: 'Period',
      rows,
      footerNote: 'Current period highlighted • Lower OD % indicates better portfolio health.',
    };
  };

  // Transform API response for Categories tab
  const transformCategoryData = (data: GetLoanCategoryWiseResponse): LoanTabContent => {
    const { CategoryWise } = data;
    
    const rows: LoanRow[] = [
      {
        key: 'Short Term',
        balance: formatNumber(CategoryWise.ShortTerm.STBal),
        od: formatNumber(CategoryWise.ShortTerm.STOD),
        odPercent: formatPercentage(CategoryWise.ShortTerm.STODPer),
      },
      {
        key: 'Medium Term',
        balance: formatNumber(CategoryWise.MediumTerm.MTBal),
        od: formatNumber(CategoryWise.MediumTerm.MTOD),
        odPercent: formatPercentage(CategoryWise.MediumTerm.MTODPer),
      },
      {
        key: 'Long Term',
        balance: formatNumber(CategoryWise.LongTerm.LTBal),
        od: formatNumber(CategoryWise.LongTerm.LTOD),
        odPercent: formatPercentage(CategoryWise.LongTerm.LTODPer),
      },
      {
        key: 'Staff',
        balance: formatNumber(CategoryWise.Staff.StaffBal),
        od: formatNumber(CategoryWise.Staff.StaffOD),
        odPercent: formatPercentage(CategoryWise.Staff.StaffODPer),
      },
    ];

    const totalRow = {
      balance: formatNumber(CategoryWise.Total.Bal),
      od: formatNumber(CategoryWise.Total.OD),
      odPercent: formatPercentage(CategoryWise.Total.ODPer),
    };

    return {
      key: 'Categories',
      primaryColumnHeader: 'Category',
      rows,
      totalRow,
    };
  };

  // Transform API response for Branch tab
  const transformBranchData = (data: GetLoanBranchWiseResponse): LoanTabContent => {
    const { BranchWise } = data;
    
    // Extract branch names excluding 'Total'
    const branchNames = Object.keys(BranchWise).filter(key => key !== 'Total');
    
    const rows: LoanRow[] = branchNames.map(branchName => ({
      key: branchName,
      balance: formatNumber(BranchWise[branchName].Balance),
      od: formatNumber(BranchWise[branchName].ODBalance),
      odPercent: formatPercentage(BranchWise[branchName].Percentage),
    }));

    const totalRow = BranchWise.Total ? {
      balance: formatNumber(BranchWise.Total.Balance),
      od: formatNumber(BranchWise.Total.ODBalance),
      odPercent: formatPercentage(BranchWise.Total.Percentage),
    } : undefined;

    return {
      key: 'Branch',
      primaryColumnHeader: 'Branch',
      rows,
      totalRow,
    };
  };

  const handleTabChange = (tab: LoanTabType) => {
    setActiveTab(tab);
  };

  const currentTabData = loanData?.[activeTab];

  // Fallback empty data structure when no data is available
  const getEmptyTabData = (): LoanTabContent => ({
    key: activeTab,
    primaryColumnHeader: activeTab,
    rows: [],
  });

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
            width: '100%',
            maxWidth: 480,
            mx: 'auto',
            mb: { xs: 1.5, sm: 2 },
            bgcolor: 'white',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.2)',
            overflow: 'hidden',
            p: 3,
            pb: 4,
            maxHeight: '85vh',
            overflowY: 'auto',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontFamily: 'DM Sans' }}
              >
                Loan Details
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontFamily: 'DM Sans',
                }}
              >
                Comprehensive portfolio analysis
              </Typography>
            </Box>

            <IconButton
              onClick={onClose}
              sx={{
                bgcolor: '#f6f6f6',
                borderRadius: '50%',
                width: 38,
                height: 38,
              }}
            >
              <CloseIcon />
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
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'DM Sans',
                  fontSize: 14,
                  color: '#D32F2F',
                  textAlign: 'center',
                }}
              >
                {error}
              </Typography>
            </Box>
          )}

          {/* Summary Tabs */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {loanTabOrder.map((label) => (
              <Box
                key={label}
                onClick={() => handleTabChange(label)}
                sx={{
                  flex: 1,
                  bgcolor: activeTab === label ? theme.palette.primary.main : 'white',
                  border: activeTab === label ? 'none' : '1px solid #ececec',
                  borderRadius: 2,
                  textAlign: 'center',
                  py: 1.5,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'DM Sans',
                    fontWeight: activeTab === label ? 600 : 400,
                    fontSize: 14,
                    color: activeTab === label ? 'white' : '#737373',
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Table Content */}
          <LoanTableContent 
            data={currentTabData || getEmptyTabData()} 
            isLoading={loading && !initialLoad} 
          />

        </Box>
      </Slide>
    </Modal>
  );
};

export default LoanDetailsPopup;