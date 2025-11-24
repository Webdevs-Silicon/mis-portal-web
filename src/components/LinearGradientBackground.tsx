import { Box } from "@mui/material";
import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";
import Topology from "../assets/topology.svg";

// 1. Define the interface for your props
interface LinearGradientBackgroundProps {
  children: ReactNode; // Accepts JSX, text, or nested components
  sx?: SxProps<Theme>; // Accepts MUI style objects (optional)
}

// 2. Apply the interface to the component props
const LinearGradientBackground = ({
  children,
  sx,
}: LinearGradientBackgroundProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(135deg, #0074D9 0%, #5ca2fdff 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      {/* Pattern Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${Topology})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 1,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LinearGradientBackground;
