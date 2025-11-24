import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/otp");
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "100dvh", md: "100vh" },
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Background Header */}
      <Box
        sx={{
          flex: 1, // expands naturally
          background: "#0066ff",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          pt: 4,
        }}
      >
        <img
          src="/cobraLogo.png"
          alt="logo"
          style={{ width: 150, objectFit: "contain" }}
        />
      </Box>

      {/* White Bottom Card */}
      <Box
        sx={{
          background: "#fff",
          height: "370px",
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          p: 4,
          textAlign: "center",
          mt: -3,
          zIndex: 10,
          position: "relative",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Welcome, Ganesh
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 1, color: "text.secondary", mb: 4 }}
        >
          Stay informed with your bank’s key performance highlights at a glance.
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            height: 48,
            borderRadius: "25px",
            textTransform: "none",
            fontSize: "16px",
            background: "linear-gradient(90deg, #0066ff, #0099ff)",
          }}
        >
          Log in to View Reports
        </Button>
      </Box>
    </Box>
  );
}
