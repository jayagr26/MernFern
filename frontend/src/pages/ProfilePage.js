import { Box, CircularProgress } from "@mui/material";
import Profile from "../components/Profile";
import ProfileService from "../services/profile.service";
import { useQuery } from "react-query";

const ProfilePage = () => {
  const { isLoading: isLoadingProfile, data: userProfile } = useQuery(
    "profile",
    ProfileService.getProfile
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {isLoadingProfile ? (
        <CircularProgress />
      ) : (
        <Profile userProfile={userProfile} />
      )}
    </Box>
  );
};

export default ProfilePage;
