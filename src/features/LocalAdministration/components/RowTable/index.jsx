import React from 'react'
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { amber, cyan } from '@material-ui/core/colors';
import { createStyles, makeStyles } from '@material-ui/core';
import { FlashOnRounded } from '@material-ui/icons';

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

function RowTable({ row, index, selectedID, onHandleSelectedID, }) {

    const classes = useStyles();

    // const []

    const onHandleSelected = (id) => {
        onHandleSelectedID(id);
    }

    return (
        <TableRow
            key={row.id_thon} 
            // hover={!(selectedID === row.id_thon)}
            // selected={selectedID === row.id_thon}
            hover={!(selectedID.indexOf(row.id_thon)!==-1) ? true : false}
            selected={selectedID.indexOf(row.id_thon)!==-1 ? true : false}
            onClick={() => onHandleSelected(row.id_thon)}
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
                {row.tenthon}
            </TableCell>
        </TableRow>
    )
}

RowTable.propTypes = {

}

export default RowTable