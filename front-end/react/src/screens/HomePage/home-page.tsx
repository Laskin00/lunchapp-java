import {
  Box,
  Button,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  TextField,
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
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      outline: 'none',
      width: theme.breakpoints.width('md'),
      borderRadius: '8px',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(6, 8),
      margin: theme.spacing(2),
    },
    paperContainer: {
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      width: '50%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(2, 4, 3),
      border: `1px solid ${theme.palette.text.disabled}`,
      borderRadius: '5px',
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
    title: {
      fontSize: '2rem',
      fontWeight: 900,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      color: theme.palette.primary.main,
      marginBottom: theme.spacing(6),
    },
    gridItem: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
            <Typography variant='h4' className={classes.title}>
              Another meeting?
            </Typography>

            <Box display='flex' width='100%' className={classes.paperContainer}>
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
              <Grid container spacing={2} className={classes.paper}>
                <Grid item xs={12} className={classes.gridItem}>
                  <Typography variant='h5'>JOIN</Typography>
                </Grid>

                <Grid item xs={12} className={classes.gridItem}>
                  <Typography variant='body1' className={classes.content}>
                    Join a meeting using a special invite link.
                  </Typography>
                </Grid>

                <Grid item xs={12} className={classes.gridItem}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                  />
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                  <Button
                    variant='contained'
                    color='primary'
                    disableElevation
                    fullWidth
                    size='large'
                  >
                    Join a meeting
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </div>
        </Fade>
      </Modal>

      <Box>
        {meetings.map((meeting: IMeeting, index) => (
          <MeetingCard meeting={meeting} key={index} />
        ))}
      </Box>
    </Box>
  );
};
