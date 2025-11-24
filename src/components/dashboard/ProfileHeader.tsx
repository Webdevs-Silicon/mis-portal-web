import { useState } from "react";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import LogoutIcon from "../../assets/icons/logoutIcon.svg?react";
import ProfilePic from "../../assets/images/default_user.png";
import { useNavigate } from "react-router-dom"; // If not using expo-router
import ConfirmModal from "../ConfirmModal";

type ProfileHeaderProps = {
  name: string;
  imageUrl?: string;
  lastLogin: string;
};

export default function ProfileHeader({
  name,
  imageUrl,
  lastLogin,
}: ProfileHeaderProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCancel = () => {
    setShowLogoutModal(false);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          paddingTop: 4,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "transparent",
        }}
      >
        {/* LEFT SECTION */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={imageUrl || ProfilePic}
            alt="Profile"
            sx={{
              width: 48,
              height: 48,
              border: "2px solid #FFA500",
            }}
          />

          <Box>
            <Typography
              sx={{
                color: "#fff",
              }}
            >
              {name}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" mt={0.3}>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#fff",
                }}
              >
                Last Login {lastLogin}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Logout Button */}
        <IconButton
          onClick={() => setShowLogoutModal(true)}
          sx={{
            backgroundColor: "#ffffff22",
            width: 44,
            height: 44,
            borderRadius: "50%",
            "&:hover": { backgroundColor: "#ffffff33" },
          }}
        >
          <LogoutIcon width={24} height={24} color="#fff" />
        </IconButton>
      </Box>
      <ConfirmModal
        visible={showLogoutModal}
        onCancel={handleCancel}
        onConfirm={handleLogout}
        loading={loading}
        title="Confirm Sign Out"
        message="Are you sure you want to sign out?"
      />
    </>
  );
}
