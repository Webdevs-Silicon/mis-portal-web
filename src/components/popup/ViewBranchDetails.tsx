// import React from 'react';
// import {
//   Box,
//   Typography,
//   IconButton,
//   Paper,
//   Modal, // Added Modal
//   Slide, // Added Slide
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import BusinessIcon from '@mui/icons-material/Business'; // Branch icon
// import PeopleIcon from '@mui/icons-material/People'; // Staff icon
// import PhoneIcon from '@mui/icons-material/Phone'; // Contact icon
// import { getAllBranch } from '../../api/services/branchService';

// // Define the Branch interface
// interface Branch {
//   id: number;
//   name: string;
//   manager: string;
//   staffCount: string;
//   contactNumber: string;
// }

// // Sample data extracted from the file
// const branchData: Branch[] = [
//   {
//     id: 1,
//     name: "Kochi Metro branch",
//     manager: "Suresh Pillai",
//     staffCount: "20 Staff",
//     contactNumber: "9447923456"
//   },
//   {
//     id: 2,
//     name: "Thiruvananthapuram branch",
//     manager: "Ramesh Kumar", // Placeholder for incomplete snippet
//     staffCount: "15 Staff",
//     contactNumber: "9678901234"
//   },
//   {
//     id: 3,
//     name: "Kozhikode City branch",
//     manager: "Anita Thomas",
//     staffCount: "12 Staff",
//     contactNumber: "9876543210"
//   },
// ];

// interface ViewBranchDetailsProps {
//   onClose: () => void; // Made mandatory for Modal functionality
//   open: boolean; // Added 'open' prop for Modal control
// }

// const ViewBranchDetails: React.FC<ViewBranchDetailsProps> = ({ onClose, open }) => {
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
//             // Removed fixed center positioning and replaced with bottom-sheet style
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
//                 All Branches
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
//                 List of all branches
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

//           {/* Branch List Container */}
//           <Box
//             sx={{
//               flex: 1, // Allows the list to take up remaining height
//               overflowY: 'auto',
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '12px',
//               // Removed pr: 1 as the scrollbar styles are sufficient
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
//             {branchData.map((branch) => (
//               <Paper
//                 key={branch.id}
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
//                 {/* Branch Info Header */}
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                   <Box
//                     sx={{
//                       width: '40px',
//                       height: '40px',
//                       borderRadius: '12px',
//                       bgcolor: 'rgba(232, 242, 249, 1.00)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <BusinessIcon sx={{ color: '#4a90e2', fontSize: '22px' }} />
//                   </Box>

//                   <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                     <Typography
//                       sx={{
//                         fontSize: '16px',
//                         fontWeight: 700,
//                         color: 'rgba(40, 40, 40, 1.00)',
//                         lineHeight: 1.2,
//                       }}
//                     >
//                       {branch.name}
//                     </Typography>
//                     <Typography
//                       sx={{
//                         fontSize: '14px',
//                         fontWeight: 400,
//                         color: 'rgba(115, 115, 115, 1.00)',
//                       }}
//                     >
//                       {branch.manager}
//                     </Typography>
//                   </Box>
//                 </Box>

//                 {/* Branch Details (Staff & Contact) */}
//                 <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
//                   {/* Staff Count Badge */}
//                   <Box
//                     sx={{
//                       flex: 1,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       gap: '8px',
//                       border: '1px solid #ececec',
//                       borderRadius: '100px',
//                       py: '8px',
//                       px: '12px',
//                     }}
//                   >
//                     <PeopleIcon sx={{ fontSize: '16px', color: 'rgba(115, 115, 115, 1.00)' }} />
//                     <Typography
//                       sx={{
//                         fontSize: '12px',
//                         fontWeight: 600,
//                         color: 'rgba(40, 40, 40, 1.00)',
//                       }}
//                     >
//                       {branch.staffCount}
//                     </Typography>
//                   </Box>

//                   {/* Contact Number Badge */}
//                   <Box
//                     sx={{
//                       flex: 1,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       gap: '8px',
//                       bgcolor: 'rgba(235, 253, 233, 1.00)',
//                       borderRadius: '100px',
//                       py: '8px',
//                       px: '12px',
//                     }}
//                   >
//                     <PhoneIcon sx={{ fontSize: '16px', color: '#4CAF50' }} />
//                     <Typography
//                       sx={{
//                         fontSize: '12px',
//                         fontWeight: 600,
//                         color: 'rgba(40, 40, 40, 1.00)',
//                       }}
//                     >
//                       {branch.contactNumber}
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

// export default ViewBranchDetails;
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Modal,
  Slide,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BranchIcon from "../../assets/icons/branchIcon.svg?react";
import StaffIcon from "../../assets/icons/staffIcon.svg?react";
import MobileIcon from "../../assets/icons/phoneIcon.svg?react";
import { getAllBranch, type GetAllBranchResponse } from '../../api/services/branchService';

interface ViewBranchDetailsProps {
  onClose: () => void;
  open: boolean;
}

const ViewBranchDetails: React.FC<ViewBranchDetailsProps> = ({ onClose, open }) => {
  const [branchData, setBranchData] = useState<GetAllBranchResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch branch data when modal opens
  useEffect(() => {
    if (open) {
      fetchBranchData();
    }
  }, [open]);

  const fetchBranchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getAllBranch();
      setBranchData(data);
    } catch (err) {
      console.error('Error fetching branch data:', err);
      setError('Failed to load branch data');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format phone number
  // const formatPhoneNumber = (phone: number): string => {
  //   const phoneStr = phone.toString();
  //   // Format as XXX-XXX-XXXX
  //   return `${phoneStr.slice(0, 3)}-${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
  // };

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
                All Branches
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
                List of all branches
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

          {/* Branch List Container */}
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
            ) : branchData?.MemberDetails && branchData.MemberDetails.length > 0 ? (
              branchData.MemberDetails.map((branch, index) => (
                <Paper
                  key={`${branch.Branch}-${index}`}
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
                  {/* Branch Info Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Box
                      sx={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        bgcolor: 'rgba(232, 242, 249, 1.00)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <BranchIcon />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        sx={{
                          fontSize: '16px',
                          fontWeight: 700,
                          color: 'rgba(40, 40, 40, 1.00)',
                          lineHeight: 1.2,
                        }}
                      >
                        {branch.Branch}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: 400,
                          color: 'rgba(115, 115, 115, 1.00)',
                        }}
                      >
                        {branch.Head}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Branch Details (Staff & Contact) */}
                  <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    {/* Staff Count Badge */}
                    <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        border: '1px solid #ececec',
                        borderRadius: '100px',
                        py: '8px',
                        px: '12px',
                      }}
                    >
                     <StaffIcon/>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: 'rgba(40, 40, 40, 1.00)',
                        }}
                      >
                        {branch.StaffCount} Staff
                      </Typography>
                    </Box>

                    {/* Contact Number Badge */}
                    {/* <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        bgcolor: 'rgba(235, 253, 233, 1.00)',
                        borderRadius: '100px',
                        py: '8px',
                        px: '12px',
                         minWidth: 0,
                      }}
                    >
                     <MobileIcon/>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: 'rgba(40, 40, 40, 1.00)',
                        }}
                      >
                        {formatPhoneNumber(branch.MobNo)}
                      </Typography>
                    </Box> */}
                    {/* Contact Number Badge */}
<Box
  sx={{
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    bgcolor: 'rgba(235, 253, 233, 1.00)',
    borderRadius: '100px',
    py: '8px',
    px: '12px',
    minWidth: 0, // Add this to allow shrinking
  }}
>
  <MobileIcon />
  <Typography
    sx={{
      fontSize: '12px',
      fontWeight: 600,
      color: 'rgba(40, 40, 40, 1.00)',
      whiteSpace: 'nowrap', // Add this to prevent wrapping
      overflow: 'hidden', // Add this
      textOverflow: 'ellipsis', // Optional: adds "..." if text is too long
    }}
  >
    {branch.MobNo}
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
                    No branch data available
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

export default ViewBranchDetails;