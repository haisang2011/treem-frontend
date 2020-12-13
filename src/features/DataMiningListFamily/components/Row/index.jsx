import React from 'react'
import PropTypes from 'prop-types'
import { TableCell, TableRow } from '@material-ui/core'

function Row({ row, index}) {

    return (
        <TableRow key={row.id_giadinh} style={(index % 2) ? { backgroundColor: "#e9e9e9" } : { backgroundColor: "white" }}>
              <TableCell>
                {index+1}
              </TableCell>
              <TableCell style={{textAlign:"center"}}>
                {row.id_giadinh}
              </TableCell>
              <TableCell>
                {row.hotencha}
              </TableCell>
              <TableCell>
                  {row.hotenme}
              </TableCell>
              <TableCell>
                {row.nguoinuoiduong}
              </TableCell>
              <TableCell>
                {row.diachi}
              </TableCell>
            </TableRow>
    )
}

Row.propTypes = {

}

export default Row

