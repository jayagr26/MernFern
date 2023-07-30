import { Box } from "@mui/system";
import Display from "../components/Display";

const HomePage = () => {
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
      <Display />
    </Box>
  );
};

export default HomePage;
