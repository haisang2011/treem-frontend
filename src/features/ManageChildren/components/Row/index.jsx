import React from 'react'
import PropTypes from 'prop-types'
import { TableCell, TableRow } from '@material-ui/core'
import Moment from 'react-moment';
import Caregiver from '../../../../helpers/mergeFatherMotherToOne';
import CustomAddress from '../../../../helpers/customLengthAddress';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function Row({ row, index, onHandleEdit }) {

    return (
        <TableRow key={row.id_treem} style={(index % 2) ? { backgroundColor: "#e9e9e9" } : { backgroundColor: "white" }}>
              <TableCell style={{ width: 110 }}>
                <AddIcon />
                <EditIcon onClick={() => onHandleEdit(row.id_treem)} />
                <DeleteIcon />
              </TableCell>
              <TableCell style={{ width: 120 }}>
                {row.id_giadinh}
              </TableCell>
              <TableCell style={{ width: 180 }}>
                {row.hoten}
              </TableCell>
              <TableCell>
                <Moment format="DD/MM/YYYY">
                  {row.ngaysinh}
                </Moment>
              </TableCell>
              <TableCell style={{ width: 320}}>
                {Caregiver(row.hotencha,row.hotenme,row.nguoinuoiduong)}
              </TableCell>
              <TableCell style={{ width: 100 }}>
                {row.dantoc}
              </TableCell>
              <TableCell style={{ width: 100 }}>
                {row.gioitinh}
              </TableCell>
              <TableCell style={{ width: 390 }}>
                {CustomAddress(row.tenthon, row.ten_phuongxa, row.ten_quanhuyen, row.ten_tinhthanhpho,50)}
              </TableCell>
            </TableRow>
    )
}

Row.propTypes = {

}

export default Row

