import { Alert, Box, Skeleton, Typography } from "@mui/material";
import { sizes } from "../../theme/theme";
import InfoCardSkeleton from "../skeleton/InfoCardSkeleton";
import ViewMoreButton from "../ViewMoreButton";
import { useState } from "react";
import UpcomingEventCard from "../UpcomingEventCard";
import type { LatestEvent } from "../../api/services/eventService";
import UpcomingEvents from "../popup/UpcomingEvents";

interface EventDetailsSectionProps {
  eventOverviewData: LatestEvent | null;
  loading?: boolean;
  error?: string | null;
}

export default function EventDetailsSection({
  eventOverviewData,
  loading,
  error,
}: EventDetailsSectionProps) {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const handleClosePopup = () => setActivePopup(null);

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error || "Failed to load event data."}
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box marginTop={2}>
        <InfoCardSkeleton rows={1} />

        <Skeleton
          variant="rounded"
          height={45}
          width="100%"
          sx={{ borderRadius: 2, mt: 2 }}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        sx={{
          fontSize: sizes.mediumLarge,
          fontWeight: 600,
          mb: 2,
        }}
      >
        Upcoming Events
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <UpcomingEventCard event={eventOverviewData} />
      </Box>
      <ViewMoreButton
        title="All Upcoming Events"
        onPress={() => setActivePopup("EventDetailsPopUp")}
      />
      {activePopup === "EventDetailsPopUp" && (
        <UpcomingEvents open={true} onClose={handleClosePopup} />
      )}
    </Box>
  );
}
