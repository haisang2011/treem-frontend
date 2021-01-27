import React from 'react'
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { amber, cyan } from '@material-ui/core/colors';
import { createStyles, Fab, makeStyles } from '@material-ui/core';
import { FlashOnRounded } from '@material-ui/icons';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => createStyles({
    rowHover: {
        "&:hover": {
            cursor: "pointer",
            backgroundColor: `${cyan[50]} !important`
         },
    },
    selected: {
        backgroundColor: `${amber[50]} !important`
    }
}))

function RowTable({ row, index, selectedID, onHandleSelectedID }) {

    const classes = useStyles();

    const onHandleSelected = (id) => {
        onHandleSelectedID(id);
    }

    return (
        <TableRow
            key={row.tentaikhoan} 
            hover={!(selectedID === row.tentaikhoan)}
            selected={selectedID === row.tentaikhoan}
            onClick={() => onHandleSelected(row.tentaikhoan)} 
            style={(index % 2) ? { backgroundColor: "#e9e9e9" } : { backgroundColor: "white" }} 
            classes={{
                hover: classes.rowHover,
                selected: classes.selected
            }}
        >
              <TableCell>
                {index+1}
              </TableCell>
              <TableCell>
                {row.tentaikhoan}
              </TableCell>
              <TableCell>
                {row.tenhienthi}
              </TableCell>
              <TableCell>
                {row.email}
              </TableCell>
              <TableCell>
                <Fab 
                  variant="extended" 
                  size="small" 
                  style={{ textTransform: 'none' }} 
                  color={row.dakhoa ? null : 'secondary'}
                >
                  { row.dakhoa ? <LockIcon /> : <LockOpenIcon /> }
                  { row.dakhoa ? 'Đã khóa' : 'Đang sử dụng' }
                </Fab>
              </TableCell>
            </TableRow>
    )
}

RowTable.propTypes = {

}

export default RowTable

