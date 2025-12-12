// import { Box, Button, TextField, Typography } from "@mui/material";
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import cobraLogo  from "../../assets/images/cobraLogo.png"
// import LinearGradientBackground from "../../components/LinearGradientBackground";
// import { resendOtp, verifyOtp } from "../../api/services/authService";

// export default function Otp() {
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [logo, setLogo] = useState<string | null>(null);
//   const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedLogo = localStorage.getItem("bankLogo");
//     setLogo(savedLogo);
//   }, []);

//   const handleChange = (value: string, index: number) => {
//     if (!/^\d?$/.test(value)) return; // only numbers or empty

//     const updated = [...otp];
//     updated[index] = value;
//     setOtp(updated);

//     // Auto move to next box
//     if (value !== "" && index < 3) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
//     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleVerifyOtp = async () => {
//     const enteredOtp = otp.join("");
//     console.log("Verifying OTP:", enteredOtp);
//     const res = await verifyOtp({
//       OTP: enteredOtp,
//     });
//     if (res.RC === "0") {
//       console.log("Otp res: ", res);
//       navigate("/dashboard");
//     } else {
//       console.log("Otp res: ", res);
//     }
//   };

//   const handleResendOtp = async () => {
//     const res = await resendOtp({});
//     if (res.RC === "0") {
//       console.log("New otp sent");
//     } else {
//       console.log("Otp send failed:", res);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: { xs: "100dvh", md: "100vh" },
//         display: "flex",
//         flexDirection: "column",
//         overflow: "hidden",
//       }}
//     >
//       {/* Top Background */}
//       <LinearGradientBackground
//         sx={{
//           flex: 1, // Expand naturally to fill top space
//           justifyContent: "flex-start",
//           pt: 8, // Push logo down slightly
//         }}
//       >
//         <img
//           // src="/cobraLogo.png"
//           src={cobraLogo}
//           alt="logo"
//           style={{ width: 150, objectFit: "contain" }}
//         />
//       </LinearGradientBackground>

//       {/* White Card */}
//       <Box
//         sx={{
//           background: "#fff",
//           height: "460px",
//           borderTopLeftRadius: "30px",
//           borderTopRightRadius: "30px",
//           p: 4,
//           textAlign: "center",
//           mt: -3,
//           zIndex: 10,
//           position: "relative",
//         }}
//       >
//         {logo && <img src={logo} alt="Bank Logo" style={{ width: 98 }} />}

//         <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>
//           Verify OTP
//         </Typography>

//         <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
//           Please enter the 4 digit code sent to
//           <br />
//           <strong>+91 9467038895</strong>
//         </Typography>

//         {/* OTP Boxes */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             justifyContent: "center",
//             mt: 4,
//           }}
//         >
//           {otp.map((digit, index) => (
//             <TextField
//               key={index}
//               value={digit}
//               onChange={(e) => handleChange(e.target.value, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               inputRef={(el) => (inputRefs.current[index] = el)}
//               type="tel"
//               slotProps={{
//                 htmlInput: {
//                   // 2. "numeric" + pattern helps iOS and accessibility tools
//                   inputMode: "numeric",
//                   pattern: "[0-9]*",
//                   maxLength: 1,
//                   style: {
//                     textAlign: "center",
//                     fontSize: "24px",
//                     // Removed padding/height here to let Flexbox handle alignment
//                   },
//                 },
//               }}
//               sx={{
//                 width: 56,
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "4px",
//                   height: "56px", // Set height on the container
//                   padding: "0px",
//                   display: "flex",
//                   alignItems: "center", // Vertically center the content
//                   justifyContent: "center",
//                   border: "none",
//                 },
//                 // Ensure the input element inside takes full space but respects center
//                 "& .MuiOutlinedInput-input": {
//                   padding: 0,
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   border: "none",
//                 },
//               }}
//             />
//           ))}
//         </Box>

//         {/* Resend Link */}
//         <Typography
//           onClick={handleResendOtp}
//           sx={{
//             mt: 2,
//             mb: 2,
//             color: "#d32f2f",
//             fontWeight: 600,
//             cursor: "pointer",
//           }}
//         >
//           Resend Code
//         </Typography>

//         {/* Verify Button */}
//         <Button
//           variant="contained"
//           fullWidth
//           onClick={handleVerifyOtp}
//           sx={{
//             height: 48,
//             borderRadius: "25px",
//             textTransform: "none",
//             fontSize: "16px",
//             background: "linear-gradient(90deg, #0066ff, #0099ff)",
//           }}
//         >
//           Verify OTP
//         </Button>
//       </Box>
//     </Box>
//   );
// }
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import cobraLogo from "../../assets/images/cobraLogo.png";
import LinearGradientBackground from "../../components/LinearGradientBackground";
import { verifyOtp } from "../../api/services/authService";
import { setMobile, setToken } from "../../api/client/apiClient";

export default function Otp() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [logo, setLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  const { mobileNumber } = useParams();
  const location = useLocation();
  
  // Get OTP data passed from login component
  const otpInfo = location.state as { otp: string; validUntil: string } | null;
  // console.log('OTP_INF',otpInfo)

  useEffect(() => {
    // Get logo from localStorage
    const savedLogo = localStorage.getItem("bankLogo");
    setLogo(savedLogo);

    // Focus first OTP input on mount
    if (inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

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
    
    // Auto submit on Enter when last digit is entered
    if (e.key === "Enter" && index === 3 && otp.join("").length === 4) {
      handleVerifyOtp();
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    
    if (enteredOtp.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    if (!mobileNumber) {
      setError("Mobile number not found. Please go back and try again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await verifyOtp({
        MobileNo: mobileNumber,
        OTP: enteredOtp,
      });
      
      if (res.RC === 0) {
        // Store token in localStorage or context
        // localStorage.setItem("authToken", res.TokenNo);
        // localStorage.setItem("mobileNumber", res.MobileNo);
        
        // Navigate to dashboard
        setToken(res.TokenNo);
        setMobile(res.MobileNo);
        navigate("/dashboard", { replace: true });
        // navigate("/dashboard");
      } else {
        setError(res.Message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
          flex: 1,
          justifyContent: "flex-start",
          pt: 8,
        }}
      >
        <img
          src={cobraLogo}
          alt="logo"
          style={{ width: 150, objectFit: "contain" }}
        />
      </LinearGradientBackground>

      {/* White Card */}
      <Box
        sx={{
          background: "#fff",
          minHeight: "460px",
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          p: 4,
          textAlign: "center",
          mt: -3,
          zIndex: 10,
          position: "relative",
        }}
      >
        {logo && <img src={logo} alt="Bank Logo" style={{ width: 98 }} />}

        <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>
          Verify OTP
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
          Please enter the 4 digit code sent to
          <br />
          <strong>+91 {mobileNumber}</strong>
        </Typography>
        <Typography variant="caption">
          {otpInfo?.otp}
        </Typography>
        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* OTP Boxes */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            mt: 4,
            mb:2
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
              disabled={loading}
              slotProps={{
                htmlInput: {
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "24px",
                  },
                },
              }}
              sx={{
                width: 56,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                  height: "56px",
                  padding: "0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                },
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

        {/* Verify Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleVerifyOtp}
          disabled={loading || otp.join("").length !== 4}
          sx={{
            height: 48,
            borderRadius: "25px",
            textTransform: "none",
            fontSize: "16px",
            background: "linear-gradient(90deg, #0066ff, #0099ff)",
            color:"white"
          }}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </Box>
    </Box>
  );
}