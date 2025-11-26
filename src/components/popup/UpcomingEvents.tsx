import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  useTheme,
  Modal, // Added Modal
  Slide, // Added Slide
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";

// ----------------------------------------------------------------------
// TYPES AND DATA
// ----------------------------------------------------------------------

interface UpcomingEventsProps {
  onClose: () => void;
  open: boolean; // Added 'open' prop for Modal control
}

interface EventItem {
  title: string;
  description: string;
  date: string;
  time: string;
  weekday: string;
  duration: string;
  section1Label: string;
  section1Value: string;
}

const eventsData: EventItem[] = [
  {
    title: "Product Launch",
    description: "Marketing Strategy Overview",
    date: "November 15, 2025",
    time: "1:00PM",
    weekday: "Monday",
    duration: "Duration:3h",
    section1Label: "Venue",
    section1Value: "Innovation Center, Auditorium",
  },
  {
    title: "Team Retreat",
    description: "Annual team–building activities and workshops",
    date: "December 5, 2025",
    time: "9:00AM",
    weekday: "Saturday",
    duration: "Duration:1d",
    section1Label: "Location",
    section1Value: "Mountain Resort, Main Lodge",
  },
  {
    title: "Client Review",
    description: "Review of client projects and feedback sessions",
    date: "January 20, 2026",
    time: "2:00PM",
    weekday: "Wednesday",
    duration: "Duration:2h",
    section1Label: "Site",
    section1Value: "Corporate Office – Meeting Room 4B",
  },
];

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ onClose, open }) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            // Apply similar backdrop styling as in LoanDetailsPopup
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
            borderTopLeftRadius: "24px", // Adjusted radius for consistency
            borderTopRightRadius: "24px",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
            overflow: "hidden",
            p: 3, // Adjusted padding for consistency with LoanDetailsPopup
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
                borderRadius: "50%", // Changed to 50% for a perfect circle button
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
              // Removed flex: 1 and maxWidth to let content fill available space in the parent Box
              overflowY: "auto",
              pb: 2,
              width: "100%",
            }}
          >
            {eventsData.map((event, index) => (
              <Card
                key={index}
                sx={{
                  width: "100%",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  overflow: "hidden",
                  mb: 2,
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                    {/* ICON */}
                    <Box
                      sx={{
                        background: "#6DC1FF",
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
                      <EventIcon sx={{ color: "white", fontSize: 26 }} />
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
                    <Typography sx={{ fontWeight: 600 }}>
                      {event.time}
                    </Typography>
                  </Box>

                  {/* WEEKDAY + DURATION */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography color="text.secondary" sx={{ fontSize: "13px" }}>
                      {event.weekday}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: "13px" }}>
                      {event.duration}
                    </Typography>
                  </Box>

                  {/* LABEL */}
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    {event.section1Label}
                  </Typography>

                  {/* VALUE */}
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
            ))}
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default UpcomingEvents;