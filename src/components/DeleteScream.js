import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deleteScream } from "../redux/actions/dataActions";

const styles = {
    palette: {
      primary: {
        light: "#33c9dc",
        main: "#00bcd4",
        dark: "#008394",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff6333",
        main: "#ff3d00",
        dark: "#b22a00",
        contrastText: "#fff",
      },
    },
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto 20px auto",
      minWidth: 200
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    textField: {
      margin: "10px auto 10px auto",
    },
    button: {
      marginTop: 20,
      position: "relative",
      float: "right",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
    },
    card: {
      display: "flex",
      marginBottom: 20
    },
    content: {
      padding: 25,
      objectFit: "cover"
    }
  };

class DeleteScream extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteScream = () => {
    this.props.deleteScream(this.props.screamID);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Delete Post"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete this post ?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteScream} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamID: PropTypes.string.isRequired,
};

export default connect(null, { deleteScream })(
  withStyles(styles)(DeleteScream)
);
