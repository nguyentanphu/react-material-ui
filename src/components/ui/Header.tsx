import {
  AppBar,
  Button,
  ClickAwayListener,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tab,
  Tabs,
  Toolbar,
  useScrollTrigger,
} from '@material-ui/core';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { routes } from '../../routes';

interface Props {
  children?: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children!, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3rem',
  },
  logo: {
    height: '7rem',
  },
  logoButton: {
    padding: 0,
    background: 'transparent',
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    fontSize: '1rem',
    textTransform: 'none',
    minWidth: 10,
    marginLeft: '25px',
  },
  estimateButton: {
    textTransform: 'none',
    borderRadius: '50px',
    color: theme.palette.common.white,
    marginLeft: '25px',
    marginRight: '25px',
  },
  menu: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

export default function Header(props: Props) {
  const [tabValue, setTabValue] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const currentRoute = routes.find((r) => r.path === location.pathname);
    if (currentRoute && currentRoute.tabIndex && currentRoute.tabIndex !== tabValue) {
      setTabValue(currentRoute.tabIndex);
    }
  }, [location.pathname, tabValue]);

  const tabChanged = (event: ChangeEvent<{}>, value: any) => {
    setTabValue(value);
  };

  const logoClicked = () => {
    const homeRoutes = routes.find((r) => r.path === '/')!;
    setTabValue(homeRoutes.tabIndex!);
  };

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<any>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar disableGutters>
            <Button
              onClick={logoClicked}
              disableRipple
              className={classes.logoButton}
              component={Link}
              to='/'
            >
              <img alt='Company logo' src={logo} className={classes.logo} />
            </Button>
            <Tabs
              value={tabValue}
              className={classes.tabContainer}
              onChange={tabChanged}
              indicatorColor='primary'
            >
              <Tab className={classes.tab} component={Link} to='/' label='Home'></Tab>
              <Tab
                ref={anchorRef}
                className={classes.tab}
                component={Link}
                to='/services'
                label='Services'
                onMouseOver={handleOpen}
                onMouseLeave={handleClose}
              ></Tab>
              <Tab
                className={classes.tab}
                component={Link}
                to='/revolution'
                label='The Revolution'
              ></Tab>
              <Tab className={classes.tab} component={Link} to='/about-us' label='About Us'></Tab>
              <Tab
                className={classes.tab}
                component={Link}
                to='/contact-us'
                label='Contact Us'
              ></Tab>
            </Tabs>
            <Button variant='contained' color='secondary' className={classes.estimateButton}>
              Free estimate
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement='bottom-start'
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: 'top left',
                  }}
                >
                  <Paper classes={{ root: classes.menu }} elevation={0}>
                    <MenuList
                      disablePadding
                      id='menu-list-grow'
                      onMouseOver={handleOpen}
                      onMouseLeave={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Custom Software</MenuItem>
                      <MenuItem onClick={handleClose}>Mobile App Development</MenuItem>
                      <MenuItem onClick={handleClose}>Website Development</MenuItem>
                    </MenuList>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </>
  );
}
