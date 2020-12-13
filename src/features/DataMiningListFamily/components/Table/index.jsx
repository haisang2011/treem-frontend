import React from 'react';
import './Table.scss';
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
import DescriptionIcon from '@material-ui/icons/Description';
import RemoveIcon from '@material-ui/icons/Remove';
import Row from '../Row';

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
    header: "STT",
    style: {
        width: 70,
        borderBottom: '1px solid #d0d0d0'
    }
  },
  {
    header: "Mã gia đình",
    style: {
        width: 150,
        textAlign: 'center',
        borderBottom: '1px solid #d0d0d0',
        borderLeft: '1px solid #d0d0d0',
    }
  },
  {
    header: "Họ tên cha",
    style: {
        width: 190,
        borderBottom: '1px solid #d0d0d0',
        borderLeft: '1px solid #d0d0d0',
    }
  },
  {
    header: "Họ tên mẹ",
    style: {
        width: 190,
        borderBottom: '1px solid #d0d0d0',
        borderLeft: '1px solid #d0d0d0',
    }
  },
  {
    header: "Người nuôi dưỡng",
    style: {
        width: 190,
        borderBottom: '1px solid #d0d0d0',
        borderLeft: '1px solid #d0d0d0',
    }
  },
  {
    header: "Địa chỉ",
    style: {
        borderBottom: '1px solid #d0d0d0',
        borderLeft: '1px solid #d0d0d0',
    }
  },
]


/* sort((a, b) => (a.calories < b.calories ? -1 : 1)); */

const useStyles2 = makeStyles({
  table: {
    minWidth: "100%",
  },

  container: {
    height: 400,

    "& .MuiTableCell-root" : {
      padding : "8px",
    }
  }
});

export default function CustomPaginationActionsTable({ 
    familyList, totalFamilyList, onHandlePagination, 
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

  return (
    <div className="table-quanlygiadinh">
    <TableContainer component={Paper} className={classes.container}>
      <Table stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map(({ header, style }) => (
              <TableCell key={header} style={ style ? style : null }>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {familyList.length>0 && familyList.map((row, index) => (
            <Row
              key={row.id_giadinh}
              index={index}
              row={row}
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
    <div className="table-quanlygiadinh__pagination">
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        colSpan={3}
        count={totalFamilyList}
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