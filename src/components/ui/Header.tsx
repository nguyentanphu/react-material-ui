import {
  AppBar,
  Button,
  Grow,
  IconButton,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  SwipeableDrawer,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Route, routes } from '../../routes';

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
    marginBottom: '3.5rem',
    [theme.breakpoints.down('md')]: {
      marginBottom: '1.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1rem',
    },
  },
  logo: {
    height: '8rem',
    [theme.breakpoints.down('md')]: {
      height: '6rem',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5rem',
    },
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
  menuItem: {
    fontSize: '1rem',
    fontWeight: 500,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  hamburgerMenu: {
    marginLeft: 'auto',
    color: theme.palette.common.white,
  }
}));

export default function Header(props: Props) {
  const theme = useTheme();
  const mdAndDown = useMediaQuery(theme.breakpoints.down('md'));

  const [tabValue, setTabValue] = useState(0);
  const [subMenuValue, setSubMenuValue] = useState<null | number>(null);
  const location = useLocation();

  useEffect(() => {
    const currentRoute = routes.find((r) => r.path === location.pathname);
    if (currentRoute) {
      if (currentRoute.tabIndex && currentRoute.tabIndex !== tabValue) {
        setTabValue(currentRoute.tabIndex);
      }
      if (currentRoute.subTabIndex || currentRoute.subTabIndex === 0) {
        setSubMenuValue(currentRoute.subTabIndex);
      }
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

  const subMenuItemClicked = (subRoute: Route) => {
    handleClose();
    setSubMenuValue(subRoute.subTabIndex!);
    setTabValue(subRoute.tabIndex!);
  };

  const servicesSubmenu = routes.filter((r) => r.tabIndex === 1 && r.subTabIndex != null);

  const classes = useStyles();

  const tabs = (
    <>
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
        <Tab className={classes.tab} component={Link} to='/revolution' label='The Revolution'></Tab>
        <Tab className={classes.tab} component={Link} to='/about-us' label='About Us'></Tab>
        <Tab className={classes.tab} component={Link} to='/contact-us' label='Contact Us'></Tab>
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
            <Paper classes={{ root: classes.menu }} elevation={0} square>
              <MenuList
                disablePadding
                id='menu-list-grow'
                onMouseOver={handleOpen}
                onMouseLeave={handleClose}
              >
                {servicesSubmenu.map((m) => (
                  <MenuItem
                    component={Link}
                    to={m.path}
                    selected={m.subTabIndex === subMenuValue}
                    classes={{ root: classes.menuItem }}
                    onClick={() => subMenuItemClicked(m)}
                  >
                    {m.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
  const iOS = (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawer = (
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
        <MenuIcon fontSize="large"/>
      </IconButton>
    </>
  );
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
            {mdAndDown ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </>
  );
}
