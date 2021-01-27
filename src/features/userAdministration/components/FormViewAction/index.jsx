import React from 'react'
import PropTypes from 'prop-types'
import { Button, createMuiTheme, DialogActions, Grid, makeStyles, MuiThemeProvider } from '@material-ui/core'
import InputField from '../../../../custom-fields/InputField';
import { Field, Formik, Form } from 'formik'
import CheckBoxField from '../../../../custom-fields/CheckBoxAdminField';
import { lightBlue } from '@material-ui/core/colors';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CloseIcon from '@material-ui/icons/Close';
import DialogChangePassword from '../../../../components/DialogChangePassword';
import { connect } from 'react-redux';
import Snackbars from '../../../../components/Snackbars';
import { clearErrors } from '../../../../actions/errorAction';
import { updatePasswordAccountRequest } from '../../../../actions/manageAccount';

const useStyles = makeStyles(() => ({
    root: {
        "& .MuiGrid-grid-xs-1" : {
            maxWidth: "5.333333%",
        }
    },
    input: {
        "& .MuiInputBase-root-60, & .MuiInputBase-root-109, & .MuiInputBase-root-158": {
            height: "2.2rem",
        },
        "& .MuiFormLabel-root-44, & .MuiFormLabel-root-93, & .MuiFormLabel-root-142": {
            fontSize: "0.87rem",
        }
    }
}))

function FormViewAction({ 
    account, onHandleUpdateAccount, handleOnClose, updatePasswordAccountRequest,
    msg, code, clearErrors,
}) {

    const classes = useStyles();

    const initialValues = {
        id_taikhoan: (account && account.length>0) ? account[0].id_taikhoan : '',
        tentaikhoan: (account && account.length>0) ? account[0].tentaikhoan : '',
        tenhienthi: (account && account.length>0) ? account[0].tenhienthi : '',
        email: (account && account.length>0) ? account[0].email : '',
        dakhoa : (account && account.length>0) ? account[0].dakhoa : '',
    }
    console.log(initialValues)

    const onHandleSubmit = (values, action) => {
        onHandleUpdateAccount(values)
    }

    const [open, setOpen] = React.useState(false);
    const onUpdatePasswordAccount = (values) => {
        values.id_taikhoan = (account && account.length>0) ? account[0].id_taikhoan : '';
        if(values.id_taikhoan){
            updatePasswordAccountRequest(values);
        }
    }

    const [snackbars, setSnackbars] = React.useState(false);
    const onHandleSnackbars = () => {
        clearErrors();
        setSnackbars(false);
    }

    React.useEffect(() => {
        if(msg==="Đổi mật khẩu thành công" && code===200){
            setSnackbars(true);
        }
    }, [msg, code])

    return (
        <div className="FormViewAction">
            <Formik
                initialValues={initialValues}
                onSubmit={onHandleSubmit}
            >
                {formikProps => {

                    return (
                        <Form autoComplete="off" className="FormViewAction__formik" className={classes.input}>
                            <Grid container item xs={12} justify="space-between" alignItems="center" spacing={1}>
                                        <Grid container justify="flex-end" item xs={3}>ID người dùng:</Grid>
                                        <Grid item xs={9}>
                                            <Field 
                                                name="tentaikhoan"
                                                component={InputField}

                                                label="ID người dùng"
                                                type="text"
                                            />
                                        </Grid>
                                </Grid>
                                <Grid container item xs={12} justify="space-between" alignItems="center" spacing={1}>
                                        <Grid container justify="flex-end" item xs={3}>Tên hiển thị:</Grid>
                                        <Grid item xs={9}>
                                            <Field 
                                                name="tenhienthi"
                                                component={InputField}

                                                
                                                label="Tên hiển thị"
                                                type="text"
                                            />
                                        </Grid>
                                </Grid>
                                <Grid container item xs={12} justify="space-between" alignItems="center" spacing={1}>
                                        <Grid container justify="flex-end" item xs={3}>Địa chỉ email:</Grid>
                                        <Grid item xs={9}>
                                            <Field 
                                                name="email"
                                                component={InputField}

                                                
                                                label="Địa chỉ email"
                                                type="email"
                                            />
                                        </Grid>
                                </Grid>
                                <Grid container item xs={12} alignItems="center" spacing={1} className={classes.root}>
                                        <Grid container justify="flex-end" item xs={3}>Khóa người dùng:</Grid>
                                        <Grid item xs={1}>
                                            <Field 
                                                name="dakhoa"
                                                component={CheckBoxField}
                                                
                                                label="Khóa người dùng"
                                            />
                                        </Grid>
                                </Grid>
                                <Grid container item xs={12} justify="space-between" alignItems="center" spacing={1}>
                                        <Grid 
                                            container 
                                            justify="flex-end" 
                                            style={{color: lightBlue.A200, cursor: 'pointer'}} 
                                            onClick={() => setOpen(true)} 
                                            item xs={6}
                                        >
                                            Đổi mật khẩu
                                        </Grid>
                                        <DialogChangePassword
                                            open={open}
                                            handleOnClose={() => setOpen(false)}
                                            onSubmitForm={onUpdatePasswordAccount}
                                        />
                                </Grid>
                                <DialogActions>
                                    <Button type="submit" startIcon={<SaveOutlinedIcon />} variant="contained" color="primary" style={{ textTransform:"none", color: "#FFF"}}>
                                        Lưu
                                    </Button>
                                    <Button startIcon={<CloseIcon />} onClick={handleOnClose} variant="contained" color="primary" style={{ textTransform:"none", color: "#FFF"}}>
                                        Đóng
                                    </Button>
                                </DialogActions>
                                <Snackbars
                                    open={snackbars}
                                    onHandleSnackbars={onHandleSnackbars}
                                    message={msg}
                                />
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

FormViewAction.propTypes = {

}

const mapStateToProps = state => ({
    msg : state.error.msg,
    code : state.error.code,
})

export default connect(mapStateToProps, { updatePasswordAccountRequest, clearErrors })(FormViewAction)

