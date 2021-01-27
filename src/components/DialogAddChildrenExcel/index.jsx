import React from 'react';
import './style.scss';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormViewAction from '../../features/LocalAdministration/components/FormViewAction';
import { makeStyles, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TextField, createStyles, createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core';
import { amber, cyan, lightBlue, lightGreen } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import SaveIcon from '@material-ui/icons/Save';
import FormData from 'form-data';
import { downloadFileExcelDataChildrenSampleRequest, fetchData, fetchDataFormOfHelp, fetchDataOtherCircumstances, fetchDataRiskSpecialCircumstances, fetchDataSpecialCircumstances, uploadFileExcelAddChildren } from '../../actions/manageChildrenAction'
import manageChidlrenApi from '../../api/manageChildrenApi';
import manageChildrenFormOfHelpApi from '../../api/manageChildrenFormOfHelpApi';
import manageChildrenOtherCircumstancesApi from '../../api/manageChildrenOtherCircumstancesApi';
import manageChildrenRiskSpecialApi from '../../api/manageChildrenRiskSpecialApi';
import manageChildrenSpecialCircumstancesApi from '../../api/manageChildrenSpecialCircumstancesApi';
import manageFamilyApi from '../../api/manageFamilyApi';
import { returnErrors } from '../../actions/errorAction';
import { useDispatch } from 'react-redux';
import { fetchDataFamily } from '../../actions/manageFamilyAction';

const useStyles = makeStyles(() => ({
  dialog: {
    "& .MuiDialog-paperWidthSm":{
      width: 600,
      maxWidth: 600,
      height: 485,
      maxHeight: 485
    },

    "& .MuiDialogTitle-root": {
      backgroundColor: lightBlue.A200
    },

    "& .MuiTypography-h6": {
      color: "#FFF",
    },
    "& .MuiDialogContent-root" : {
        padding: 0,
    },
    "& .MuiDialogContentText-root": {
        paddingBottom: 0
    }

  },
  container: {
    height: 367,

    "& .MuiTableCell-root" : {
      padding : "8px",
    },
  },
}))

const useStyles2 = makeStyles((theme) => createStyles({
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

// const theme = createMuiTheme({
//   palette: {
//     primary: { 
//       main : lightBlue[400],
//       dark : lightBlue[500],
//       light : lightBlue[300]
//     },
//     secondary: { 
//       main : lightGreen[400],
//       dark : lightGreen[500],
//       light : lightGreen[300]
//     }
//   }
// });

const columns = [
    {
      title:"#",
      style:{
          width: 70
      }
    },
    {
      title:"Tên file",
      style:{
          width: 200,
      }
    },
    {
      title:"Dung lượng (Kb)",
      style:{
          width:120,
      }
    },
    {
        title:"Xóa",
        style:{
            width:70,
        }
    },
]

const ColorButton = withStyles((theme) => ({
  root: {
    color: ({color}) => color === 'secondary' ? theme.palette.getContrastText(lightBlue[500]) : theme.palette.getContrastText(lightGreen[500]),
    backgroundColor: ({color}) => color === 'primary' ? lightBlue[400] : lightGreen[400],
    '&:hover': {
      backgroundColor: ({color}) => color === 'primary' ? lightBlue[500] : lightGreen[500],
    },
    '&:disabled': {
      backgroundColor: ({color}) => color === 'primary' ? lightBlue[500] : lightGreen[500],
      opacity: 0.6,
      cursor: 'not-allowed',
      pointerEvents: 'auto'
    }
  },
  label: {
    textTransform: 'capitalize'
  }
}))(Button);

const FileUploader = props => {
    const hiddenFileInput = React.useRef(null);
    
    const handleClick = event => {
      hiddenFileInput.current.click();
    };
    const handleChange = event => {
      const fileUploaded = event.target.files[0];
      console.log({fileUploaded})
      props.handleFile(fileUploaded);
    };
    return (
      <>
       <ColorButton 
            onClick={handleClick}
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
        >
        Thêm tài liệu
        </ColorButton>
        <input type="file"
               ref={hiddenFileInput}
               onChange={handleChange}
               style={{display:'none'}} 
        /> 
      </>
    );
  };

export default function AlertDialog({ open, handleOnClose, local, onSubmitForm, }) {

  const classes = useStyles();

  const classes2 = useStyles2();

  const dispatch = useDispatch();

  const handleClose = () => {
    handleOnClose(false);
  };

  const handleOnDownloadFile = () => {
    downloadFileExcelDataChildrenSampleRequest()
  }

  const [selectedID, setSelectedID] = React.useState(null);
  const handleOnSelectedID = (id) => {
    setSelectedID(id);
  }

  const [file, setFile] = React.useState([]);
  const handleFile = (File) => {
    const idx = file.findIndex(({ lastModified }) => lastModified===File.lastModified)

    if(idx===-1){
        setFile([...file, File])
    }

  }

  const handleOnSubmitFileExcel = () => {
    const data = file.find(({ lastModified }) => lastModified===selectedID);
    const form = new FormData();
    form.append('file', data);
    // uploadFileExcelAddChildren(form);
    manageChidlrenApi.uploadFileAddChildren(form)
                           .then(res => {
                                dispatch(returnErrors(res.code, res.message));

                                /* Load Data */
                                manageChidlrenApi.getDataPaginationSearch()
                                        .then(resChild => {
                                            dispatch(fetchData(resChild.result, resChild.total))
                                        })
                                        .catch(errChild => {
                                            dispatch(returnErrors(errChild.code, errChild.message))
                                        })

                        /* Special Circumstances */
                        manageChildrenSpecialCircumstancesApi.getDataSearch()
                        .then(specialCircumstances => {
                            dispatch(fetchDataSpecialCircumstances(specialCircumstances.result, specialCircumstances.total))
                        })
                        .catch(errSpecialCircumstances => {
                            dispatch(returnErrors(errSpecialCircumstances.code,errSpecialCircumstances.message))
                        })


                        /* Risk Special Circumstances */
                        manageChildrenRiskSpecialApi.getDataSearch()
                                                .then(RiskSpecial => {
                                                    dispatch(fetchDataRiskSpecialCircumstances(RiskSpecial.result, RiskSpecial.total))
                                                })
                                                .catch(errRiskSpecial => {
                                                    dispatch(returnErrors(errRiskSpecial.code,errRiskSpecial.message))
                                                })


                        /* Other Circumstances */
                        manageChildrenOtherCircumstancesApi.getDataSearch()
                                        .then(OtherCircumstances => {
                                            dispatch(fetchDataOtherCircumstances(OtherCircumstances.result, OtherCircumstances.total))
                                        })
                                        .catch(errOtherCircumstances => {
                                            dispatch(returnErrors(errOtherCircumstances.code,errOtherCircumstances.message))
                                        })
                                        
                                        
                        /* Form Of Help */
                        manageChildrenFormOfHelpApi.getDataSearch()
                                .then(FormOfHelp => {
                                    dispatch(fetchDataFormOfHelp(FormOfHelp.result, FormOfHelp.total))
                                })
                                .catch(errFormOfHelp => {
                                    dispatch(returnErrors(errFormOfHelp.code,errFormOfHelp.message))
                                })


                        /* Family */
                        manageFamilyApi.getDataSearch()
                                    .then(Family => {
                                        dispatch(fetchDataFamily(Family.result, Family.total))
                                    })
                                    .catch(errFamily => {
                                        dispatch(returnErrors(errFamily.code, errFamily.message));
                                    })
                                /* End Load Data */
                            })
                           .catch(err => {
                             console.log("Fail")
                           })
    handleOnClose(false);
  }

  const handleDeleteFileOutList = (e, selected) => {
    const UpdateFiles = file.filter(({ lastModified }) => lastModified!==selected);
    setFile([...UpdateFiles])
    e.stopPropagation()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.dialog}
      >
        <DialogTitle id="alert-dialog-title">Danh sách file excel</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* Table */}
            <TableContainer component={Paper} className={classes.container}>
                <Table>
                    <TableHead>
                    <TableRow>
                        {columns.map(({title, style}) => (
                        <TableCell key={title} style={style ? style : null}>{title}</TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {file.map((row, index) => (
                        <TableRow 
                            key={index} 
                            style={(index % 2) ? { backgroundColor: "#e9e9e9" } : { backgroundColor: "white" }}
                            hover={!(selectedID===row.lastModified) ? true : false}
                            selected={selectedID===row.lastModified ? true : false}
                            onClick={() => handleOnSelectedID(row.lastModified)}
                            classes={{
                              hover: classes2.rowHover,
                              selected: classes2.selected
                            }}
                        >
                            <TableCell style={{ width: 70 }}>
                                {index + 1}
                            </TableCell>
                            <TableCell style={{ width: 200 }}>
                                {row.name}
                            </TableCell>
                            <TableCell style={{ width: 120 }}>
                                {row.size}
                            </TableCell>
                            <TableCell style={{ width: 70 }} onClick={(e) => handleDeleteFileOutList(e, row.lastModified)}>
                                <DeleteIcon />
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
            {/* <MuiThemeProvider theme={theme}> */}
            <div className="table-dialogexcel__pagination">
                <div className="table-quanlytreem__pagination--button">
                    <FileUploader
                        handleFile={handleFile}
                    />
                    <ColorButton
                    onClick={handleOnDownloadFile}
                    startIcon={<GetAppIcon />} 
                    variant="contained" 
                    color="primary"
                    style={{marginLeft:"5px"}}
                    >
                    Tải tài liệu
                    </ColorButton>
                </div>
                <div>
                    <ColorButton
                    onClick={handleOnSubmitFileExcel} 
                    startIcon={<SaveIcon />}
                    variant="contained" 
                    color="secondary"
                    disabled={!selectedID ? true : false}
                    >
                    Nhập dữ liệu
                    </ColorButton>
                </div>
            </div>
            {/* </MuiThemeProvider> */}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}