import {
  AppBar,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  useScrollTrigger,
} from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
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
}));

export default function Header(props: Props) {
  const [tabValue, setTabValue] = useState(0);
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
            <Tabs value={tabValue} className={classes.tabContainer} onChange={tabChanged}>
              <Tab className={classes.tab} component={Link} to='/' label='Home'></Tab>
              <Tab className={classes.tab} component={Link} to='/services' label='Services' onMouseEnter={handleMenuOpen}></Tab>
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
            <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} MenuListProps={{onMouseLeave: handleMenuClose}}>
              <MenuItem onClick={handleMenuClose}>Custom software</MenuItem>
              <MenuItem onClick={handleMenuClose}>Mobile apps</MenuItem>
              <MenuItem onClick={handleMenuClose}>Website development</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </>
  );
}
