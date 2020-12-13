import React from 'react'
import PropTypes from 'prop-types'
import './DetailFamilyForm.scss'
import { Button, Grid, makeStyles, useTheme, Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, TableCell, IconButton, createStyles } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddIcon from '@material-ui/icons/Add';
import InputField from '../../../../custom-fields/InputField';
import SelectField from '../../../../custom-fields/SelectField';
import CheckBoxField from '../../../../custom-fields/CheckBoxField';
import HoanCanhDacBietField from '../../../../custom-fields/HoanCanhDacBietField';
import DateField from '../../../../custom-fields/DateField';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector, connect } from 'react-redux'
import { Status } from '../../../../contants/actionType'
import danToc from '../../../../helpers/getNation';
import {Gender} from '../../../../helpers/getGender';
import {TTHT} from '../../../../helpers/getListTinhTrangHocTap';
import {LHCN} from '../../../../helpers/getLopHocCaoNhat';
import * as ActionType from '../../../../contants/actionType';
import moment from 'moment';
import Moment from 'react-moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { lightGreen, lightBlue } from '@material-ui/core/colors';
import { searchFatherRequest, searchMotherRequest, searchNguoiNuoiRequest } from '../../../../actions/manageFamilyAction'
import { amber, cyan } from '@material-ui/core/colors';
import { isEmpty } from 'lodash';
import { updatePersonRequest, addPersonRequest } from '../../../../actions/manageChildrenAction';
import Snackbars from '../../../../components/Snackbars';
import { clearErrors } from '../../../../actions/errorAction';
import CircularProgress from '@material-ui/core/CircularProgress';

/* Search Form Find Person */
function FormViewAction({ handleOnClose, onSubmitForm, thonList }) {

    const classes = useStyles();

    const initialValues = {
        thon: '',
        id_person: '',
        hoten: '' 
    }

    const onHandleSubmit = (values, action) => {
        onSubmitForm(values);
    }

    return (
        <div className="FormViewAction">
            <Formik
                initialValues={initialValues}
                onSubmit={onHandleSubmit}
            >
                {formikProps => {

                    return (
                        <Form autoComplete="off" className="FormViewAction__formik">
                            <Grid container item xs={12} alignItems="center" spacing={1}>
                                    {/* <Grid item xs={3}>
                                        <Field 
                                            name="thon"
                                            component={SelectField}

                                            label="Thôn/Xóm"
                                            thonList={thonList.length > 0 ? thonList : null}
                                            type="text"
                                        />
                                    </Grid> */}

                                    <Grid item xs={5}>
                                        <Field 
                                            name="id_person"
                                            component={InputField}

                                            label="Mã Person"
                                            type="text"
                                        />
                                    </Grid>

                                    <Grid item xs={5}>
                                        <Field 
                                            name="hoten"
                                            component={InputField}

                                            label="Họ tên"
                                            type="text"
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <DialogActions>
                                            <Button type="submit" startIcon={<SaveIcon />} variant="contained" color="primary" style={{ textTransform:"none", color: "#FFF"}}>
                                                Tìm kiếm
                                            </Button>
                                        </DialogActions>
                                    </Grid>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
/* End */

/* Row */
const useStyles4 = makeStyles(() => createStyles({
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

function Row({ row, index, selectedID, onHandleSelectedID, }) {

  const classes = useStyles4();

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
          key={row.id_person}
          hover={!(selectedID === row.id_person)}
          selected={selectedID === row.id_person}
          onClick={() => onHandleSelected(row.id_person)}
          classes={{
            hover: classes.rowHover,
            selected: classes.selected
          }} 
          style={(index % 2) ? { backgroundColor: "#e9e9e9" } : { backgroundColor: "white" }}
        >
              <TableCell style={{ width: 120 }}>
                {index+1}
              </TableCell>
              <TableCell style={{ width: 120 }}>
                {row.id_person}
              </TableCell>
              <TableCell style={{ width: 220 }}>
                {row.hoten}
              </TableCell>
              <TableCell>
                <Moment format="DD/MM/YYYY">
                  {row.ngaysinh}
                </Moment>
              </TableCell>
              <TableCell style={{ width: 180 }}>
                {row.dantoc}
              </TableCell>
              <TableCell style={{ width: 180 }}>
                {row.sodienthoai}
              </TableCell>
            </TableRow>
    )
}

Row.propTypes = {

}

/* End */

/* Table */
const columns = [
    {
      header: "STT",
      style: {
          width: 70,
          borderBottom: '1px solid #d0d0d0'
      }
    },
    {
      header: "Mã Person",
      style: {
          width: 150,
          textAlign: 'center',
          borderBottom: '1px solid #d0d0d0',
          borderLeft: '1px solid #d0d0d0',
      }
    },
    {
      header: "Họ tên",
      style: {
          width: 220,
          borderBottom: '1px solid #d0d0d0',
          borderLeft: '1px solid #d0d0d0',
      }
    },
    {
        header: "Ngày sinh",
        style: {
            width: 130,
            borderBottom: '1px solid #d0d0d0',
            borderLeft: '1px solid #d0d0d0',
        }
      },
    {
        header: "Dân tộc",
        style: {
            width: 130,
            borderBottom: '1px solid #d0d0d0',
            borderLeft: '1px solid #d0d0d0',
        }
      },
    {
        header: "Số điện thoại",
        style: {
            width: 130,
            borderBottom: '1px solid #d0d0d0',
            borderLeft: '1px solid #d0d0d0',
        }
      },
  ]

const useStyles3 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      // marginLeft: theme.spacing(2.5),
    },
  }));
  
function TablePaginationActions(props) {
    const classes = useStyles3();
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
/* ----------------------------------- */
const useStyles5 = makeStyles({
  table: {
    minWidth: "100%",
  },

  container: {
    maxHeight: 388,
    height: 388,

    "& .MuiTableCell-root" : {
      padding : "8px",
    }
  },
        disabledButton : {
          "&:disabled": {
            opacity: 0.6
          }
        },
});

function CustomPaginationActionsTable({ 
    parentList, totalParentList, onHandleButtonPagination, handleOnChoosePerson, handleOnClose,
}) {
  const classes = useStyles5();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, childrenList.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onHandleButtonPagination(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const [selectedID, setSelectedID] = React.useState(null);
  const onHandleSelectedID = (id) => {
    setSelectedID(id);
  }

  const handleOnChooseID = () => {
    const data = parentList.find(({ id_person }) => id_person===selectedID);
    handleOnChoosePerson(data);
    handleOnClose();
  }

  return (
    <div className="table-detailfamily">
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
          {parentList.length>0 && parentList.map((row, index) => (
            <Row
              key={row.id_person}
              index={index}
              row={row}
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
    <div className="table-detailfamily__pagination">
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        colSpan={3}
        count={totalParentList}
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
      <div className="table-detailfamily__pagination--button">
        <Button
          onClick={handleOnChooseID} 
          startIcon={<SaveIcon/>} 
          size="small"
          className={classes.disabledButton}
          disabled={selectedID ? false : true}
          variant="contained"
        >
          Chọn
        </Button>
      </div>
    </div>
    </div>
  );
}
/* End */

const useStyles2 = makeStyles(() => ({
    dialog: {
        "& .MuiDialog-paperWidthSm":{
          width: 920,
          maxWidth: 920,
          height: 600,
          maxHeight: 600
        },
    
        "& .MuiDialogTitle-root": {
          backgroundColor: lightBlue.A200
        },
    
        "& .MuiTypography-h6": {
          color: "#FFF",
        }
      }
}))

/* Dialog */
function AlertDialog({ open, handleOnClose, handleOnChoosePerson, statusFamily,}) {

    const thonList = useSelector(state => state.common.thonList);

    const [values, setValues] = React.useState({
        thon: '',
        id_person: '',
        hoten: '',
        page: null,
    })

    const [listParent, setListParent] = React.useState([]);
    const [total, setTotal] = React.useState(null);

    // React.useEffect(() => {
    //     const fetchDataParent = async () => {
    //         try {
    //             const list = await searchFatherRequest(values);
    //             setListParent(list.result);
    //             setTotal(list.total);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     fetchDataParent();
    // }, [values])

    const classes = useStyles2();

    const handleClose = () => {
      handleOnClose(false);
    };
  
    const onSubmitForm = async (value) => {
      try {
        const dataSubmit = {
          thon : value.thon ? value.thon : '',
          id_person : value.id_person ? value.id_person : '',
          hoten : value.hoten ? value.hoten : '',
          page : null,
        }
        setValues({...dataSubmit});
        if(statusFamily===1){
          const list = await searchFatherRequest(dataSubmit);
          setListParent(list.result);
          setTotal(list.total);
        }else if(statusFamily===2){
          const list = await searchMotherRequest(dataSubmit);
          setListParent(list.result);
          setTotal(list.total);
        }else if(statusFamily===3){
          const list = await searchNguoiNuoiRequest(dataSubmit);
          setListParent(list.result);
          setTotal(list.total);
        }
      }catch(err){
        console.log(err);
      }

    }

    const onHandleButtonPagination = async (pageNumber) => {
        try {
          const dataSubmit = {...values, page: pageNumber+1};
          setValues({...dataSubmit})
          if(statusFamily===1){
            const list = await searchFatherRequest(dataSubmit);
            setListParent(list.result);
            setTotal(list.total);
          }else if(statusFamily===2){
            const list = await searchMotherRequest(dataSubmit);
            setListParent(list.result);
            setTotal(list.total);
          }else if(statusFamily===3){
            const list = await searchNguoiNuoiRequest(dataSubmit);
            setListParent(list.result);
            setTotal(list.total);
          }
        } catch (error) {
          
        }
    }

    return (
      <div>
        <Dialog
          className={classes.dialog}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle id="alert-dialog-title">Thông tin Person</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <FormViewAction
                    handleOnClose={handleOnClose}
                    onSubmitForm={onSubmitForm}
                    thonList={thonList}
                />
                <CustomPaginationActionsTable
                    parentList={listParent}
                    totalParentList={total}
                    handleOnClose={handleOnClose}
                    handleOnChoosePerson={handleOnChoosePerson}
                    onHandleButtonPagination={onHandleButtonPagination}
                />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
/* End Dialog */

const useStyles = makeStyles(() => ({
    root : {
        '& .MuiGrid-grid-xs-2' : {
            flexBasis: "30.333333%",
        }
    }
}))

function DetailFamilyForm({ 
  handleOnChangeParent, handleOnClose, updatePersonRequest,
  msg, code, clearErrors, addPersonRequest, statusFamily,
}) {

    const dispatch = useDispatch();

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleOnClick = () => {
        setOpen(true);
    }

    const [isLoading, setIsLoading] = React.useState(true);

    const [person, setPerson] = React.useState(null);
    const handleOnChoosePerson = (data) => {
      const blockData = {
          dantoc: data.dantoc ? data.dantoc : '',
          diachi: data.diachi ? data.diachi : '',
          gioitinh: data.gioitinh ? data.gioitinh : '',
          hoten: data.hoten ? data.hoten : '',
          id_giadinh: data.id_giadinh ? data.id_giadinh : '',
          id_person: data.id_person ? data.id_person : '',
          id_phuongxa: data.id_phuongxa ? data.id_phuongxa : '',
          id_thon: data.id_thon ? data.id_thon : '',
          ngaysinh: data.ngaysinh ? moment(data.ngaysinh).format('YYYY/MM/DD') : null,
          sodienthoai: data.sodienthoai ? data.sodienthoai : '',
          tenthon: data.tenthon ? data.tenthon : '',
          trinhdohocvan: data.trinhdohocvan ? data.trinhdohocvan : ''
      }
      setPerson({...blockData});
    }

    const initialValues = {
        id_person: (person && !isEmpty(person)) ? person.id_person : '',
        hoten: (person && !isEmpty(person)) ? person.hoten : '',
        ngaysinh: (person && !isEmpty(person)) ? person.ngaysinh : null,
        gioitinh: (person && !isEmpty(person)) ? person.gioitinh : '',
        dantoc: (person && !isEmpty(person)) ? person.dantoc : '',
        sodienthoai: (person && !isEmpty(person)) ? person.sodienthoai : '',
        trinhdohocvan: (person && !isEmpty(person)) ? person.trinhdohocvan : ''
    }

    const [initialValuesPerson, setInitialValuesPerson] = React.useState({
        id_person: (person && !isEmpty(person)) ? person.id_person : '',
        hoten: (person && !isEmpty(person)) ? person.hoten : '',
        ngaysinh: (person && !isEmpty(person)) ? person.ngaysinh : null,
        gioitinh: (person && !isEmpty(person)) ? person.gioitinh : '',
        dantoc: (person && !isEmpty(person)) ? person.dantoc : '',
        sodienthoai: (person && !isEmpty(person)) ? person.sodienthoai : '',
        trinhdohocvan: (person && !isEmpty(person)) ? person.trinhdohocvan : ''
    })

    const onSubmitFormik = (values, action) => {
        // onSubmitForm(values);
        // dispatch({
        //     type: ActionType.ManageChildren.CLEANUP_DATA_DETAIL_CHILDREN,
        // });
        // dispatch({
        //     type: ActionType.Status.CLOSE_DETAIL_CHILDREN,
        //     payload: false,
        // });
        // values.preventDefault();
        setInitialValuesPerson({...values});
        handleOnChangeParent(values);
        handleOnClose();
    }

    const handleOnUpdatePerson = () => {
      updatePersonRequest(initialValuesPerson);
    }

    const handleOnAddPerson = async () => {
      setIsLoading(false);
      try{
        const instance = await addPersonRequest(initialValuesPerson);
        handleOnChangeParent(instance);
        setIsLoading(true);
        handleOnClose();
      }catch(err){
        console.log(err);
      }
    }

    const [snackbars, setSnackbars] = React.useState(false);
    React.useEffect(() => {
        if(msg==="responseMessage" && code===200){
            setSnackbars(true);
        }else if(msg==="Update successful" && code===200){
            setSnackbars(true);
        }else if(msg==="Delete Children Into Trash Success" && code===200){
            setSnackbars(true);
        }
    }, [msg, code])

    const onHandleSnackbars = () => {
        clearErrors();
        setSnackbars(false);
    }

    return (
        <div className="detailFamilyForm">
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={onSubmitFormik}                
            >
            {formikProps => {
                setInitialValuesPerson(formikProps.values);
                return (
                    <Form autoComplete="off" className="detailFamilyForm__formik">
                        <Grid container xs={12} item className={classes.root} style={{marginTop:"10px"}}>
                            <Grid container justify="space-between" alignItems="center" item xs={12}>
                                <Grid item container justify="flex-end" xs={2}>ID</Grid>
                                <Grid item xs={9} container alignItems="center">
                                    <Grid item xs={9}>
                                        <Field 
                                            className="detailFamilyForm__formik--field_father"
                                            name="id_person"
                                            component={InputField}

                                            disabled={true}
                                            label="ID cha"
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                            <Button
                                                className="detailFamilyForm__formik--button_father"
                                                size="small"
                                                onClick={handleOnClick}
                                                variant="contained" 
                                                style={{backgroundColor:"#35baf6",textTransform: "none",fontSize:"13px"}}
                                            >
                                                <MoreHorizIcon />
                                            </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container xs={12} item className={classes.root} style={{marginTop:"10px"}}>
                            <Grid container justify="space-between" alignItems="center" item xs={12}>
                                <Grid item container justify="flex-end" xs={2}>Họ tên</Grid>
                                <Grid item xs={9} container alignItems="center">
                                    <Field 
                                        name="hoten"
                                        component={InputField}

                                        label="Họ tên"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container xs={12} item className={classes.root} style={{marginTop:"10px"}}>
                            <Grid container justify="space-between" alignItems="center" item xs={12}>
                                <Grid item container justify="flex-end" xs={2}>Ngày sinh</Grid>
                                <Grid item xs={9} container alignItems="center">
                                    <Field 
                                        name="ngaysinh"
                                        component={DateField}

                                        // valueDate={(person && !isEmpty(person)) ? person.ngaysinh : null}
                                        label="Ngày sinh"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container xs={12} item className={classes.root} style={{marginTop:"10px"}}>
                            <Grid container justify="space-between" alignItems="center" item xs={12}>
                                <Grid item container justify="flex-end" xs={2}>Giới tính</Grid>
                                <Grid item xs={9} container alignItems="center">
                                    <Field 
                                        name="gioitinh"
                                        component={SelectField}

                                        // valueDetail={(person && !isEmpty(person)) ? person.gioitinh : null}
                                        label="Giới tính"
                                        gioiTinh={Gender}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container xs={12} item className={classes.root} style={{marginTop:"10px"}}>
                            <Grid container justify="space-between" alignItems="center" item xs={12}>
                                <Grid item container justify="flex-end" xs={2}>Dân tộc</Grid>
                                <Grid item xs={9} container alignItems="center">
                                    <Field 
                                        name="dantoc"
                                        component={SelectField}

                                        // valueDetail={(person && !isEmpty(person)) ? person.dantoc : null}
                                        label="Dân tộc"
                                        danToc={danToc}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container xs={12} item className={classes.root} style={{marginTop:"10px"}}>
                            <Grid container justify="space-between" alignItems="center" item xs={12}>
                                <Grid item container justify="flex-end" xs={2}>Số điện thoại</Grid>
                                <Grid item xs={9} container alignItems="center">
                                    <Field 
                                        name="sodienthoai"
                                        component={InputField}

                                        // disabled={isShowDetailChildrenFollowIdFamily ? true : false}
                                        label="Điện thoại"
                                        
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container xs={12} item className={classes.root} style={{marginTop:"10px"}}>
                            <Grid container justify="space-between" alignItems="center" item xs={12}>
                                <Grid item container justify="flex-end" xs={2}>Học vấn</Grid>
                                <Grid item xs={9} container alignItems="center">
                                    <Field 
                                        name="trinhdohocvan"
                                        component={SelectField}

                                        // valueDetail={(person && !isEmpty(person)) ? person.trinhdohocvan : null}
                                        label="Trình độ học vấn"
                                        lopHocCaoNhat={LHCN}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} justify="flex-end" alignItems="center" spacing={1}>
                            <Grid item>
                              <Button
                                  // onMouseOver={() => setStatus(1)}
                                  // onMouseOut={() => setStatus(null)}
                                  onClick={handleOnAddPerson}
                                  disabled={!isEmpty(person)}
                                  startIcon={<SaveIcon />}
                                  size="small"
                                  variant="contained" 
                                  style={{backgroundColor:"#35baf6",textTransform: "none",fontSize:"13px",marginRight:"5px"}}
                              >
                                  Tạo mới
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                  // onMouseOver={() => setStatus(2)}
                                  // onMouseOut={() => setStatus(null)}
                                  onClick={handleOnUpdatePerson}
                                  disabled={isEmpty(person)}
                                  startIcon={<UpdateIcon />}
                                  size="small"
                                  variant="contained" 
                                  style={{backgroundColor:"#35baf6",textTransform: "none",fontSize:"13px",marginRight:"5px"}}
                              >
                                  Cập nhật
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                  // onMouseOver={() => setStatus(3)}
                                  // onMouseOut={() => setStatus(null)}
                                  disabled={isEmpty(person)}
                                  startIcon={<AddIcon />}
                                  size="small"
                                  type="submit"
                                  variant="contained" 
                                  style={{backgroundColor:"#35baf6",textTransform: "none",fontSize:"13px",marginRight:"5px"}}
                              >
                                  Chọn
                              </Button>
                            </Grid>
                        </Grid>
                        <AlertDialog
                            open={open}
                            handleOnClose={() => setOpen(false)}
                            handleOnChoosePerson={handleOnChoosePerson}
                            statusFamily={statusFamily}
                        />
                        <Snackbars
                          open={snackbars}
                          onHandleSnackbars={onHandleSnackbars}
                          message={msg}
                        />
                        {!isLoading ? <div>...............</div> : null}
                    </Form>
                )
            }}
        </Formik>
        </div>
    )
}

DetailFamilyForm.propTypes = {

}

const mapStateToProps = state => ({
  msg: state.error.msg,
  code: state.error.code,
})

export default connect(mapStateToProps, { updatePersonRequest, clearErrors, addPersonRequest })(DetailFamilyForm)

