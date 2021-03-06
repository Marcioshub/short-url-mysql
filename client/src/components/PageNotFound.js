import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as L } from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(25),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container
        align="center"
        component="main"
        className={classes.main}
        maxWidth="sm"
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {
            "Sorry, the url you are looking is not on the server. It may have already expired."
          }
        </Typography>
        <br />
        <Typography variant="body1" gutterBottom>
          Click the button below to go back to the home page
        </Typography>
        <Button to="/" component={L} variant="contained" color="primary">
          Home
        </Button>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm" align="center">
          <Typography variant="body1">Short URL</Typography>
        </Container>
      </footer>
    </div>
  );
}
