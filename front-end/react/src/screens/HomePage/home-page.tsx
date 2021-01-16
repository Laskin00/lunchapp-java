import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { IMeeting } from '../../api/lunchapp/meetings';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontWeight: 300,
      letterSpacing: '3px',
      color: theme.palette.text.primary,
    },
  })
);
export const HomePage = () => {
  const classes = useStyles();
  const meetings: IMeeting[] = [
    { title: 'First Meeting' },
    { title: 'Second Meeting' },
  ];

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      <Typography variant='h3' className={classes.heading}>
        My mettings
      </Typography>
      <Box padding='2rem'>
        {meetings.map((meeting: IMeeting) => (
          <>{meeting.title}</>
        ))}
      </Box>
    </Box>
  );
};
