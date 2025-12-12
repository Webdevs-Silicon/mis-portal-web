// components/dashboard/DashboardLoader.tsx
import { Box, CircularProgress, LinearProgress, Typography } from "@mui/material";

interface DashboardLoaderProps {
  progress?: number;
}

export function DashboardLoader({ progress }: DashboardLoaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#f5f5f5",
        gap: 3,
      }}
    >
      <CircularProgress size={60} />
      
      {progress !== undefined && (
        <Box sx={{ width: "300px", textAlign: "center" }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Loading dashboard... {progress}%
          </Typography>
        </Box>
      )}
      
      <Typography variant="h6" color="primary">
        Loading your dashboard data
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Please wait while we fetch your financial information
      </Typography>
    </Box>
  );
}