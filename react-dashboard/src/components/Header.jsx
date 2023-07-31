import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="0px" display="flex">
      <Typography
        variant="h3"
        color={colors.greenAccent[400]}
        fontWeight="bold"
        sx={{ m: "0 10px 0px 0" }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;