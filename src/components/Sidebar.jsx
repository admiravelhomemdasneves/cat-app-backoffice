import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ViewListIcon from '@mui/icons-material/ViewList';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import PrintIcon from '@mui/icons-material/Print';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import { useGetCurrentUser } from "../api/users/getCurrentUser";
import { useGetMyPermissions } from "../api/permissions/getMyPermissions";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to}/>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { data: currentUser } = useGetCurrentUser();
  const { data: permissions } = useGetMyPermissions();

  const canViewPage = (path) => {
    if (!permissions) return true;
    const rule = permissions.find(p => p.backofficePage.path === path);
    return !rule || (rule.canView ?? true);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',  // ← at least full viewport, grows with content
        "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
            color: colors.secondary[500] + " !important",
        },
        "& .pro-menu-item.active": {
            color: colors.secondary[400] + " !important",
        },
        "& .pro-sidebar": {
            height: "100% !important",
        },
        "& .pro-sidebar > .pro-sidebar-inner": {
            height: "100% !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  CATAPP
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {currentUser?.username || "—"}
                </Typography>
                <Typography variant="h5" color={colors.secondary[500]}>
                  {currentUser?.accessLevelName || ""}
                </Typography>
              </Box>
            </Box>
          )}

          {/*MENU ITEMS*/}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
            />

            {!isCollapsed && (
                <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                >
                    Management
                </Typography>
            )}

            {canViewPage('/orders') && (
                <Item
                    title="Orders"
                    to="/orders"
                    icon={<ReceiptOutlinedIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                />
            )}

            {canViewPage('/contacts') && (
                <Item
                    title="Contacts"
                    to="/contacts"
                    icon={<ContactsOutlinedIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                />
            )}

            {canViewPage('/material') && (
                <Item
                    title="Materials"
                    to="/material"
                    icon={<HandymanOutlinedIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                />
            )}

            {!isCollapsed && (
                <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                >
                    Backoffice Settings
                </Typography>
            )}

            {canViewPage('/roles') && (
                <Item
                    title="Roles"
                    to="/roles"
                    icon={<AdminPanelSettingsOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
            )}

            {canViewPage('/orderStatus') && (
                <Item
                    title="Statuses"
                    to="/orderStatus"
                    icon={<ViewListIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
            )}

            {canViewPage('/orderPriority') && (
                <Item
                    title="Priorities"
                    to="/orderPriority"
                    icon={<KeyboardDoubleArrowUpIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
            )}

            {canViewPage('/printingService') && (
                <Item
                    title="Printing Services"
                    to="/printingService"
                    icon={<PrintIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
            )}

            {!isCollapsed && (
                <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                >
                    Account
                </Typography>
            )}

            {canViewPage('/colaborators') && (
                <Item
                    title="Colaborators"
                    to="/colaborators"
                    icon={<PeopleAltOutlinedIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                />
            )}

            <Item
                title="User Settings"
                to="/settings"
                icon={<ManageAccountsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />

            <Item
                title="Company Settings"
                to="/company-settings"
                icon={<BusinessOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
