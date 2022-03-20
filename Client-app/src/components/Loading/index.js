/**
 * @fileoverview This component displays the loading indicator.
 *
 */
import Box from "@mui/material/Box";
import { LinearProgress } from "@mui/material";

/**
 * Show loading indicator while data is loading
 * @returns {JSX.Element}
 */
const Loading = () => {
  return (
    <Box
      sx={{
        width: "75%",
        bgcolor: "background.paper",
        boxShadow: "1",
        borderRadius: "2",
        p: "2",
        textAlign: "center",
        mx: "auto",
      }}
    >
      <Box sx={{ color: "text.primary" }}>Loading</Box>
      <LinearProgress />
    </Box>
  );
};

export default Loading;
