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

function CheckBoxField(props) {

    const { 
        form, field, label, hongheo, hocanngheo, hoancanh, disabled,
    } = props
    const { name } = field

    const classes = useStyles()

    // const [check, setCheck] = React.useState(hoancanh);

    const handleChange = (event) => {
        const checked = event.target.checked;

        props.onHandleCheckBox(hongheo!==undefined ? 1 : (hocanngheo!==undefined ? 2 : 3), checked)

        const changeEvent = {
        target: {
            name: name,
            value: (hongheo!==undefined && checked) ? 1 : ((hocanngheo!==undefined && checked) ? 2 : 3)
        }
        }

        field.onChange(changeEvent)
  };

    return (
        <Checkbox
            className={classes.formControl}
            checked={hoancanh}
            disabled={disabled}
            {...field}
            onChange={handleChange}
        />
    )
}

CheckBoxField.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,

    label: PropTypes.string,
}

CheckBoxField.defaultProps = {
    label: '',
}

export default CheckBoxField

