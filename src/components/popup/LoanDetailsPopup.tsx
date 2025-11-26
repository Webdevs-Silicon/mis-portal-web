import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Slide,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

type LoanData = Record<LoanTabType, LoanTabContent>;

// Data
const loanData: LoanData = {
  Period: {
    key: 'Period',
    primaryColumnHeader: 'Period',
    rows: [
      {
        key: 'Today',
        balance: '360.1',
        od: '12.5',
        odPercent: '3.5%',
        indicator: true,
      },
      {
        key: 'Yesterday',
        balance: '358.8',
        od: '12.8',
        odPercent: '3.6%',
      },
      {
        key: 'Last Month',
        balance: '337.2',
        od: '14.2',
        odPercent: '4.2%',
      },
      {
        key: 'Last Year',
        balance: '298.5',
        od: '17.3',
        odPercent: '5.8%',
      },
    ],
    footerNote: 'Current period highlighted • Lower OD % indicates better portfolio health.',
  },
  Categories: {
    key: 'Categories',
    primaryColumnHeader: 'Category',
    rows: [
      {
        key: 'Short Term',
        balance: '125.4',
        od: '4.2',
        odPercent: '3.3%',
      },
      {
        key: 'Medium Term',
        balance: '158.7',
        od: '5.8',
        odPercent: '3.7%',
      },
      {
        key: 'Long Term',
        balance: '68.3',
        od: '2.1',
        odPercent: '3.1%',
      },
      {
        key: 'Staff',
        balance: '7.7',
        od: '0.4',
        odPercent: '5.2%',
      },
    ],
    totalRow: {
      balance: '360.1',
      od: '12.5',
      odPercent: '3.5%',
    },
  },
  Branch: {
    key: 'Branch',
    primaryColumnHeader: 'Branch',
    rows: [
      {
        key: 'Main Branch',
        balance: '125.4',
        od: '4.2',
        odPercent: '3.3%',
      },
      {
        key: 'City Center',
        balance: '158.7',
        od: '5.8',
        odPercent: '3.7%',
      },
      {
        key: 'East Zone',
        balance: '68.3',
        od: '2.1',
        odPercent: '3.1%',
      },
      {
        key: 'BKM Hospital Op.',
        balance: '7.7',
        od: '0.4',
        odPercent: '5.2%',
      },
      {
        key: 'West Zone',
        balance: '7.7',
        od: '0.4',
        odPercent: '5.2%',
      },
      {
        key: 'North Plaza',
        balance: '68.3',
        od: '2.1',
        odPercent: '3.1%',
      },
      {
        key: 'Kannur Town main br',
        balance: '7.7',
        od: '0.4',
        odPercent: '5.2%',
      },
    ],
    totalRow: {
      balance: '360.1',
      od: '12.5',
      odPercent: '3.5%',
    },
  },
};

const loanTabOrder: LoanTabType[] = ['Period', 'Categories', 'Branch'];

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
    text: '#CD4444',
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

// LoanTableContent Component
interface LoanTableContentProps {
  data: LoanTabContent;
}

const LoanTableContent: React.FC<LoanTableContentProps> = ({ data }) => {
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
  const currentTabData = loanData[activeTab];

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

          {/* Summary Tabs */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {loanTabOrder.map((label) => (
              <Box
                key={label}
                onClick={() => setActiveTab(label)}
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
          <LoanTableContent data={currentTabData} />

        </Box>
      </Slide>
    </Modal>
  );
};

export default LoanDetailsPopup;