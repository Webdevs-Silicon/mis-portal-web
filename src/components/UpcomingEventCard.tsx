import { Box, Typography, Paper } from "@mui/material";
import { sizes, colors } from "../theme/theme";
import MeetingIcon from "../assets/icons/meetingIcon.svg?react";

import type { LatestEvent } from "../api/services/eventService";

interface UpcomingEventCardProps {
  event: LatestEvent | null;
}

function getDayFromDate(dateStr: string): string {
  const [day, month, year] = dateStr.split("/").map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString("en-US", { weekday: "long" });
}

export default function UpcomingEventCard({ event }: UpcomingEventCardProps) {
  if (!event) return null;

  const { Heading, Subject, ScheduleDate, Time, Duration, Address } = event;
  const day = getDayFromDate(ScheduleDate);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: "#F8FBFF",
        border: "1px solid #E6EEF7",
        width: "100%",
      }}
    >
      {/* Header + Icon */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            backgroundColor: "#F3ECFF",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MeetingIcon width={22} height={22} />
        </Box>

        <Typography
          sx={{
            fontSize: sizes.mediumLarge,
            fontWeight: 600,
            color: colors.textPrimary,
          }}
        >
          {Heading}
        </Typography>
      </Box>

      {/* Subject */}
      <Typography
        sx={{
          fontSize: sizes.base,
          color: colors.textSecondary,
          mt: 0.5,
          mb: 2,
        }}
      >
        {Subject}
      </Typography>

      {/* Date + Time Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: sizes.base, fontWeight: 600 }}>
            {ScheduleDate}
          </Typography>
          <Typography
            sx={{ fontSize: sizes.small, color: colors.textSecondary }}
          >
            {day}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Typography sx={{ fontSize: sizes.base, fontWeight: 600 }}>
            {Time}
          </Typography>
          <Typography
            sx={{ fontSize: sizes.small, color: colors.textSecondary }}
          >
            Duration: {Duration}
          </Typography>
        </Box>
      </Box>

      {/* Address */}
      <Typography
        sx={{
          fontSize: sizes.small,
          color: colors.textSecondary,
          fontWeight: 500,
        }}
      >
        Address
      </Typography>
      <Typography
        sx={{
          fontSize: sizes.base,
          fontWeight: 600,
          mt: 0.3,
        }}
      >
        {Address}
      </Typography>
    </Paper>
  );
}
