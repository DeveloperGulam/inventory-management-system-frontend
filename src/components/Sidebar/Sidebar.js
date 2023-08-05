import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Tooltip, ListItemIcon, ListItemText, ListItem } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const [isExpanded, setExpanded] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  useEffect(() => {
    const validateUser = () => {
        if (!localStorage["token"]) {
            navigate("/");
        }
    }

    validateUser();
  }, [navigate]);
  
  const handleToggleSidebar = () => {
    setExpanded(!isExpanded);
    onClose(!isExpanded)
  };

  const handleMenuClick = (menuName) => {
    setSelectedMenu(menuName);
  };

  const handleLogout = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to logout from this portal?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#21C39E',
        confirmButtonText: 'Yes, Logout!'
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("token");
            navigate("/", { replace: true });
        }
      });
  };

  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon className="s-menu" /> },
    { name: "Request Permission", icon: <LockPersonIcon className="s-menu" /> },
    { name: "Profile", icon: <PersonIcon className="s-menu" /> },
    { name: "Settings", icon: <SettingsIcon className="s-menu" /> },
  ];

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="toggle-icon" style={{ justifyContent: isExpanded ? "right" : "center" }} onClick={handleToggleSidebar}>
        {isExpanded ? (
          <Tooltip title="Collapse">
            <ArrowBackIosNewIcon />
          </Tooltip>
        ) : (
          <Tooltip title="Expand">
            <ArrowForwardIosIcon />
          </Tooltip>
        )}
      </div>
      <div className="menu-items">
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            icon={item.icon}
            name={item.name}
            expanded={isExpanded}
            selected={selectedMenu === item.name}
            onClick={() => handleMenuClick(item.name)}
          />
        ))}
      </div>
      <div className="logout" onClick={handleLogout}>
        <Tooltip title="Logout">
          <ExitToAppIcon />
        </Tooltip>
        {isExpanded && <span className="logout-text">Logout</span>}
      </div>
    </div>
  );
};

const MenuItem = ({ icon, name, expanded, selected, onClick }) => {
  return (
    <ListItem
      button
      className={`menu-item ${expanded ? "expanded" : ""} ${
        selected ? "selected" : ""
      }`}
      onClick={onClick}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      {expanded && <ListItemText primary={name} />}
    </ListItem>
  );
};

export default Sidebar;
