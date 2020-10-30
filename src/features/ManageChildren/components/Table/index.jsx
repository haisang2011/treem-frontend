import React from 'react';
import './Table.scss';
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
import { Button, TableHead } from '@material-ui/core';
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

  console.log(count);

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
  "Mã gia đình",
  "Họ và tên",
  "Ngày sinh",
  "Họ tên cha/mẹ hoặc Người nuôi dưỡng",
  "Dân tộc",
  "Giới tính",
  "Địa chỉ"
]


/* sort((a, b) => (a.calories < b.calories ? -1 : 1)); */

const useStyles2 = makeStyles({
  table: {
    minWidth: "120%",
  },

  container: {
    height: 400,

    "& .MuiTableCell-root" : {
      padding : "8px",
    }
  }
});

export default function CustomPaginationActionsTable({ childrenList, totalChildrenList, onHandlePagination }) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, childrenList.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onHandlePagination(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };


  // React.useEffect(() => {
  //   onHandlePagination(page);
  // },[page])

  return (
    <div className="table-quanlytreem">
    <TableContainer component={Paper} className={classes.container}>
      <Table stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {childrenList.length>0 && childrenList.map((row, index) => (
            <TableRow key={row.id_treem} style={(index % 2) ? { backgroundColor: "#e9e9e9" } : { backgroundColor: "white" }}>
              <TableCell style={{ width: 110 }}>
                <AddIcon />
                <EditIcon />
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
          ))}

          {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
        </TableBody>
      </Table>
    </TableContainer>
    <div className="table-quanlytreem__pagination">
      <div className="table-quanlytreem__pagination--button">
        <Button variant="contained" style={{textTransform:"none", marginRight:"4px"}} color="primary">
          <DescriptionIcon />
          Nhập từ Excel
        </Button>
        <Button variant="contained" style={{textTransform:"none"}} color="secondary">
          <RemoveIcon />
          Thùng rác
        </Button>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        colSpan={3}
        count={totalChildrenList}
        rowsPerPage={10}
        page={page}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onChangePage={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </div>
    </div>
  );
}