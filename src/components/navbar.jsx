import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        width:'100%'
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          icon={
            <Link style={{ textDecoration: "none" }} to="/home">
              <HomeIcon
                sx={{
                  color: value === 0 ? "#26262E" : "gray",
                  textDecoration: "none",
                }}
              />
            </Link>
          }
        />
        <BottomNavigationAction
          icon={
            <Link style={{ textDecoration: "none" }} to="/buscar">
              <ManageSearchIcon
                sx={{
                  color: value === 1 ? "#26262E" : "gray",
                  textDecoration: "none",
                }}
              />
            </Link>
          }
        />
        <BottomNavigationAction
          icon={
            <Link style={{ textDecoration: "none" }} to="/perfil">
              <PersonIcon
                sx={{
                  color: value === 2 ? "#26262E" : "gray",
                  textDecoration: "none",
                }}
              />
            </Link>
          }
        />
      </BottomNavigation>
    </Box>
  );
}
