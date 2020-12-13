import React from 'react'
import PropTypes from 'prop-types'
import { Button, createMuiTheme, DialogActions, Grid, makeStyles, MuiThemeProvider } from '@material-ui/core'
import SelectField from '../../../../custom-fields/SelectField';
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

function FormViewMergeLocalAction({ handleOnClose, local, onSubmitForm, listChecked}) {

    const classes = useStyles();

    const initialValues = {
        selectLocal: '',
    }

    const onHandleSubmit = (values, action) => {
        onSubmitForm(values, listChecked);
    }

    return (
        <div className="FormViewMergeLocalAction">
            <Formik
                initialValues={initialValues}
                onSubmit={onHandleSubmit}
            >
                {formikProps => {

                    return (
                        <Form autoComplete="off" className="FormViewAction__formik" className={classes.input}>
                            <Grid container item xs={12} justify="space-between" alignItems="center" spacing={1}>
                                        <Grid container justify="flex-end" item xs={3}>Gộp các thôn:</Grid>
                                        <Grid item xs={9}>
                                            {listChecked.map(({tenthon}) => tenthon).join()}
                                        </Grid>
                            </Grid>
                            <Grid container item xs={12} justify="space-between" alignItems="center" spacing={1}>
                                        <Grid container justify="flex-end" item xs={3}>Giữ lại thôn:</Grid>
                                        <Grid item xs={9}>
                                            <Field 
                                                name="selectLocal"
                                                component={SelectField}
                                                listChecked={listChecked}
                                                label="Chọn thôn cần giữ lại"
                                            />
                                        </Grid>
                            </Grid>
                            <DialogActions>
                                <Button type="submit" startIcon={<SaveSharpIcon />} variant="contained" color="primary" style={{ textTransform:"none", color: "#FFF"}}>
                                    Thực hiện
                                </Button>
                            </DialogActions>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

FormViewMergeLocalAction.propTypes = {

}

export default FormViewMergeLocalAction

