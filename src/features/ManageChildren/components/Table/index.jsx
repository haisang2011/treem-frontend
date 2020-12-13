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
import Row from '../Row';
import { isEmpty } from 'lodash';
import DialogComfirm from '../../../../components/DialogComfirmDelete';
import DialogAddChildrenExcel from '../../../../components/DialogAddChildrenExcel';

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

export default function CustomPaginationActionsTable({ 
  childrenList, totalChildrenList, onHandlePagination, 
  onHandleEdit, onHandleAdd, onDeleteChildren,
}) {
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

  const [open, setOpen] = React.useState(false);

  const [selectedID, setSelectedID] = React.useState([]);
  const onHandleSelectedID = (id) => {
    const length_ = selectedID.length;
    const arrNew = selectedID.filter(e => e!==id);
    if(arrNew.length === length_){
      setSelectedID([...selectedID, id]);
    }else{
      setSelectedID([...arrNew]);
    }

  }

  const [openDialogExcel, setOpenDialogExcel] = React.useState(false);

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
            <Row
              key={row.id_treem}
              index={index}
              row={row}
              onHandleEdit={onHandleEdit}
              onHandleAdd={onHandleAdd}
              onDeleteChildren={onDeleteChildren}
              selectedID={selectedID}
              onHandleSelectedID={onHandleSelectedID}
            />
          ))}

          {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
        </TableBody>
      </Table>
    </TableContainer>
    {/* Dialog Confirm */}
    <DialogComfirm
      open={open}
      listId={!isEmpty(selectedID) ? selectedID : null}
      handleOnClose={() => setOpen(false)}
      onDelete={onDeleteChildren}
      title="Thông báo"
      content="Bạn có muốn cho vào thùng rác bản ghi được chọn không?"
    />

    <DialogAddChildrenExcel
      handleOnClose={() => setOpenDialogExcel(false)}
      open={openDialogExcel}
    />
    <div className="table-quanlytreem__pagination">
      <div className="table-quanlytreem__pagination--button">
        <Button 
          variant="contained"
          onClick={() => setOpenDialogExcel(true)}
          startIcon={<DescriptionIcon />}
          style={{textTransform:"none", marginRight:"4px"}} 
          color="primary"
        >
          Nhập từ Excel
        </Button>
        <Button 
          variant="contained" 
          startIcon={<RemoveIcon />}
          style={{textTransform:"none"}} 
          color="secondary"
          onClick={() => setOpen(true)}
        >
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