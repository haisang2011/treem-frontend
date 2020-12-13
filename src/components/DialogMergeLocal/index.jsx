import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormViewMergeLocalAction from '../../features/LocalAdministration/components/FormViewMergeLocalAction';
import { makeStyles } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    dialog: {
        "& .MuiDialog-paperWidthSm":{
          width: 550,
          maxWidth: 550,
        },
    
        "& .MuiDialogTitle-root": {
          backgroundColor: lightBlue.A200
        },
    
        "& .MuiTypography-h6": {
          color: "#FFF",
        }
      }
}))

export default function AlertDialog({ open, handleOnClose, onSubmitForm, listChecked }) {

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
        <DialogTitle id="alert-dialog-title">Thông tin gộp thôn</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormViewMergeLocalAction
                handleOnClose={handleOnClose}
                onSubmitForm={onSubmitForm}
                listChecked={listChecked}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}