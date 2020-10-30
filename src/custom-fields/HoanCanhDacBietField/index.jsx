import React from 'react'
import PropTypes from 'prop-types'
import { Button, Collapse, FormControl, InputLabel, List, ListItem, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem, Select, Typography } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { FolderAddFilled, FolderTwoTone } from '@ant-design/icons'
import { TreeSelect } from 'antd';
import 'antd/dist/antd.css';
import './style.scss';

const useStyles = makeStyles((theme) => ({
    formControl: {
    //   margin: `0 ${theme.spacing(1)}px`, 
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    }
}));

function HoanCanhDacBiet(props) {

    const { 
      form, field, label, listData,
    } = props

    const { name } = field

    const classes = useStyles()

  const [state, setState] = React.useState(null);

  const handleSelect = (value) => {
    setState(value);

    const changeEvent = {
      target: {
        name: name,
        value: value
      }
    }

    field.onChange(changeEvent)
  };

    return (
      <TreeSelect
        treeLine
        showArrow
        treeIcon={true}
        virtual={false}
        showArrow
        style={{ width: '100%' }}
        value={state}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={listData}
        placeholder={label}
        {...field}
        onChange={handleSelect}
      />
    )
}

HoanCanhDacBiet.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,

    label: PropTypes.string,

}

HoanCanhDacBiet.defaultProps = {
    label: '',
}

export default HoanCanhDacBiet

/* 

<FormControl variant="outlined" margin="dense" className={classes.formControl}>
        { label && <InputLabel id={name} htmlFor={name}>{label}</InputLabel> }
        <Select
          labelId={name}
          id={name}
          {...field}
          onChange={handleSelect}
          renderValue={value => primativeListHCDB.find(({id_chitietloaihoancanh}) => id_chitietloaihoancanh===value).ten_hoancanh}
          value={state}
          name={name}
          label={label}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            getContentAnchorEl: null
          }}
        >
          
          { listHCDB.map(({id_chitietloaihoancanh, ten_hoancanh, children}, index) => (
            
                <MenuItem key={id_chitietloaihoancanh} value={id_chitietloaihoancanh}>
                    <AddBoxIcon onClick={() => handleClick(index)} fontSize="small" style={{color:"rgb(53, 186, 246)", marginRight:"5px"}} />
                    <FolderOpenOutlinedIcon fontSize="small" style={{color:"rgb(53, 186, 246)", marginRight:"7px"}} />
                    <Typography style={{fontSize:"0.93rem"}}>
                        {ten_hoancanh}
                    </Typography>
                </MenuItem>
                {children.length > 0 && (
                  <Collapse in={open ? open[index] : null} timeout="auto" unmountOnExit>
                      {children.map(sub => (
                          <MenuItem button key={sub.id_chitietloaihoancanh} className={classes.nested}>
                          <AddBoxIcon fontSize="small" style={{color:"rgb(53, 186, 246)", marginRight:"5px"}} />
                          <FolderOpenOutlinedIcon fontSize="small" style={{color:"rgb(53, 186, 246)", marginRight:"7px"}} />
                          <Typography style={{fontSize:"0.93rem"}}>
                              {sub.ten_hoancanh}
                          </Typography>
                          </MenuItem>
                      ))}
                  </Collapse>
              )}
          )) }

        </Select>
      </FormControl>

*/