import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../store";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Topbar = () => {
  const navigate = useNavigate();
  const {reset} = store(state => state)
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const clickLogout = (e) => {
    e.preventDefault()
    localStorage.clear();
    reset()
    navigate('/login')
  };

  return (
    <Box display="flex" justifyContent="space-between" p="20px">
      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={clickLogout}>
          <LogoutOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
