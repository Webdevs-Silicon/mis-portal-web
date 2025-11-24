import { Button, Typography } from "@mui/material";
import RightIcon from "../assets/icons/rightArrow.svg?react";

type Props = {
  title: string;
  onPress: () => void;
  fullWidth?: boolean;
  style?: object;
};

export default function ViewMoreButton({
  title,
  onPress,
  fullWidth = true,
  style,
}: Props) {
  return (
    <Button
      onClick={onPress}
      fullWidth={fullWidth}
      variant="contained"
      endIcon={<RightIcon />}
      sx={{
        backgroundColor: "primary.main",
        borderRadius: "25px",
        paddingY: "14px",
        paddingX: "24px",
        textTransform: "none",
        marginTop: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1.2,
        ...style,
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          fontSize: "15px",
          fontFamily: "DM Sans, sans-serif", // or your theme font
        }}
      >
        {title}
      </Typography>
    </Button>
  );
}
