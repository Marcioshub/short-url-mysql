import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import UrlsList from "./UrlsList";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(25),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Main() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [url, setUrl] = useState();
  const [currentUrls, setCurrentUrls] = useState([]);

  async function createShortUrl() {
    const response = await axios.post("/api/createurl", { url });

    if (response.data.success) {
      setCurrentUrls([response.data.code, ...currentUrls]);
      enqueueSnackbar(response.data.message, {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response.data.message, {
        variant: "error",
      });
    }
  }

  async function getUrls() {
    const response = await axios.get("/api/urls");

    if (response.data.success) {
      setCurrentUrls(response.data.data);
    }
  }

  useEffect(() => {
    getUrls();
    // eslint-disable-next-line
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h2">
          Short URL
        </Typography>
        <form className={classes.form} noValidate>
          <Typography
            component="h1"
            variant="h6"
            style={{ overflowWrap: "break-word" }}
          >
            Enter the url that you would like to shorten
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="url"
            label="Enter url"
            name="url"
            autoComplete="url"
            autoFocus
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={createShortUrl}
          >
            Shorten Url
          </Button>
        </form>
        <br />
        <Typography
          component="h1"
          variant="h6"
          style={{ overflowWrap: "break-word" }}
        >
          Current urls of the day
        </Typography>
        <List>
          {currentUrls.map((url) => (
            <UrlsList key={url.id} url={url} />
          ))}
        </List>
      </div>
    </Container>
  );
}
