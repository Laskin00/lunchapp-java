import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { IMeeting } from '../../api/lunchapp/meetings';
import { MeetingCard } from '../../components/generic/meeting-card/meeting-card';

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
    {
      description: 'First meeting description that we kept short',
      location: 'Sofia',
      date: '12.12.2021',
      time: '12:00:00',
    },
    {
      description:
        'Second meeting description that is longer on purpose to see how the ui handles it',
      location: 'Bansko',
      date: '31.12.2021',
      time: '11:59:59',
    },
  ];

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      <Typography variant='h3' className={classes.heading}>
        Your meetings
      </Typography>
      <Box>
        {meetings.map((meeting: IMeeting) => (
          <MeetingCard meeting={meeting} />
        ))}
      </Box>
    </Box>
  );
};
