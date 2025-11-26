import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Modal, // Added Modal
  Slide, // Added Slide
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface MemberDetailsProps {
  onClose: () => void;
  open: boolean; // Added 'open' prop for Modal control
}

interface ClassData {
  name: string;
  color: string;
  members: string;
  shareCapital: string;
  periodData: {
    period: string;
    members: string;
    capital: string;
    borrowers: string;
    membersColor?: string;
    capitalColor?: string;
  }[];
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ onClose, open }) => {
  // Removed useTheme as it's not strictly necessary for the structural change

  const classData: ClassData[] = [
    {
      name: 'A Class',
      color: '#6DC1FF',
      members: '12,564',
      shareCapital: '₹ 56.34L',
      periodData: [
        {
          period: 'Yesterday',
          members: '12,967',
          capital: '68.56',
          borrowers: '8,234',
          membersColor: '#CD4444',
          capitalColor: '#CD4444',
        },
        {
          period: 'Last Month',
          members: '13,565',
          capital: '56.34',
          borrowers: '8,234',
        },
        {
          period: 'Last Year',
          members: '13,565',
          capital: '56.34',
          borrowers: '8,234',
        },
      ],
    },
    {
      name: 'C Class',
      color: '#ECCE49',
      members: '4,567',
      shareCapital: '₹ 12.23L',
      periodData: [
        {
          period: 'Yesterday',
          members: '12,967',
          capital: '68.56',
          borrowers: '8,234',
          membersColor: '#CD4444',
          capitalColor: '#CD4444',
        },
        {
          period: 'Last Month',
          members: '13,565',
          capital: '56.34',
          borrowers: '8,234',
        },
        {
          period: 'Last Year',
          members: '13,565',
          capital: '56.34',
          borrowers: '8,234',
        },
      ],
    },
    // Adding a third class item to ensure scrolling is tested/visible
    {
      name: 'B Class',
      color: '#4CAF50',
      members: '8,123',
      shareCapital: '₹ 30.10L',
      periodData: [
        {
          period: 'Yesterday',
          members: '8,100',
          capital: '30.05',
          borrowers: '5,000',
        },
        {
          period: 'Last Month',
          members: '7,900',
          capital: '28.50',
          borrowers: '4,800',
        },
        {
          period: 'Last Year',
          members: '7,000',
          capital: '25.00',
          borrowers: '4,000',
        },
      ],
    },
  ];

  const columnHeaders = ['Period', 'Members', 'Capital (₹L)', 'Borrowers'];

  const DataRow: React.FC<{
    period: string;
    members: string;
    capital: string;
    borrowers: string;
    membersColor?: string;
    capitalColor?: string;
    isLast?: boolean;
  }> = ({
    period,
    members,
    capital,
    borrowers,
    membersColor,
    capitalColor,
    isLast,
  }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        pt: 1.75,
        pb: isLast ? 0.3 : 1.75, // Uses 8px (.3) instead of 14px (1.75) for the last row
        px: 1.5,
        borderBottom: isLast ? 'none' : '1px solid',
        borderColor: 'divider',
        // Ensuring inner text sizes match the design (DM Sans default is not set here)
        fontSize: '14px',
      }}
    >
      <Typography sx={{ width: 90, fontWeight: 500, fontSize: 'inherit' }}>{period}</Typography>
      <Typography
        sx={{
          width: 70,
          fontWeight: 500,
          color: membersColor || 'text.primary',
          fontSize: 'inherit',
        }}
      >
        {members}
      </Typography>
      <Typography
        sx={{
          width: 86,
          fontWeight: 500,
          color: capitalColor || 'text.primary',
          fontSize: 'inherit',
        }}
      >
        {capital}
      </Typography>
      <Typography sx={{ width: 74, fontWeight: 500, fontSize: 'inherit' }}>{borrowers}</Typography>
    </Box>
  );

  const HeaderRow = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        py: 1.25,
        px: 1.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      {columnHeaders.map((header) => (
        <Typography
          key={header}
          variant="caption"
          sx={{
            textTransform: 'uppercase',
            color: 'text.secondary',
            fontWeight: 500,
            fontSize: '10px', // Adjusted to match typical small caption style
            width:
              header === 'Period'
                ? 90
                : header === 'Members'
                  ? 70
                  : header === 'Capital (₹L)'
                    ? 86
                    : 74,
          }}
        >
          {header}
        </Typography>
      ))}
    </Box>
  );

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
        {/* Content Box - Styled as the bottom sheet */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            maxWidth: 480, // Consistent max-width for alignment
            mx: 'auto',
            mb: { xs: 1.5, sm: 2 },
            background: 'white',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            boxShadow: '0 -4px 20px rgba(0,0,0,0.2)',
            overflow: 'hidden',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            p: 3, // Increased padding for bottom sheet aesthetic
            pb: 4,
          }}
        >
          {/* Header - Set to flexShrink 0 so it doesn't collapse */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexShrink: 0 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: '18px' }}>
                Member Details
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px' }}>
                Comprehensive membership analysis
              </Typography>
            </Box>

            <IconButton
              onClick={onClose}
              sx={{ background: '#F6F6F6', borderRadius: '50%' }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* Content Area - Scrollable */}
          <Box
            sx={{
              overflowY: 'auto', // Enable vertical scrolling
              flex: 1,           // Take up remaining space
              width: '100%',
              // Removed maxWidth: 353 since the outer box controls the width
              py: 1, // Added back some vertical padding for content separation
              // Custom Scrollbar styling
              pr: 0.5, // Add slight padding right for scrollbar clearance
              '&::-webkit-scrollbar': { width: '6px' },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(219, 219, 219, 0.3)',
                borderRadius: '100px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(219, 219, 219, 1.00)',
                borderRadius: '100px',
              },
            }}
          >
            {/* Class Cards */}
            {classData.map((classItem) => (
              <Card
                key={classItem.name}
                variant="outlined" // Use outlined variant for a cleaner look
                sx={{
                  width: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  mb: 2,
                  borderColor: '#ececec',
                }}
              >
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                  {/* Class Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      py: 1.25,
                      px: 1.5,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          background: classItem.color,
                          borderRadius: '50%', // Round dot
                          height: 8,
                          width: 8,
                          mr: 1,
                          flexShrink: 0,
                        }}
                      />
                      <Typography fontWeight={600} sx={{ fontSize: '16px' }}>
                        {classItem.name}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '10px' }}>
                          Members
                        </Typography>
                        <Typography fontWeight={600} sx={{ fontSize: '14px' }}>
                          {classItem.members}
                        </Typography>
                      </Box>

                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '10px' }}>
                          Share Capital (₹L)
                        </Typography>
                        <Typography fontWeight={600} sx={{ fontSize: '14px' }}>
                          {classItem.shareCapital}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Table */}
                  <HeaderRow />

                  {classItem.periodData.map((row, index) => (
                    <DataRow
                      key={index}
                      {...row}
                      isLast={index === classItem.periodData.length - 1}
                    />
                  ))}
                </CardContent>
              </Card>
            ))}

            {/* Footer */}
            <Box
              sx={{
                background: '#E9FCEE',
                borderRadius: 2,
                py: 1.25,
                px: 1.5,
              }}
            >
              <Typography variant="caption" color="#2A8240" fontWeight={600} sx={{ fontSize: '12px' }}>
                +13.7% YoY Growth
              </Typography>
            </Box>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default MemberDetails;