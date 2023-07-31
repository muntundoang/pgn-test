import { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Typography,
  iconButtonClasses,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import { store } from "../../store";
import { defaultPhoto } from "../../data/default-photo";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  if (selected === title) {
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
          backgroundColor: "#868dfb",
        }}
        onClick={() => setSelected(title)}
        icon={icon}
        component={<Link to={to} />}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    );
  } else {
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
        component={<Link to={to} />}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    );
  }
};

const Sidebarmenu = () => {
  const { user } = store((state) => state);
  const { collapseSidebar, collapsed } = useProSidebar();
  const [selected, setSelected] = useState("Dashboard");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        minHeight: 0,
      }}
    >
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            background: `${colors.primary[400]} !important`,
          },
          [`.ps-menu-button:hover`]: {
            backgroundColor: "#6870fa",
          },
          [`.${iconButtonClasses.colorPrimary}`]: {
            backgroundColor: "transparant !important",
          },
          [`.${menuClasses.open}`]: {
            color: "#868dfb !important",
          },
        }}
      >
        <Menu
          rootStyles={{
            [`.css-1l8icbj`]: {
              paddingRight: "5px",
              paddingLeft: "5px",
            },
          }}
        >
          <main>
            <MenuItem
              icon={
                collapsed ? (
                  <IconButton onClick={() => collapseSidebar()}>
                    <MenuOutlinedIcon />
                  </IconButton>
                ) : undefined
              }
              style={{
                margin: "10px 0 10px 0",
                color: colors.grey[100],
                cursor: "default",
              }}
            >
              {!collapsed && (
                <Box display="flex" justifyContent="start" alignItems="center">
                  <IconButton onClick={() => collapseSidebar()}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
            {!collapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={defaultPhoto}
                    style={{ borderRadius: "50%", objectFit: "contain" }}
                  />
                </Box>
                <Box
                  textAlign="center"
                  sx={{
                    cursor: "default",
                  }}
                >
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    textTransform={"uppercase"}
                    color={colors.greenAccent[300]}
                  >
                    {user.role}
                  </Typography>
                </Box>
              </Box>
            )}
          </main>
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            {/* <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Department"
              to="/department"
              icon={<ApartmentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Spendings"
              to="/spendings"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Sidebarmenu;
