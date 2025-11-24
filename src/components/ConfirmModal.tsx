import {
  Dialog,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import LogoutIcon from "../assets/icons/logoutIcon.svg?react";

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Dialog
      open={visible}
      onClose={onCancel}
      PaperProps={{
        sx: {
          borderRadius: "30px",
          padding: 3,
          width: "100%",
          maxWidth: "360px",
          m: 2,
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            backgroundColor: "#FFF4E6",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 1.25,
            mb: 2.5,
          }}
        >
          <LogoutIcon width={24} height={24} color="#F7941D" />
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 1,
            fontSize: "18px",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontWeight: 500,
            mb: 3,
            px: 1,
            fontSize: "14px",
          }}
        >
          {message}
        </Typography>

        <Box sx={{ width: "100%" }}>
          <Button
            variant="contained"
            fullWidth
            onClick={onConfirm}
            disabled={loading}
            sx={{
              height: 48,
              borderRadius: "50px",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 500,
              mb: 1.5,
              boxShadow: "none",
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              confirmText
            )}
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={onCancel}
            sx={{
              height: 48,
              borderRadius: "50px",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 500,
              borderColor: "divider",
              color: "primary.main",
              "&:hover": {
                borderColor: "divider",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            {cancelText}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
