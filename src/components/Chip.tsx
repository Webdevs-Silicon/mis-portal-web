// import { Box, Typography } from "@mui/material";
// import TrendingUpIcon from "../assets/icons/trendingUpIcon.svg?react";
// import TrendingDownRed from "../assets/icons/trendingDownRed.svg?react"

// type ChipProps = {
//   isPositive: boolean; // REQUIRED
//   text: string; // "0.35"
// };

// export default function Chip({ isPositive, text }: ChipProps) {
//   const color = isPositive ? "#379B50" : "#DF5F5F";
//   const icon = isPositive ? (
//     <TrendingUpIcon height={14} width={14} />
//   ) : (
//     <TrendingDownRed height={14} width={14} />
//   );
//   const backgroundColor = isPositive ? "#E9FCEE" : "#FCE9E9";

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: 0.3,
//         width: 65,
//         height: 26,
//         borderRadius: "20px",
//         backgroundColor,
//       }}
//     >
//       <Box
//         sx={{
//           color,
//           display: "flex",
//           alignItems: "center",
//           lineHeight: 0,
//         }}
//       >
//         {icon}
//       </Box>
//       <Typography
//         sx={{
//           fontSize: "12px",
//           fontWeight: 500,
//           color,
//           fontFamily: "Inter, sans-serif",
//           lineHeight: 1,
//         }}
//       >
//         {text}
//       </Typography>
//     </Box>
//   );
// }
import { Box, Typography } from "@mui/material";
import TrendingUpIcon from "../assets/icons/trendingUpIcon.svg?react";
import TrendingDownRed from "../assets/icons/trendingDownRed.svg?react"

type ChipProps = {
  isPositive?: boolean; // Make optional
  text: string; // "0.35%" or "-0.35%"
  autoDetect?: boolean; // Add auto-detect option
};

export default function Chip({ isPositive, text, autoDetect = false }: ChipProps) {
  // Auto-detect if enabled
  let finalIsPositive = isPositive;
  
  if (autoDetect) {
    // Extract numeric value (remove % sign and parse)
    const numericText = text.replace('%', '').replace('+', '').replace('-', '');
    const numericValue = parseFloat(numericText);
    
    // Check if text contains minus sign or value is negative
    if (text.includes('-') || numericValue < 0) {
      finalIsPositive = false;
    } else if (text.includes('+') || numericValue > 0) {
      finalIsPositive = true;
    } else {
      finalIsPositive = false; // Default to false for zero/neutral
    }
  }
  
  const color = finalIsPositive ? "#379B50" : "#DF5F5F";
  const icon = finalIsPositive ? (
    <TrendingUpIcon height={14} width={14} />
  ) : (
    <TrendingDownRed height={14} width={14} />
  );
  const backgroundColor = finalIsPositive ? "#E9FCEE" : "#FCE9E9";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.3,
        width: 65,
        height: 26,
        borderRadius: "20px",
        backgroundColor,
      }}
    >
      <Box
        sx={{
          color,
          display: "flex",
          alignItems: "center",
          lineHeight: 0,
        }}
      >
        {icon}
      </Box>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 500,
          color,
          fontFamily: "Inter, sans-serif",
          lineHeight: 1,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}