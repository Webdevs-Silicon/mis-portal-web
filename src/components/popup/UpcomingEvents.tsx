// import React from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Card,
//   CardContent,
//   useTheme,
//   Modal, // Added Modal
//   Slide, // Added Slide
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import EventIcon from "@mui/icons-material/Event";
// import { getAllEvent } from "../../api/services/eventService";

// // ----------------------------------------------------------------------
// // TYPES AND DATA
// // ----------------------------------------------------------------------

// interface UpcomingEventsProps {
//   onClose: () => void;
//   open: boolean; // Added 'open' prop for Modal control
// }

// interface EventItem {
//   title: string;
//   description: string;
//   date: string;
//   time: string;
//   weekday: string;
//   duration: string;
//   section1Label: string;
//   section1Value: string;
// }

// const eventsData: EventItem[] = [
//   {
//     title: "Product Launch",
//     description: "Marketing Strategy Overview",
//     date: "November 15, 2025",
//     time: "1:00PM",
//     weekday: "Monday",
//     duration: "Duration:3h",
//     section1Label: "Venue",
//     section1Value: "Innovation Center, Auditorium",
//   },
//   {
//     title: "Team Retreat",
//     description: "Annual team–building activities and workshops",
//     date: "December 5, 2025",
//     time: "9:00AM",
//     weekday: "Saturday",
//     duration: "Duration:1d",
//     section1Label: "Location",
//     section1Value: "Mountain Resort, Main Lodge",
//   },
//   {
//     title: "Client Review",
//     description: "Review of client projects and feedback sessions",
//     date: "January 20, 2026",
//     time: "2:00PM",
//     weekday: "Wednesday",
//     duration: "Duration:2h",
//     section1Label: "Site",
//     section1Value: "Corporate Office – Meeting Room 4B",
//   },
// ];

// // ----------------------------------------------------------------------
// // MAIN COMPONENT
// // ----------------------------------------------------------------------

// const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ onClose, open }) => {
//   const theme = useTheme();

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       slotProps={{
//         backdrop: {
//           sx: {
//             // Apply similar backdrop styling as in LoanDetailsPopup
//             backgroundColor: "rgba(0,0,0,0.4)",
//             backdropFilter: "blur(4px)",
//           },
//         },
//       }}
//     >
//       {/* Slide Transition Wrapper */}
//       <Slide direction="up" in={open} mountOnEnter unmountOnExit>
//         <Box
//           // This Box styles the actual sliding content (the 'Popup' itself)
//           sx={{
//             position: "fixed",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             width: "100%",
//             // Keep the max-width for better desktop/tablet view on wide screens
//             maxWidth: 480, 
//             mx: "auto",
//             mb: { xs: 1.5, sm: 2 },
//             bgcolor: "white",
//             borderTopLeftRadius: "24px", // Adjusted radius for consistency
//             borderTopRightRadius: "24px",
//             boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
//             overflow: "hidden",
//             p: 3, // Adjusted padding for consistency with LoanDetailsPopup
//             pb: 4,
//             maxHeight: "85vh",
//             overflowY: "auto",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {/* HEADER */}
//           <Box sx={{ display: "flex", alignItems: "center", mb: 2, flexShrink: 0 }}>
//             <Box sx={{ flex: 1 }}>
//               <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "18px" }}>
//                 Upcoming Events
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 List of all Upcoming Events
//               </Typography>
//             </Box>

//             <IconButton
//               onClick={onClose}
//               sx={{
//                 bgcolor: "#F6F6F6",
//                 borderRadius: "50%", // Changed to 50% for a perfect circle button
//                 width: 38,
//                 height: 38,
//               }}
//             >
//               <CloseIcon sx={{ fontSize: 20 }} />
//             </IconButton>
//           </Box>

//           {/* CONTENT – SCROLLABLE */}
//           <Box
//             sx={{
//               // Removed flex: 1 and maxWidth to let content fill available space in the parent Box
//               overflowY: "auto",
//               pb: 2,
//               width: "100%",
//             }}
//           >
//             {eventsData.map((event, index) => (
//               <Card
//                 key={index}
//                 sx={{
//                   width: "100%",
//                   border: "1px solid",
//                   borderColor: "divider",
//                   borderRadius: 3,
//                   overflow: "hidden",
//                   mb: 2,
//                 }}
//               >
//                 <CardContent sx={{ p: 2 }}>
//                   <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
//                     {/* ICON */}
//                     <Box
//                       sx={{
//                         background: "#6DC1FF",
//                         height: 48,
//                         width: 48,
//                         borderRadius: 2,
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         flexShrink: 0,
//                         mr: 1.5,
//                       }}
//                     >
//                       <EventIcon sx={{ color: "white", fontSize: 26 }} />
//                     </Box>

//                     {/* TITLE + DESCRIPTION */}
//                     <Box>
//                       <Typography fontSize="17px" fontWeight={600}>
//                         {event.title}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{ fontSize: "14px", mt: 0.3 }}
//                       >
//                         {event.description}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {/* DATE + TIME */}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       mb: 1,
//                     }}
//                   >
//                     <Typography sx={{ fontWeight: 600, fontSize: "15px" }}>
//                       {event.date}
//                     </Typography>
//                     <Typography sx={{ fontWeight: 600 }}>
//                       {event.time}
//                     </Typography>
//                   </Box>

//                   {/* WEEKDAY + DURATION */}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       mb: 2,
//                     }}
//                   >
//                     <Typography color="text.secondary" sx={{ fontSize: "13px" }}>
//                       {event.weekday}
//                     </Typography>
//                     <Typography color="text.secondary" sx={{ fontSize: "13px" }}>
//                       {event.duration}
//                     </Typography>
//                   </Box>

//                   {/* LABEL */}
//                   <Typography
//                     variant="caption"
//                     sx={{ color: "text.secondary", fontSize: "12px" }}
//                   >
//                     {event.section1Label}
//                   </Typography>

//                   {/* VALUE */}
//                   <Typography
//                     sx={{
//                       fontWeight: 600,
//                       fontSize: "15px",
//                       mt: 0.5,
//                       color: theme.palette.text.primary,
//                     }}
//                   >
//                     {event.section1Value}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             ))}
//           </Box>
//         </Box>
//       </Slide>
//     </Modal>
//   );
// };

// export default UpcomingEvents;
import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  useTheme,
  Modal,
  Slide,
  CircularProgress, // Added for loading state
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MeetingIcon from "../../assets/icons/meetingIcon.svg?react";
import {
  getAllEvent,
 type GetAllEventResponse,
 type EventDetails,
} from "../../api/services/eventService"; 

interface UpcomingEventsProps {
  onClose: () => void;
  open: boolean;
}

// Interface for the data structure to be displayed in the UI, derived from EventDetails
interface DisplayEventItem {
  id: string; // Unique ID for key, using ScheduleDate + Time + Subject
  title: string;
  description: string; // Maps to Subject
  date: string; // Maps to ScheduleDate
  time: string; // Maps to Time
  weekday: string; // This will require a date conversion utility
  duration: string; // Maps to Duration
  section1Label: string; // Fixed label: "Address"
  section1Value: string; // Maps to Address
}

// ----------------------------------------------------------------------
// UTILITY FUNCTIONS
// ----------------------------------------------------------------------

/**
 * Finds the actual heading from the EventDetails object.
 * It iterates through 'Heading', 'Heading 2', ..., 'Heading 5' and returns the first defined value.
 * @param event The EventDetails object from the API response.
 * @returns The event title string.
 */
const getEventTitle = (event: EventDetails): string => {
  if (event.Heading) return event.Heading;
  if (event["Heading 2"]) return event["Heading 2"];
  if (event["Heading 3"]) return event["Heading 3"];
  if (event["Heading 4"]) return event["Heading 4"];
  if (event["Heading 5"]) return event["Heading 5"];
  return "Untitled Event"; // Fallback title
};

/**
 * Converts a date string (e.g., "11/12/2025") to a formatted string including the weekday (e.g., "December 11, 2025").
 * @param dateStr The date string in "MM/DD/YYYY" format.
 * @returns An object containing the formatted date and weekday.
 */
const formatDateAndWeekday = (dateStr: string) => {
  // Assuming the date format is "MM/DD/YYYY" based on the response: "11/12/2025"
  const dateParts = dateStr.split("/");
  // Note: Date constructor uses YYYY-MM-DD for consistency. Month is 0-indexed.
  if (dateParts.length !== 3) {
    return { formattedDate: dateStr, weekday: "Unknown Day" };
  }
  const [month, day, year] = dateParts.map(Number);

  // Creating a date object: month - 1 because months are 0-indexed (0=Jan, 11=Dec)
  const date = new Date(year, month - 1, day);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });

  return { formattedDate, weekday };
};

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ onClose, open }) => {
  const theme = useTheme();

  const [apiResponse, setApiResponse] = useState<
    GetAllEventResponse | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when the modal opens
  useEffect(() => {
    if (open && !apiResponse && !loading && !error) {
      setLoading(true);
      setError(null);
      getAllEvent()
        .then((data) => {
          setApiResponse(data);
        })
        .catch((err) => {
          console.error("Failed to fetch events:", err);
          setError("Failed to load events. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]); // Depend on 'open' to trigger fetch when modal is opened

  // Memoize the mapping of API data to display data
  const displayEvents: DisplayEventItem[] = useMemo(() => {
    if (!apiResponse || !apiResponse.EventDetails) return [];

    return apiResponse.EventDetails.map((event: EventDetails, index: number) => {
      const { formattedDate, weekday } = formatDateAndWeekday(
        event.ScheduleDate
      );
      return {
        id: `${event.ScheduleDate}-${event.Time}-${index}`, // Unique key
        title: getEventTitle(event),
        description: event.Subject,
        date: formattedDate,
        time: event.Time,
        weekday: weekday,
        duration: `Duration: ${event.Duration}`,
        section1Label: "Address", // Fixed label
        section1Value: event.Address.replace(/,/g, ", "), // Replace commas with ", " for better readability
      };
    });
  }, [apiResponse]);

  // Determine the content to display (Loading, Error, or Events List)
  const renderContent = () => {
    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 4,
          }}
        >
          <CircularProgress size={30} />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Loading Events...
          </Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        </Box>
      );
    }

    if (displayEvents.length === 0) {
      return (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            No upcoming events found.
          </Typography>
        </Box>
      );
    }

    // Event List Mapping
    return displayEvents.map((event) => (
      <Card
        key={event.id}
        sx={{
          width: "100%",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          overflow: "hidden",
          mb: 2,
          boxShadow: "none",
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
            {/* ICON */}
            <Box
              sx={{
                background: "#F7F5FF",
                height: 48,
                width: 48,
                borderRadius: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
                mr: 1.5,
              }}
            >
              <MeetingIcon />
            </Box>

            {/* TITLE + DESCRIPTION */}
            <Box>
              <Typography fontSize="17px" fontWeight={600}>
                {event.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "14px", mt: 0.3 }}
              >
                {event.description}
              </Typography>
            </Box>
          </Box>

          {/* DATE + TIME */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: "15px" }}>
              {event.date}
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>{event.time}</Typography>
          </Box>

          {/* WEEKDAY + DURATION */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1.8,
            }}
          >
            <Typography color="text.secondary" sx={{ fontSize: "13px" }}>
              {event.weekday}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "13px" }}>
              {event.duration}
            </Typography>
          </Box>

          {/* ADDRESS LABEL */}
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontSize: "12px" }}
          >
            {event.section1Label}
          </Typography>

          {/* ADDRESS VALUE */}
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "15px",
              mt: 0.5,
              color: theme.palette.text.primary,
            }}
          >
            {event.section1Value}
          </Typography>
        </CardContent>
      </Card>
    ));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      {/* Slide Transition Wrapper */}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box
          // This Box styles the actual sliding content (the 'Popup' itself)
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            // Keep the max-width for better desktop/tablet view on wide screens
            maxWidth: 480,
            mx: "auto",
            mb: { xs: 1.5, sm: 2 },
            bgcolor: "white",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
            overflow: "hidden",
            p: 3,
            pb: 4,
            maxHeight: "85vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* HEADER */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, flexShrink: 0 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "18px" }}>
                Upcoming Events
              </Typography>
              <Typography variant="body2" color="text.secondary">
                List of all Upcoming Events
              </Typography>
            </Box>

            <IconButton
              onClick={onClose}
              sx={{
                bgcolor: "#F6F6F6",
                borderRadius: "50%",
                width: 38,
                height: 38,
              }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* CONTENT – SCROLLABLE */}
          <Box
            sx={{
              overflowY: "auto",
              pb: 2,
              width: "100%",
            }}
          >
            {renderContent()}
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default UpcomingEvents;