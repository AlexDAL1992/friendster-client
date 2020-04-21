import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

class Notifications extends Component {
  state = {
    anchorElement: null,
  };

  handleOpen = event => {
      this.setState({ anchorElement: event.target });
  }
  handleClose = () => {
      this.setState({ anchorElement: null });
  }
  onMenuOpened = () => {
      let unreadNotificationIDs = this.props.notifications
      .filter(noti => !noti.read)
      .map(noti => noti.notificationID);
      this.props.markNotificationsRead(unreadNotificationIDs);
  }
  render() {
    const notifications = this.props.notifications;
    const anchorElement = this.state.anchorElement;
    dayjs.extend(relativeTime);

    let notificationIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((noti) => noti.read === false).length > 0
        ? (notificationIcon = (
            <Badge
              badgeContent={
                notifications.filter((noti) => noti.read === false).length
              }
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationIcon = <NotificationsIcon />);
    } else {
      notificationIcon = <NotificationsIcon />;
    }

    let notificationsMarkup = 
        notifications && notifications.length > 0 ? (
            notifications.map(noti => {
                const act = noti.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(noti.createdAt).fromNow();
                const iconColor = noti.read ? 'primary' : 'secondary';
                const icon = noti.type === 'like' ? (
                    <FavoriteIcon color={iconColor} style={{ marginRight: 10 }}/>
                )  : (
                    <ChatIcon color={iconColor} style={{ marginRight: 10 }}/>
                )
                
                return (
                    <MenuItem key={noti.createdAt} onClick={this.handleClose}>
                        {icon}
                        <Typography component={Link} color='default' variant='body1' to={`/users/${noti.recipient}/scream/${noti.screamID}`}>
                            {noti.sender} {act} your post {time}.
                        </Typography>
                    </MenuItem>
                );
            })
        ) : (
            <MenuItem onClick={this.handleClose}>
                You have no notification.
            </MenuItem>
        );
    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorElement ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
