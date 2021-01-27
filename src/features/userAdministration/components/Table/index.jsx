import React from 'react';
import './Table.scss';
import Moment from 'react-moment';
import Caregiver from '../../../../helpers/mergeFatherMotherToOne';
import CustomAddress from '../../../../helpers/customLengthAddress';
import PropTypes from 'prop-types';
import { createMuiTheme, makeStyles, useTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
import VisibilityIcon from '@material-ui/icons/Visibility';
import RowTable from '../RowTable';
import { lightGreen, lightBlue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormViewAction from '../FormViewAction';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CloseIcon from '@material-ui/icons/Close';


const ThemeButtonView = createMuiTheme({ palette: { primary: { main: lightGreen[500] } } })
const ThemeViewDialog = createMuiTheme({ palette: { primary: { main: lightBlue.A200 } } })

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
        width: 50
    }
  },
  {
    title:"ID người dùng",
    style:{
        width: 200,
        borderLeft: "1px solid #d0d0d0",
    }
  },
  {
    title:"Tên hiển thị",
    style:{
        width:200,
        borderLeft: "1px solid #d0d0d0",
    }
  },
  {
    title:"Email",
    style:{
        borderLeft: "1px solid #d0d0d0",
    }
  },
  {
    title:"Trạng thái",
    style:{
      width:250,
        borderLeft: "1px solid #d0d0d0",
    }
  },
]


const useStyles2 = makeStyles({
  table: {
    minWidth: "100%",
  },

  container: {
    maxHeight: 300,

    "& .MuiTableCell-root" : {
      padding : "8px",
    }
  },
  disabledButton : {
    "&:disabled": {
      backgroundColor: lightGreen[200],
    }
  },
  dialog: {
    "& .MuiDialog-paperWidthSm":{
      width: 550,
      maxWidth: 550,
    },

    "& .MuiDialogTitle-root": {
      backgroundColor: lightBlue.A200
    },

    "& .MuiTypography-h6": {
      color: "#FFF",
    }
  }
});

export default function CustomPaginationActionsTable({ listAccount, onSubmitFormUpdate }) {

  const classes = useStyles2();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, listAccount.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [selectedID, setSelectedID] = React.useState(null);
  const onHandleSelectedID = (tentaikhoan) => {
    setSelectedID(tentaikhoan);
  }

  const onHandleUpdateAccount = (values) => {
    onSubmitFormUpdate(values)
    setOpen(false);
  }

  return (
    <div className="table-quantringuoidung">
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
            ? listAccount.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : listAccount
          ).map((row, index) => (
            <RowTable
              key={row.tentaikhoan}
              index={index}
              row={row}
              selectedID={selectedID}
              onHandleSelectedID={onHandleSelectedID}
            />
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <div className="table-quantringuoidung__pagination">
      <div className="table-quantringuoidung__pagination--button">
        <MuiThemeProvider theme={ThemeButtonView}>
          <Button 
            className={classes.disabledButton}
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            style={{textTransform:"none", color:"#FFF"}}
            disabled={!selectedID}
          >
            <VisibilityIcon style={{marginRight:"5px"}} />
            Xem
          </Button>
        </MuiThemeProvider>
        <MuiThemeProvider theme={ThemeViewDialog}>
          <Dialog open={open} onClose={() => setOpen(false)} className={classes.dialog}>
            <DialogTitle id="form-dialog-title">Sửa thông tin thành viên</DialogTitle>
            <DialogContent>
              <FormViewAction
                account={selectedID ? (listAccount.filter(({tentaikhoan}) => tentaikhoan===selectedID)) : null}
                onHandleUpdateAccount={onHandleUpdateAccount}
                handleOnClose={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </MuiThemeProvider>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        colSpan={3}
        count={listAccount.length}
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