import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  dialog: {
    "& .MuiDialog-paperWidthSm":{
      width: 420,
      maxWidth: 420,
    },

    "& .MuiDialogTitle-root": {
      backgroundColor: lightBlue.A200
    },

    "& .MuiTypography-h6": {
      color: "#FFF",
    }
  }
}))

export default function AlertDialog({ open, handleOnClose, onDelete, id, listId, title, content }) {

  const classes = useStyles();

  const handleClose = () => {
    handleOnClose(false);
  };

  const handleOnDelete = () => {
    if(id){
      onDelete(id);
      handleOnClose(false);
    }else if(listId){
      onDelete(listId);
      handleOnClose(false);
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.dialog}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnDelete} color="primary" variant="contained">
            Yes
          </Button>
          <Button onClick={() => handleOnClose(false)} color="secondary" variant="contained">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}