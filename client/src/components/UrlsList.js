import React, { memo } from "react";
import moment from "moment";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ForwardIcon from "@material-ui/icons/Forward";

export default memo(function UrlsList({ url }) {
  function goToUrl(url) {
    window.location.href = url;
  }

  return (
    <ListItem
      key={url.id}
      role={undefined}
      dense
      button
      onClick={() => goToUrl(url.url)}
    >
      <ListItemText
        id={url.id}
        primary={`https://su.marciocastillo.com/${url.code}`}
        secondary={`${moment(url.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="go" onClick={() => goToUrl(url.url)}>
          <ForwardIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
});
