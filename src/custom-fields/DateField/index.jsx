import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, TextField } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',

    '& .MuiInputBase-root' : {
      fontSize: "13px",
      height: "33px",
    },

    '& .MuiFormLabel-root' : {
      fontSize: "13px",
      lineHeight: "0.8",
    },

    '& .MuiOutlinedInput-root': {
      borderRadius : '3px',
    }
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function DateField(props) {

    const { 
      form, field, label, placeholder
    } = props

    const { name } = field

    const classes = useStyles()

    const [selectedDate, handleDateChange] = React.useState(new Date());

    const onHandleDateChangeSubmit = (date) => {
      handleDateChange(date)
      
      const changeEvent = {
        target: {
          name: name,
          value: moment(date).format('YYYY/MM/DD')
        }
      }

      field.onChange(changeEvent)
    };

    return (
      <KeyboardDatePicker
        className={classes.formControl}
        margin="dense"
        autoOk
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="dd/MM/yyyy"
        value={selectedDate}
        InputAdornmentProps={{ position: "end" }}
        onChange={date => onHandleDateChangeSubmit(date)}
      />
    )
}

DateField.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
}

DateField.defaultProps = {
    label: '',
    placeholder: '',
}

export default DateField