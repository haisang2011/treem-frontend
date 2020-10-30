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
import { Button, Checkbox, TableHead } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import RemoveIcon from '@material-ui/icons/Remove';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SvgIcon from '@material-ui/core/SvgIcon';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

function CustomShareIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M11.7333 8.26667V4L19.2 11.4667L11.7333 18.9333V14.56C6.4 14.56 2.66667 16.2667 0 20C1.06667 14.6667 4.26667 9.33333 11.7333 8.26667Z" class="style-scope yt-icon"></path>
    </SvgIcon>
  );
}

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
    title:"#",
    style:{
        width: 70
    }
  },
  {
    title:"Tên Thôn/Xóm",
    // style:{
    //     width: 200,
    // }
  },
  {
    title:"Thứ Tự",
    style:{
        width:200,
    }
  },
]


const useStyles2 = makeStyles({
  table: {
    minWidth: "100%",
  },

  container: {
    maxHeight: 405,

    "& .MuiTableCell-root" : {
      padding : "8px",
    }
  }
});

export default function CustomPaginationActionsTable({ listLocal }) {

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, listLocal.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="table-quanlydiaphuong">
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map(({title, style}) => (
              <TableCell key={title} style={style ? style : null}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? listLocal.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : listLocal
          ).map((row, index) => (
            <TableRow key={row.tenthon} style={(index % 2) ? { backgroundColor: "#e9e9e9" } : { backgroundColor: "white" }}>
              <TableCell>
                {index+1}
              </TableCell>
              <TableCell>
                {row.tenthon}
              </TableCell>
              <TableCell>
                {0}
              </TableCell>
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
    <div className="table-quanlydiaphuong__pagination">
      <div className="table-quanlydiaphuong__pagination--button">
        <Button startIcon={<AddSharpIcon />} variant="contained" style={{textTransform:"none", backgroundColor:"#35baf6", color:"#FFF", marginRight:"10px"}}>
          Thêm
        </Button>
        <Button startIcon={<EditIcon />} variant="contained" style={{textTransform:"none", backgroundColor:"#8bc34a", color:"#FFF", marginRight:"10px"}}>
          Sửa
        </Button>
        <Button startIcon={<RemoveIcon />} variant="contained" style={{textTransform:"none", backgroundColor:"#f50057", color:"#FFF", marginRight:"10px"}}>
          Xóa
        </Button>
        <Button startIcon={<CustomShareIcon />} variant="contained" style={{textTransform:"none", backgroundColor:"#35baf6", color:"#FFF", marginRight:"10px"}}>
          Gộp thôn
        </Button>
        <Button startIcon={<SwapHorizIcon />} variant="contained" style={{textTransform:"none", backgroundColor:"#35baf6", color:"#FFF"}}>
          Chuyển thôn
        </Button>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        colSpan={3}
        count={listLocal.length}
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