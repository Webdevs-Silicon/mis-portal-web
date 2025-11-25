import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LinearGradientBackground from "../../components/LinearGradientBackground";
import { useEffect, useState } from "react";
import { fetchBankLogo } from "../../api/services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [logo, setLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cachedLogo = localStorage.getItem("bankLogo");

    if (cachedLogo) {
      setLogo(cachedLogo);
      setLoading(false);
      return;
    }

    const loadLogo = async () => {
      try {
        const base64 = await fetchBankLogo();
        if (base64) {
          const img = `data:image/png;base64,${base64}`;
          localStorage.setItem("bankLogo", img);
          setLogo(img);
        }
      } catch (err) {
        console.error("Error loading logo:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLogo();
  }, []);

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
      <LinearGradientBackground
        sx={{
          flex: 1, // Expand naturally to fill top space
          justifyContent: "flex-start",
          pt: 8, // Push logo down slightly
        }}
      >
        <img
          src="/cobraLogo.png"
          alt="logo"
          style={{ width: 150, objectFit: "contain" }}
        />
      </LinearGradientBackground>

      {/* White Bottom Card */}
      <Box
        sx={{
          background: "#fff",
          height: "360px",
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          p: 4,
          textAlign: "center",
          mt: -3,
          zIndex: 10,
          position: "relative",
        }}
      >
        <Typography variant="h5" fontWeight={700} marginBottom={2}>
          Welcome, Ganesh
        </Typography>

        {loading ? (
          <CircularProgress sx={{ color: "#fff" }} />
        ) : (
          <img src={logo ?? ""} alt="Bank Logo" style={{ width: 98 }} />
        )}

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
