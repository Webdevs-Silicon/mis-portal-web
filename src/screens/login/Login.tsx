// import { Box, Button, CircularProgress, Typography } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import LinearGradientBackground from "../../components/LinearGradientBackground";
// import { useEffect, useState } from "react";
// import { fetchBankLogo, signIn } from "../../api/services/authService";
// import cobraLogo  from "../../assets/images/cobraLogo.png"

// export default function Login() {
//   const navigate = useNavigate();
//   const {mobileNumber} = useParams();
//   console.log("MOBILE__NUMBER",mobileNumber)

//   const [logo, setLogo] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const cachedLogo = localStorage.getItem("bankLogo");

//     if (cachedLogo) {
//       setLogo(cachedLogo);
//       setLoading(false);
//       return; 
//     }

//     const loadLogo = async () => {
//       try {
//         const base64 = await fetchBankLogo();
//         if (base64) {
//           const img = `data:image/png;base64,${base64}`;
//           localStorage.setItem("bankLogo", img);
//           setLogo(img);
//         }
//       } catch (err) {
//         console.error("Error loading logo:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadLogo();
//   }, []);

//   const handleLogin = () => {
//     navigate("/otp");
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
//       {/* Background Header */}
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

//       {/* White Bottom Card */}
//       <Box
//         sx={{
//           background: "#fff",
//           height: "360px",
//           borderTopLeftRadius: "30px",
//           borderTopRightRadius: "30px",
//           p: 4,
//           textAlign: "center",
//           mt: -3,
//           zIndex: 10,
//           position: "relative",
//         }}
//       >
//         <Typography variant="h5" fontWeight={700} marginBottom={2}>
//           Welcome, Ganesh
//         </Typography>

//         {loading ? (
//           <CircularProgress sx={{ color: "#fff" }} />
//         ) : (
//           <img src={logo ?? ""} alt="Bank Logo" style={{ width: 98 }} />
//         )}

//         <Typography
//           variant="body2"
//           sx={{ mt: 1, color: "text.secondary", mb: 4 }}
//         >
//           Stay informed with your bank’s key performance highlights at a glance.
//         </Typography>

//         <Button
//           variant="contained"
//           fullWidth
//           onClick={handleLogin}
//           sx={{
//             height: 48,
//             borderRadius: "25px",
//             textTransform: "none",
//             fontSize: "16px",
//             background: "linear-gradient(90deg, #0066ff, #0099ff)",
//           }}
//         >
//           Log in to View Reports
//         </Button>
//       </Box>
//     </Box>
//   );
// }
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import LinearGradientBackground from "../../components/LinearGradientBackground";
import { useEffect, useState } from "react";
import { fetchBankLogo, signIn } from "../../api/services/authService";
import cobraLogo from "../../assets/images/cobraLogo.png";
import { setMobile } from "../../api/client/apiClient";

export default function Login() {
  const navigate = useNavigate();
  const { mobileNumber } = useParams(); // Get mobile number from URL
  const [logo, setLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mobileNo, setMobileNo] = useState<string>("");
  const [otpData, setOtpData] = useState<{ otp: string; validUntil: string } | null>(null);

  // console.log(mobile)

  useEffect(() => {
    // Set mobile number from URL if present
    if (mobileNumber) {
      setMobileNo(mobileNumber);
    }
    
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
  }, [mobileNumber]);

  const handleLogin = async () => {
    // console.log("mobilenumlogin",mobile)
    try {
      // If mobile number is not in URL, show error or handle accordingly
      console.log(!mobileNo)
      if (!mobileNo) {
        alert("Mobile number is required");
        return;
      }

      // Call signIn API
      const response = await signIn({ MobileNo: mobileNo });
      
      if (response.RC === 0) {
        // Save OTP data for development (show on OTP screen)
        // localStorage.setItem("user_mobile_no", mobile);
        setMobile(mobileNo)
        setOtpData({
          otp: response.OTP,
          validUntil: response.ValidUntil
        });
        
        // Navigate to OTP screen with mobile number
        navigate(`/otp/${mobileNo}`,{
          state:{
            otp:response.OTP,
            validUntil:response.ValidUntil
          }
        });
      } else {
        alert(response.Message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
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
      {/* Background Header */}
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
          {/* {mobile ? `Welcome, +91 ${mobile}` : "Welcome"} */}
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
          Stay informed with your bank's key performance highlights at a glance.
        </Typography>

        {/* Show mobile number if available */}
        {/* {mobile && (
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            Logging in with: +91 {mobile}
          </Typography>
        )} */}

        {/* Development OTP Display */}
        {otpData && (
          <Box sx={{ 
            mb: 2, 
            p: 2, 
            bgcolor: '#f5f5f5', 
            borderRadius: '8px',
            border: '1px dashed #ccc'
          }}>
            <Typography variant="body2" color="primary" fontWeight={600}>
              [Development Only] OTP: {otpData.otp}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Valid until: {otpData.validUntil}
            </Typography>
          </Box>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          disabled={!mobileNo} // Disable if no mobile number
          sx={{
            height: 48,
            borderRadius: "25px",
            textTransform: "none",
            fontSize: "16px",
            background: mobileNo 
              ? "linear-gradient(90deg, #0066ff, #0099ff)"
              : "grey",
          }}
        >
          {mobileNo ? "Log in to View Reports" : "Waiting for mobile number..."}
        </Button>

        {/* Show instruction if no mobile in URL */}
        {!mobileNumber && (
          <Typography variant="caption" sx={{ mt: 2, display: 'block', color: 'error.main' }}>
            Note: Please access this page with a mobile number in the URL
          </Typography>
        )}
      </Box>
    </Box>
  );
}