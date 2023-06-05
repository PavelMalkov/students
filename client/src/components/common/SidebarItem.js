import { ListItemButton, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import colorConfigs from "../../configs/colorConfigs";
import './navLink.css'

const SidebarItem = ({ item }) => {


  return (
    item.sidebarProps && item.path ? (
      <div className="nav-items">

        <NavLink
          component={Link}
          to={item.path}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }

        >
          <ListItemIcon sx={{
            color: colorConfigs.sidebar.color,
          }}>
            {item.sidebarProps.icon && item.sidebarProps.icon}
          </ListItemIcon>
          {item.sidebarProps.displayText}
        </NavLink>

      </div>
    ) : null
  );
};

export default SidebarItem;