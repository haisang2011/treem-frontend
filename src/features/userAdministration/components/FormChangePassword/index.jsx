import React from 'react'
import PropTypes from 'prop-types'
import { Button, createMuiTheme, DialogActions, Grid, makeStyles, MuiThemeProvider } from '@material-ui/core'
import InputField from '../../../../custom-fields/InputField';
import { Field, Formik, Form } from 'formik'
import CheckBoxField from '../../../../custom-fields/CheckBoxField';
import { lightBlue } from '@material-ui/core/colors';
import SaveSharpIcon from '@material-ui/icons/SaveSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

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

function FormChangePassword({ handleOnClose, onSubmitForm, }) {

    const classes = useStyles();

    const initialValues = {
        newPassword: '',
        confirmPassword: '',
    }

    const onHandleSubmit = (values, action) => {
        onSubmitForm(values);
        handleOnClose(false);
    }

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
                                        <Grid container justify="flex-end" item xs={3}>Mật khẩu mới:</Grid>
                                        <Grid item xs={9}>
                                            <Field 
                                                name="newPassword"
                                                component={InputField}

                                                label="Mật khẩu mới"
                                                type="password"
                                            />
                                        </Grid>
                            </Grid>
                            <Grid container item xs={12} justify="space-between" alignItems="center" spacing={1}>
                                        <Grid container justify="flex-end" item xs={3}>Nhập lại mật khẩu:</Grid>
                                        <Grid item xs={9}>
                                            <Field 
                                                name="confirmPassword"
                                                component={InputField}

                                                label="Nhập lại mật khẩu"
                                                type="password"
                                            />
                                        </Grid>
                            </Grid>
                            <DialogActions>
                                <Button type="submit" startIcon={<SaveSharpIcon />} variant="contained" color="primary" style={{ textTransform:"none", color: "#FFF"}}>
                                    Lưu
                                </Button>
                                <Button
                                    onClick={() => handleOnClose(false)}
                                    startIcon={<CloseSharpIcon />} 
                                    variant="contained" 
                                    color="secondary" 
                                    style={{ textTransform:"none", color: "#FFF"}}>
                                    Đóng
                                </Button>
                            </DialogActions>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

FormChangePassword.propTypes = {

}

export default FormChangePassword

