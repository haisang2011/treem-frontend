import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Checkbox } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formControl: {
    //   margin: `0 ${theme.spacing(1)}px`, 
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
        borderRadius : '3px'
      }
    },

    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

function CheckBoxAdminField(props) {

    const { 
        form, field, label, disabled,
    } = props
    const { name } = field

    const classes = useStyles()

    const [check, setCheck] = React.useState(false);

    const handleChange = (event) => {
        const checked = event.target.checked;

        setCheck(checked)

        const changeEvent = {
            target: {
                name: name,
                value: checked
            }
        }

        field.onChange(changeEvent)
  };

    return (
        <Checkbox
            className={classes.formControl}
            disabled={disabled}
            {...field}
            onChange={handleChange}
        />
    )
}

CheckBoxAdminField.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,

    label: PropTypes.string,
}

CheckBoxAdminField.defaultProps = {
    label: '',
}

export default CheckBoxAdminField

