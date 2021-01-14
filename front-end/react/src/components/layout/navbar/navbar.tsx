import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { Box, Divider } from "@material-ui/core";
import { useAuth } from "../../../hooks/useAuth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    navLink: {
      color: theme.palette.common.white,
      textDecoration: "none",
      fontWeight: 600,
    },
    divider: {
      height: "20px",
      marginLeft: "10px",
      marginRight: "10px",
      background: theme.palette.common.white,
    },
  })
);

export const NavBar = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Link to="/" className={`${classes.title} ${classes.navLink}`}>
          Lunchapp
        </Link>

        {isAuthenticated ? (
          <Link to="/signin" className={classes.navLink}>
            Sign Out
          </Link>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Link to="/signin" className={classes.navLink}>
              Sign In
            </Link>

            <Divider orientation="vertical" className={classes.divider} />

            <Link to="/signup" className={classes.navLink}>
              Sign Up
            </Link>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
