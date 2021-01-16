import {
  Box,
  Button,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { IMeeting } from '../../api/lunchapp/meetings';
import { MeetingCard } from '../../components/generic/meeting-card/meeting-card';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontWeight: 300,
      letterSpacing: '3px',
      color: theme.palette.text.primary,
    },
    iconBtn: {
      marginTop: theme.spacing(2),
      fontSize: '48px',
      color: theme.palette.primary.main,
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      outline: 'none',
      padding: theme.spacing(4),
      width: theme.breakpoints.width('md'),

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(2, 4, 3),
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      borderRadius: '8px',
      '&:last-child': {
        marginLeft: '2rem',
      },

      [theme.breakpoints.down('sm')]: {
        width: '100%',
        '&:last-child': {
          marginLeft: '0',
          marginTop: '2rem',
        },
      },
    },
    content: {
      margin: theme.spacing(2, 0),
      color: theme.palette.text.secondary,
    },
  })
);

export const HomePage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

      <IconButton
        aria-label='settings'
        onClick={handleOpen}
        className={classes.iconBtn}
      >
        <AddCircleIcon fontSize='inherit' />
      </IconButton>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.wrapper}>
            <Box className={classes.paper}>
              <Typography variant='h5'>CREATE</Typography>

              <Typography variant='body1' className={classes.content}>
                Create your own meeting.
              </Typography>

              <Button
                variant='contained'
                color='secondary'
                disableElevation
                fullWidth
                size='large'
              >
                Create a meeting
              </Button>
            </Box>
            <Box className={classes.paper}>
              <Typography variant='h5'>JOIN</Typography>

              <Typography variant='body1' className={classes.content}>
                Join a meeting using a special invite link.
              </Typography>

              <Button
                variant='contained'
                color='primary'
                disableElevation
                fullWidth
                size='large'
              >
                Join a meeting
              </Button>
            </Box>
          </div>
        </Fade>
      </Modal>

      <Box>
        {meetings.map((meeting: IMeeting) => (
          <MeetingCard meeting={meeting} />
        ))}
      </Box>
    </Box>
  );
};
