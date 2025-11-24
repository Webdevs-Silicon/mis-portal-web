import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinearGradientBackground from "../../components/LinearGradientBackground";

export default function Otp() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const navigate = useNavigate();

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // only numbers or empty

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    // Auto move to next box
    if (value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    console.log("clicked");
    const enteredOtp = otp.join("");
    console.log("Verifying OTP:", enteredOtp);
    // Add your OTP verification logic here
    navigate("/dashboard");
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
      {/* Top Background */}
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

      {/* White Card */}
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
        {/* Bank Logo */}
        {/* <img
          src="/bank-logo.png"
          alt="logo"
          style={{ width: 90, marginBottom: 15 }}
        /> */}

        <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>
          Verify OTP
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
          Please enter the 4 digit code sent to
          <br />
          <strong>+91 9467038895</strong>
        </Typography>

        {/* OTP Boxes */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            mt: 4,
          }}
        >
          {otp.map((digit, index) => (
            <TextField
              key={index}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              inputRef={(el) => (inputRefs.current[index] = el)}
              type="tel"
              slotProps={{
                htmlInput: {
                  // 2. "numeric" + pattern helps iOS and accessibility tools
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "24px",
                    // Removed padding/height here to let Flexbox handle alignment
                  },
                },
              }}
              sx={{
                width: 56,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  height: "56px", // Set height on the container
                  padding: "0px",
                  display: "flex",
                  alignItems: "center", // Vertically center the content
                  justifyContent: "center",
                  border: "none",
                },
                // Ensure the input element inside takes full space but respects center
                "& .MuiOutlinedInput-input": {
                  padding: 0,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                },
              }}
            />
          ))}
        </Box>

        {/* Resend Link */}
        <Typography
          sx={{
            mt: 2,
            mb: 2,
            color: "#d32f2f",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Resend Code
        </Typography>

        {/* Verify Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleVerifyOtp}
          sx={{
            height: 48,
            borderRadius: "25px",
            textTransform: "none",
            fontSize: "16px",
            background: "linear-gradient(90deg, #0066ff, #0099ff)",
          }}
        >
          Verify OTP
        </Button>
      </Box>
    </Box>
  );
}
