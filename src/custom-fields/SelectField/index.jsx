import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formControl: {
    //   margin: `0 ${theme.spacing(1)}px`, 
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

function SelectField(props) {

    const { 
      form, field, label, disabled, valueLocation, 
      phuongXaList, quanHuyenList, thonList, trangThai,
      gioiTinh, danToc
    } = props
    const { name } = field

    const classes = useStyles()

  const [state, setState] = React.useState({
    age: valueLocation ? valueLocation : "",
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  

    return (
        <FormControl variant="outlined" margin="dense" className={classes.formControl}>
        { label && <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel> }
        <Select
          native
          value={state.age}
          onChange={handleChange}
          label={label}
          disabled={disabled}
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option value=""></option>
          {valueLocation ? (<option value={valueLocation}>{valueLocation}</option>) : null}
          {phuongXaList ? (phuongXaList.map(({id_phuongxa, ten_phuongxa}) => (
            <option value={id_phuongxa}>{ten_phuongxa}</option>
          ))) : null}
          {quanHuyenList ? (quanHuyenList.map(({id_quanhuyen, ten_quanhuyen}) => (
            <option value={id_quanhuyen}>{ten_quanhuyen}</option>
          ))) : null}
          {thonList ? (thonList.map(({id_thon, tenthon}) => (
            <option value={id_thon}>{tenthon}</option>
          ))) : null}
          {trangThai ? (
            <>
              <option value={0}>Sử dụng</option>
              <option value={1}>Thùng rác</option>
            </>
          ) : null}
          {gioiTinh ? (
            <>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Chưa xác định">Chưa xác định</option>
            </>
          ) : null}
          {danToc ? (danToc.map((dantoc) => (
            <option value={dantoc}>{dantoc}</option>
          ))) : null}
        </Select>
      </FormControl>
    )
}

SelectField.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
    trangThai: PropTypes.bool,
    gioiTinh: PropTypes.bool,
    danToc: PropTypes.array,
}

SelectField.defaultProps = {
    label: '',
    disabled: null,
    trangThai: false,
    gioiTinh: false,
    danToc: null,
}

export default SelectField

