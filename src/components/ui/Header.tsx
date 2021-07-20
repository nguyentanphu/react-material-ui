import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from '@material-ui/core';
import React, {  } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import DesktopTabs from './DesktopTabs';
import MobileDrawer from './MobileDrawer';

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
}));

export default function Header(props: Props) {
  const theme = useTheme();
  const mdAndDown = useMediaQuery(theme.breakpoints.down('md'));

  const classes = useStyles();

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar disableGutters>
            <Button
              disableRipple
              className={classes.logoButton}
              component={Link}
              to='/'
            >
              <img alt='Company logo' src={logo} className={classes.logo} />
            </Button>
            {mdAndDown ? <MobileDrawer/> : <DesktopTabs/>}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </>
  );
}
