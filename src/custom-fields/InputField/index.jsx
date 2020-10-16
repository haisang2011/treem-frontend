import React from 'react'
import PropTypes from 'prop-types'
import { green, red } from '@material-ui/core/colors'
import { createMuiTheme, MuiThemeProvider, FormControl, FormHelperText, Input, InputLabel, makeStyles, FormLabel, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        // "& .MuiFormLabel-root" : {
        //     fontSize : props => (props.isFieldLogin ? "0.875rem" : "1rem"),
        // },
        margin: props => (props.isFieldLogin ? "0 0 2rem 0" : null),
        width: '100%',
    },
}))

const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[500],
            light: green[200],
            dark: green[900],
            contrastText: green[800]
        },
    },
    overrides: {
        MuiInputLabel: {
            root: {
                "&$focused": {
                    color: green[800],
                }
            }
        },
        MuiInput: {
            input: {
                "&::placeholder": {
                    color: green[800],
                },
            },
            underline: {
                "&&&&::after": {
                    borderBottom: `2px solid ${green[800]}`
                }
            }
        },

        focused: {}
    }
})

function InputField(props) {

    const classes = useStyles();

    const { 
            form, 
            field, 
            type, 
            label, 
            placeholder,
            variant,
            isFieldLogin, 
    } = props
    const { name } = field
    const { touched, errors } = form
    
    return (
        // <MuiThemeProvider theme={theme}>
            <TextField
                className={classes.root}
                margin="dense"
                label={label ? label : null}
                variant="outlined"
                type={type}
                error={errors[name] && touched[name] ? true : false}
                placeholder={placeholder}
                name={name}
                id={name}
                {...field}
            />
            // <FormControl
            //     variant='outlined'
            //     margin="dense" 
            //     error={errors[name] && touched[name] ? true : false}
            //     className={classes.formControl} 
            // >
            //     { label && 
            //         <InputLabel 
            //             htmlFor={name}
            //         >
            //             { label }
            //         </InputLabel>
            //     }

            //     <Input 
                    
            //         id={name}
            //         {...field}
            //         type={type}
            //         placeholder={placeholder}
            //         name={name}
            //     />

            //     { errors[name] && touched[name] ? (
            //         <FormHelperText>{errors[name]}</FormHelperText>
            //     ) : <FormHelperText></FormHelperText>
            //     }

            // </FormControl>
        // </MuiThemeProvider>
    )
}

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,

    type: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    variant: PropTypes.string,
    isFieldLogin: PropTypes.bool,
}

InputField.defaultProps = {
    type: '',
    placeholder: '',
    label: '',
    variant: 'outlined',
    isFieldLogin: false,
}

export default InputField

