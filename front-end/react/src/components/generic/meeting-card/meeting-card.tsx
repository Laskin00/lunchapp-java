import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  createStyles,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { IMeeting } from '../../../api/lunchapp/meetings';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { grey, red } from '@material-ui/core/colors';

interface IMeetingCardProps {
  meeting: IMeeting;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginTop: theme.spacing(6),
      boxShadow: theme.shadows[3],
      maxWidth: theme.breakpoints.width('md'),
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      background: theme.palette.primary.main,
    },
    description: {
      fontSize: '20px',
      color: theme.palette.text.primary,
    },
    dataRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing(1),
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    icon: {
      color: theme.palette.text.primary,
      marginRight: theme.spacing(1),
    },
    deleteIcon: {
      color: theme.palette.error.main,
    },
    information: {
      fontSize: '16px',
      fontWeight: 400,
      color: theme.palette.text.secondary,
    },
    avatar: {
      backgroundColor: red[500],
    },
    title: {
      fontSize: '20px',
      fontWeight: 500,
      color: theme.palette.primary.contrastText,
    },
    subheader: {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    action: {
      marginTop: '0',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    cardActions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    userContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

export const MeetingCard = ({ meeting }: IMeetingCardProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleLeaveMeeting = () => {
    console.log('Open a confirmation modal and leave meeting');
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          // avatar of whoever created the meeting
          <Avatar aria-label='recipe' className={classes.avatar}>
            M
          </Avatar>
        }
        action={
          <IconButton
            aria-label='settings'
            className={classes.deleteIcon}
            onClick={handleLeaveMeeting}
          >
            <DeleteForeverIcon />
          </IconButton>
        }
        title='Martin Todorov'
        subheader='Owner'
        className={classes.header}
        classes={{
          title: classes.title,
          subheader: classes.subheader,
          action: classes.action,
        }}
      />

      <CardContent>
        <Typography
          component='p'
          variant='body1'
          className={classes.description}
        >
          {meeting.description}
        </Typography>

        <Divider className={classes.divider} />

        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.dataRow}>
            <LocationOnIcon className={classes.icon} />
            <Typography variant='body2' className={classes.information}>
              {meeting.location}
            </Typography>
          </Grid>

          <Grid item xs={4} className={classes.dataRow}>
            <EventIcon className={classes.icon} />
            <Typography variant='body2' className={classes.information}>
              {meeting.date}
            </Typography>
          </Grid>

          <Grid item xs={4} className={classes.dataRow}>
            <AccessTimeIcon className={classes.icon} />
            <Typography variant='body2' className={classes.information}>
              {meeting.time}
            </Typography>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />

        <Box display='flex' justifyContent='center' alignItems='center'>
          <Typography className={classes.information} variant='body1'>
            View meeting participants
          </Typography>
          <IconButton
            className={`${classes.expand} ${expanded && classes.expandOpen}`}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </CardContent>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={3} className={classes.userContainer}>
              <Avatar aria-label='recipe' className={classes.avatar}>
                M
              </Avatar>
              <Typography
                style={{ marginTop: '0.5rem' }}
                className={classes.information}
                variant='body1'
              >
                Mile Kitic
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.userContainer}>
              <Avatar aria-label='recipe' className={classes.avatar}>
                I
              </Avatar>
              <Typography
                style={{ marginTop: '0.5rem' }}
                className={classes.information}
                variant='body1'
              >
                Ilian
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.userContainer}>
              <Avatar aria-label='recipe' className={classes.avatar}>
                L
              </Avatar>
              <Typography
                style={{ marginTop: '0.5rem' }}
                className={classes.information}
                variant='body1'
              >
                Lorena
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.userContainer}>
              <Avatar aria-label='recipe' className={classes.avatar}>
                F
              </Avatar>
              <Typography
                style={{ marginTop: '0.5rem' }}
                className={classes.information}
                variant='body1'
              >
                Fiki
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};
