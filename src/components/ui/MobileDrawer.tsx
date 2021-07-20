import { SwipeableDrawer, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  hamburgerMenu: {
    marginLeft: 'auto',
    color: theme.palette.common.white,
  }
}));

export default function MobileDrawer() {
  const classes = useStyles();

  const iOS = (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <SwipeableDrawer
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        Test drawer
      </SwipeableDrawer>
      <IconButton className={classes.hamburgerMenu} onClick={() => setDrawerOpen((open) => !open)}>
        <MenuIcon fontSize='large' />
      </IconButton>
    </>
  );
}
