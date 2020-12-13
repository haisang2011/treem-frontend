import React from 'react'
import PropTypes from 'prop-types'
import { createStyles, makeStyles, TableCell, TableRow } from '@material-ui/core'
import Moment from 'react-moment';
import Caregiver from '../../../../helpers/mergeFatherMotherToOne';
import CustomAddress from '../../../../helpers/customLengthAddress';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogComfirm from '../../../../components/DialogComfirmDelete';
import { OpenInNewTwoTone } from '@material-ui/icons';
import { amber, cyan } from '@material-ui/core/colors';

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

function Row({ 
  row, index, onHandleEdit,
  onHandleAdd, onDeleteChildren,
  selectedID, onHandleSelectedID,
}) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOnOpen = () => {
      setOpen(true);
    }

    const handleOnClose = (status) => {
      setOpen(status);
    }

    const onHandleSelected = (id) => {
      onHandleSelectedID(id);
  }

    return (
        <TableRow 
          key={row.id_treem} 
          style={(index % 2) ? { backgroundColor: "#e9e9e9" } : { backgroundColor: "white" }}
          hover={!(selectedID.indexOf(row.id_treem)!==-1) ? true : false}
          selected={selectedID.indexOf(row.id_treem)!==-1 ? true : false}
          onClick={() => onHandleSelected(row.id_treem)}
          classes={{
            hover: classes.rowHover,
            selected: classes.selected
          }}
        >
              <TableCell style={{ width: 110 }}>
                <AddIcon onClick={() => onHandleAdd(row.id_treem)} />
                <EditIcon onClick={() => onHandleEdit(row.id_treem)} />
                <DeleteIcon
                  onClick={handleOnOpen}
                />
                <DialogComfirm
                  open={open}
                  id={row.id_treem}
                  handleOnClose={handleOnClose}
                  onDelete={onDeleteChildren}
                  title="Thông báo"
                  content="Bạn có muốn cho vào thùng rác bản ghi được chọn không?"
                />
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

