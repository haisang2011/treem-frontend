import React from 'react';
// import './Table.scss';
import Moment from 'react-moment';
import Caregiver from '../../../../helpers/mergeFatherMotherToOne';
import CustomAddress from '../../../../helpers/customLengthAddress';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Button, Checkbox, TableHead } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    // marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const columns = [
  {
    title:"Mã gia đình",
    style:{
        width: 140
    }
  },
  {
    title:"Họ và tên",
    style:{
        width: 200
    }
  },
  {
    title:"Ngày sinh",
    style:{
        width:140
    }
  },
  {
    title:"Dân tộc",
    style:{
        width: 120
    }
  },
  {
    title:"Giới tính",
    style:{
        width: 120
    }
  },
  {
    title:"Họ tên cha",
    style:{
        width: 200
    }
  },
  {
    title:"Họ tên mẹ",
    style:{
        width: 200
    }
  },
  {
    title:"Người nuôi dưỡng",
    style:{
        width: 200
    }
  },
  {
    title:"Địa chỉ",
    style:{
        width: 430
    }
  },
]


const useStyles2 = makeStyles({
  table: {
    minWidth: "270%",
  },

  container: {
    maxHeight: 440,

    "& .MuiTableCell-root" : {
      padding : "8px",
    }
  }
});

export default function CustomPaginationActionsTable({ formOfHelp, listHTTG, totalFormOfHelp, onHandlePagination }) {

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, formOfHelp.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onHandlePagination(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="table-hoancanhdacbiet">
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map(({title, style}) => (
              <TableCell key={title} style={style}>{title}</TableCell>
            ))}
            {listHTTG.map(({title}) => (
                <TableCell key={title} align="center" style={{width:280}}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {formOfHelp.length>0 && formOfHelp.map((row, index) => (
            <TableRow key={row.id_treem} style={(index % 2) ? { backgroundColor: "#e9e9e9" } : { backgroundColor: "white" }}>
              <TableCell style={{ width: 120 }}>
                <AddIcon />
                <EditIcon />
                <DeleteIcon />
              </TableCell>
              <TableCell style={{ width: 140 }}>
                {row.id_giadinh}
              </TableCell>
              <TableCell style={{ width: 200 }}>
                {row.hoten}
              </TableCell>
              <TableCell>
                <Moment format="DD/MM/YYYY">
                  {row.ngaysinh}
                </Moment>
              </TableCell>
              <TableCell style={{ width: 120 }}>
                {row.dantoc}
              </TableCell>
              <TableCell style={{ width: 120 }}>
                {row.gioitinh}
              </TableCell>
              <TableCell style={{ width: 200}}>
                {row.hotencha}
              </TableCell>
              <TableCell style={{ width: 200}}>
                {row.hotenme}
              </TableCell>
              <TableCell style={{ width: 200}}>
                {row.nguoinuoiduong}
              </TableCell>
              <TableCell style={{ width: 430 }}>
                {CustomAddress(row.tenthon, row.ten_phuongxa, row.ten_quanhuyen, row.ten_tinhthanhpho,45)}
              </TableCell>
              {/* Special Circumstances */}
              {row.hinhthuctrogiup.map(({name, value}) => (
                  <TableCell align="center">
                    <Checkbox
                        style={{color:"#1890ff"}}
                        checked={value==="true"}
                    />
                  </TableCell>
              ))}
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <div className="table-hoancanhdacbiet__pagination">
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        colSpan={3}
        count={totalFormOfHelp}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </div>
    </div>
  );
}