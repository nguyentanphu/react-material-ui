import {
  SwipeableDrawer,
  IconButton,
  makeStyles,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';

const useStyles = makeStyles((theme) => ({
  hamburgerMenu: {
    marginLeft: 'auto',
    color: theme.palette.common.white,
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  drawerItem: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark
    }
  }
}));

export default function MobileDrawer() {
  const classes = useStyles();

  const iOS = (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => {setDrawerOpen(false)};

  const servicesSubmenu = routes.filter((r) => r.tabIndex === 1 && r.subTabIndex != null);
  const subList = (
    <List disablePadding>
      {servicesSubmenu.map((s, i) => (
        <ListItem key={i} onClick={closeDrawer} className={`${classes.drawerItem} ${classes.nested}`} component={Link} to={s.path} button>
          <ListItemText primary={s.name} />
        </ListItem>
      ))}
    </List>
  );
  return (
    <>
      <SwipeableDrawer
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        classes={{paper: classes.drawer}}
      >
        <List>
          <ListItem onClick={closeDrawer} className={classes.drawerItem} button component={Link} to='/'>
            <ListItemText primary='Home' />
          </ListItem>
          <ListItem onClick={closeDrawer} className={classes.drawerItem} button component={Link} to='/services'>
            <ListItemText primary='Services' />
          </ListItem>
          {subList}
          <ListItem onClick={closeDrawer} className={classes.drawerItem} button component={Link} to='/revolution'>
            <ListItemText primary='The Revolution' />
          </ListItem>
          <ListItem onClick={closeDrawer} className={classes.drawerItem} button component={Link} to='/about-us'>
            <ListItemText primary='About Us' />
          </ListItem>
          <ListItem onClick={closeDrawer} className={classes.drawerItem} button component={Link} to='/contact-us'>
            <ListItemText primary='Contact Us' />
          </ListItem>
          <ListItem onClick={closeDrawer} className={`${classes.drawerItem} ${classes.drawerItemEstimate}`} button component={Link} to='/estimate'>
            <ListItemText primary='Free estimate' />
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton className={classes.hamburgerMenu} onClick={() => setDrawerOpen((open) => !open)}>
        <MenuIcon fontSize='large' />
      </IconButton>
    </>
  );
}
