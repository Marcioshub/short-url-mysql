import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 250,
    textAlign: "center",
    display: "block",
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <div className={classes.root}>
        <CircularProgress style={{ height: "200px", width: "200px" }} />
      </div>
    </Container>
  );
}
