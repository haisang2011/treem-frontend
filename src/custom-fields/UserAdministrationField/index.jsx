import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'

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

function UserAdministrationField(props) {

    const { 
        form, field, label,
        listRole, onChooseRole, thanhpho,
        valueRole,
    } = props
    const { name } = field

    const classes = useStyles()

  const [state, setState] = React.useState(valueRole ? valueRole : (thanhpho ? thanhpho[0].value : ''));

  const handleSelect = (event) => {
    const value = event.target.value
    setState(value);
    onChooseRole(value);

    const changeEvent = {
      target: {
        name: name,
        value: value
      }
    }

    field.onChange(changeEvent)
  };

    return (
        <FormControl variant="outlined" margin="dense" className={classes.formControl}>
        { label && <InputLabel id={name} htmlFor={name}>{label}</InputLabel> }
        <Select
          labelId={name}
          id={name}
          {...field}
          onChange={handleSelect}
          value={state}
          name={name}
          label={label}
          disabled={false}
          inputProps={{
            readOnly: false,
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            getContentAnchorEl: null
          }}
        >
          {/* <MenuItem value={""}></MenuItem> */}
          {listRole && (listRole.map(({value, title}) => (
            <MenuItem value={value} key={title}>{title}</MenuItem>
          )))}

          {thanhpho && (thanhpho.map(({value, title}) => (
            <MenuItem value={value} key={title}>{title}</MenuItem>
          )))}
          
        </Select>
      </FormControl>
    )
}

UserAdministrationField.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,

    label: PropTypes.string,
}

UserAdministrationField.defaultProps = {
    label: '',
}

export default UserAdministrationField

