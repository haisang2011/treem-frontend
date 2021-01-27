import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormChangePassword from '../../features/userAdministration/components/FormChangePassword';
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

export default function AlertDialog({ open, handleOnClose, onSubmitForm, }) {

  const classes = useStyles();

  const handleClose = () => {
    handleOnClose(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.dialog}
      >
        <DialogTitle id="alert-dialog-title">Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormChangePassword
                handleOnClose={handleOnClose}
                onSubmitForm={onSubmitForm}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}