import { AppBar, Toolbar, Typography, useScrollTrigger } from '@material-ui/core'
import React from 'react'

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

export default function Header(props: Props) {
  return (
    <ElevationScroll {...props}>
    <AppBar>
      <Toolbar>
        <Typography variant={'h3'}>
          Arc development
        </Typography>
      </Toolbar>
    </AppBar>
    </ElevationScroll>
  )
}
