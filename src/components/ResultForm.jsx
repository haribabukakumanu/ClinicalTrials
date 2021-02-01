import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  IconButton,
  Chip,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { deepOrange, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: 10,
    backgroundColor: "lightgray",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#173f5f",
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    minWidth: 300,
    margin: 10,
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  rounded: {
    color: "#fff",
    backgroundColor: green[500],
  },
}));

const ResultForm = ({ data }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container justify="center">
        {data.map((x) => (
          <Grid item xs={12} sm={6} key={x.Rank}>
            <Card className={classes.card}>
              <CardHeader
                title={
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {x.Study.ProtocolSection.IdentificationModule.BriefTitle}
                  </Typography>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
              ></CardHeader>
              <CardContent>
                <Typography>
                  {x.Study.ProtocolSection.IdentificationModule.OfficialTitle}
                </Typography>
                <Box m={2}>
                  <Chip
                    label={x.Study.ProtocolSection.DesignModule.StudyType}
                    color="primary"
                  />
                  <Chip
                    label={x.Study.ProtocolSection.StatusModule.OverallStatus}
                    color="secondary"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ResultForm;
