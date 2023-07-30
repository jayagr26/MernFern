import { Typography } from "@mui/material";

const Profile = ({ userProfile }) => {
  return (
    <div
      style={{
        padding: "20px 50px",
        alignSelf: "center",
        boxShadow: "2px 2px 5px 5px lightgrey",
      }}
    >
      <img src="./prof-img.jpg" width="300px" style={{ borderRadius: "50%" }} />
      <Typography variant="h5">{`Name: ${
        (userProfile && userProfile.username) || ""
      }`}</Typography>
      <Typography variant="h5">{`Email: ${
        (userProfile && userProfile.email) || ""
      }`}</Typography>
      <Typography variant="h5">Contact: +91 362436</Typography>
    </div>
  );
};

export default Profile;
