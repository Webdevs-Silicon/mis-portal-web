// import React from 'react';
// import {
//   Box,
//   Typography,
//   IconButton,
//   Paper,
//   Chip,
//   Modal, // Added Modal
//   Slide, // Added Slide
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { getTopDefaulters } from '../../api/services/defaultersService';

// // Define the data structure
// interface Defaulter {
//   id: number;
//   rank: number;
//   name: string;
//   accountNumber: string;
//   daysOverdue: string;
//   loanType: string;
//   totalDue: string;
//   branch: string;
// }

// // Sample data extracted from the original code
// // NOTE: I've added a few more dummy entries to better illustrate the scrollable list.
// const defaultersData: Defaulter[] = [
//   {
//     id: 1,
//     rank: 1,
//     name: "Elijah Taylor",
//     accountNumber: "789456123987",
//     daysOverdue: "45d",
//     loanType: "Agricultural Loan",
//     totalDue: "₹ 30L",
//     branch: "Palakkad Branch"
//   },
//   {
//     id: 2,
//     rank: 2,
//     name: "Sophia Moore",
//     accountNumber: "123456789012",
//     daysOverdue: "90d",
//     loanType: "Car Loan",
//     totalDue: "₹ 15L",
//     branch: "Kochi City Branch"
//   },
//   {
//     id: 3,
//     rank: 3,
//     name: "Noah Williams",
//     accountNumber: "998877665544",
//     daysOverdue: "15d",
//     loanType: "Home Loan",
//     totalDue: "₹ 25L",
//     branch: "Thrissur Branch"
//   },
//   {
//     id: 4,
//     rank: 4,
//     name: "Ava Brown",
//     accountNumber: "443322110099",
//     daysOverdue: "60d",
//     loanType: "Education Loan",
//     totalDue: "₹ 5L",
//     branch: "Kottayam Branch"
//   },
//   {
//     id: 5,
//     rank: 5,
//     name: "Liam Jones",
//     accountNumber: "135792468013",
//     daysOverdue: "75d",
//     loanType: "Business Loan",
//     totalDue: "₹ 40L",
//     branch: "Kannur Branch"
//   },
//   {
//     id: 6,
//     rank: 6,
//     name: "Emma Johnson",
//     accountNumber: "654321789045",
//     daysOverdue: "120d",
//     loanType: "Personal Loan",
//     totalDue: "₹ 8L",
//     branch: "Trivandrum Branch"
//   },
// ];

// interface Top10DefaultersProps {
//   onClose: () => void; // Made mandatory for Modal functionality
//   open: boolean; // Added 'open' prop for Modal control
// }

// const Top10Defaulters: React.FC<Top10DefaultersProps> = ({ onClose, open }) => {
//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       slotProps={{
//         backdrop: {
//           sx: {
//             // Consistent backdrop styling
//             backgroundColor: 'rgba(0,0,0,0.4)',
//             backdropFilter: 'blur(4px)',
//           },
//         },
//       }}
//     >
//       <Slide direction="up" in={open} mountOnEnter unmountOnExit>
//         <Box
//           // This Box styles the actual sliding content (the 'Popup' itself)
//           sx={{
//             // Replaced centered positioning with bottom-sheet style
//             position: 'fixed',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             width: '100%',
//             maxWidth: 480, // Consistent max-width for alignment
//             mx: 'auto',
//             mb: { xs: 1.5, sm: 2 },
//             bgcolor: 'white',
//             borderTopLeftRadius: '24px', // Consistent radius
//             borderTopRightRadius: '24px',
//             boxShadow: '0 -4px 20px rgba(0,0,0,0.2)', // Consistent shadow
//             overflow: 'hidden',
//             p: 3, // Consistent padding
//             pb: 4,
//             maxHeight: '85vh', // Consistent max height
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '24px',
//             fontFamily: '"DM Sans", sans-serif',
//           }}
//         >
//           {/* Header Section */}
//           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontFamily: 'DM Sans',
//                   fontWeight: 600,
//                   fontSize: '18px',
//                   color: 'rgba(0, 0, 0, 1.00)',
//                   lineHeight: 1.2,
//                 }}
//               >
//                 Top 10 Defaulters
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   fontFamily: 'DM Sans',
//                   fontWeight: 500,
//                   fontSize: '14px',
//                   color: 'rgba(115, 115, 115, 1.00)',
//                 }}
//               >
//                 list of top 10 defaulters
//               </Typography>
//             </Box>

//             <IconButton
//               onClick={onClose}
//               sx={{
//                 bgcolor: 'rgba(246, 246, 246, 1.00)',
//                 width: '38px',
//                 height: '38px',
//                 borderRadius: '50%', // Consistent round button
//                 '&:hover': { bgcolor: 'rgba(230, 230, 230, 1.00)' },
//               }}
//             >
//               <CloseIcon sx={{ fontSize: '20px', color: 'black' }} />
//             </IconButton>
//           </Box>

//           {/* Defaulters List Container */}
//           <Box
//             sx={{
//               flex: 1, // Allows the list to take up remaining height
//               overflowY: 'auto',
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '12px',
//               // Custom Scrollbar styling for list
//               '&::-webkit-scrollbar': { width: '6px' },
//               '&::-webkit-scrollbar-track': {
//                 background: 'rgba(219, 219, 219, 0.3)',
//                 borderRadius: '100px',
//               },
//               '&::-webkit-scrollbar-thumb': {
//                 background: 'rgba(219, 219, 219, 1.00)',
//                 borderRadius: '100px',
//               },
//             }}
//           >
//             {defaultersData.map((defaulter) => (
//               <Paper
//                 key={defaulter.id}
//                 variant="outlined"
//                 sx={{
//                   p: '16px',
//                   borderRadius: '16px',
//                   borderColor: '#ececec',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   gap: '14px',
//                   flexShrink: 0,
//                 }}
//               >
//                 {/* Card Header: Rank, Name, Overdue Badge */}
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
//                     {/* Rank Box */}
//                     <Box
//                       sx={{
//                         width: '40px',
//                         height: '40px',
//                         // Conditional background color based on rank (optional style improvement)
//                         bgcolor: defaulter.rank <= 3 ? 'rgba(255, 217, 217, 1.00)' : 'rgba(246, 246, 246, 1.00)', 
//                         borderRadius: '12px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           color: defaulter.rank <= 3 ? 'rgba(205, 68, 68, 1.00)' : 'rgba(115, 115, 115, 1.00)',
//                           fontWeight: 600,
//                           fontSize: '14px',
//                         }}
//                       >
//                         #{defaulter.rank}
//                       </Typography>
//                     </Box>

//                     {/* Name & Account */}
//                     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                       <Typography
//                         sx={{
//                           fontWeight: 700,
//                           fontSize: '16px',
//                           color: 'rgba(40, 40, 40, 1.00)',
//                           lineHeight: 1.2,
//                         }}
//                       >
//                         {defaulter.name}
//                       </Typography>
//                       <Typography
//                         sx={{
//                           fontWeight: 400,
//                           fontSize: '12px',
//                           color: 'rgba(115, 115, 115, 1.00)',
//                         }}
//                       >
//                         {defaulter.accountNumber}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {/* Days Overdue Badge */}
//                   <Chip
//                     label={defaulter.daysOverdue}
//                     size="small"
//                     sx={{
//                       bgcolor: 'rgba(223, 95, 95, 1.00)',
//                       color: 'white',
//                       fontWeight: 600,
//                       fontSize: '12px',
//                       height: '22px',
//                       '& .MuiChip-label': { px: 1 },
//                     }}
//                   />
//                 </Box>

//                 {/* Card Details: Loan Type, Total Due, Branch */}
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   {/* Loan Type */}
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
//                     <Typography sx={{ fontSize: '12px', color: 'rgba(115, 115, 115, 1.00)' }}>
//                       Loan Type
//                     </Typography>
//                     <Typography sx={{ fontSize: '14px', fontWeight: 600, color: 'rgba(40, 40, 40, 1.00)' }}>
//                       {defaulter.loanType}
//                     </Typography>
//                   </Box>

//                   {/* Total Due */}
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
//                     <Typography sx={{ fontSize: '12px', color: 'rgba(115, 115, 115, 1.00)' }}>
//                       Total Due
//                     </Typography>
//                     <Typography sx={{ fontSize: '14px', fontWeight: 600, color: 'rgba(205, 68, 68, 1.00)' }}>
//                       {defaulter.totalDue}
//                     </Typography>
//                   </Box>

//                   {/* Branch */}
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
//                     <Typography sx={{ fontSize: '12px', color: 'rgba(115, 115, 115, 1.00)' }}>
//                       Branch
//                     </Typography>
//                     <Typography sx={{ fontSize: '14px', fontWeight: 600, color: 'rgba(40, 40, 40, 1.00)' }}>
//                       {defaulter.branch}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Paper>
//             ))}
//           </Box>
//         </Box>
//       </Slide>
//     </Modal>
//   );
// };

// export default Top10Defaulters;
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Chip,
  Modal,
  Slide,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getTopDefaulters, type GetTopDefaultersResponse } from '../../api/services/defaultersService';

interface Top10DefaultersProps {
  onClose: () => void;
  open: boolean;
}

const Top10Defaulters: React.FC<Top10DefaultersProps> = ({ onClose, open }) => {
  const [defaultersData, setDefaultersData] = useState<GetTopDefaultersResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch defaulters data when modal opens
  useEffect(() => {
    if (open) {
      fetchDefaultersData();
    }
  }, [open]);

  const fetchDefaultersData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getTopDefaulters();
      setDefaultersData(data);
    } catch (err) {
      console.error('Error fetching defaulters data:', err);
      setError('Failed to load defaulters data');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format balance to lakhs
  const formatBalance = (balance: number): string => {
    return `₹ ${(balance / 100000).toFixed(1)}L`;
  };

  // Helper function to extract just the number from "45 Days" -> "45d"
  const formatDaysOverdue = (dayString: string): string => {
    const days = dayString.replace(' Days', '').replace(' Day', '');
    return `${days}d`;
  };

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
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          {/* Header Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'DM Sans',
                  fontWeight: 600,
                  fontSize: '18px',
                  color: 'rgba(0, 0, 0, 1.00)',
                  lineHeight: 1.2,
                }}
              >
                Top Defaulters
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'DM Sans',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: 'rgba(115, 115, 115, 1.00)',
                }}
              >
                List of top defaulters
              </Typography>
            </Box>

            <IconButton
              onClick={onClose}
              sx={{
                bgcolor: 'rgba(246, 246, 246, 1.00)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                '&:hover': { bgcolor: 'rgba(230, 230, 230, 1.00)' },
              }}
            >
              <CloseIcon sx={{ fontSize: '20px', color: 'black' }} />
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

          {/* Defaulters List Container */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
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
            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                }}
              >
                <CircularProgress size={32} />
              </Box>
            ) : defaultersData?.DefaulterList && defaultersData.DefaulterList.length > 0 ? (
              defaultersData.DefaulterList.map((defaulter, index) => (
                <Paper
                  key={`${defaulter.AcNo}-${index}`}
                  variant="outlined"
                  sx={{
                    p: '16px',
                    borderRadius: '16px',
                    borderColor: '#ececec',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    flexShrink: 0,
                  }}
                >
                  {/* Card Header: Rank, Name, Overdue Badge */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      {/* Rank Box */}
                      <Box
                        sx={{
                          width: '40px',
                          height: '40px',
                          bgcolor: 'rgba(255, 217, 217, 1.00)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          sx={{
                            color:  'rgba(205, 68, 68, 1.00)' ,
                            fontWeight: 600,
                            fontSize: '14px',
                          }}
                        >
                          #{index + 1}
                        </Typography>
                      </Box>

                      {/* Name & Account */}
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: '16px',
                            color: 'rgba(40, 40, 40, 1.00)',
                            lineHeight: 1.2,
                          }}
                        >
                          {defaulter.Name}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 400,
                            fontSize: '12px',
                            color: 'rgba(115, 115, 115, 1.00)',
                          }}
                        >
                          {defaulter.AcNo.toString()}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Days Overdue Badge */}
                    <Chip
                      label={formatDaysOverdue(defaulter.Day)}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(223, 95, 95, 1.00)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '12px',
                        height: '22px',
                        '& .MuiChip-label': { px: 1 },
                      }}
                    />
                  </Box>

                  {/* Card Details: Loan Type, Total Due, Branch */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Loan Type */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <Typography sx={{ fontSize: '12px', color: 'rgba(115, 115, 115, 1.00)' }}>
                        Loan Type
                      </Typography>
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: 'rgba(40, 40, 40, 1.00)' }}>
                        {defaulter.Product}
                      </Typography>
                    </Box>

                    {/* Total Due */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <Typography sx={{ fontSize: '12px', color: 'rgba(115, 115, 115, 1.00)' }}>
                        Total Due
                      </Typography>
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: 'rgba(205, 68, 68, 1.00)' }}>
                        {formatBalance(defaulter.Balance)}
                      </Typography>
                    </Box>

                    {/* Branch */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <Typography sx={{ fontSize: '12px', color: 'rgba(115, 115, 115, 1.00)' }}>
                        Branch
                      </Typography>
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: 'rgba(40, 40, 40, 1.00)' }}>
                        {defaulter.Branch}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))
            ) : (
              !loading && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 100,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans',
                      fontSize: 14,
                      color: 'rgba(115, 115, 115, 1.00)',
                    }}
                  >
                    No defaulters data available
                  </Typography>
                </Box>
              )
            )}
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default Top10Defaulters;