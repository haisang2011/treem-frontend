import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme, MuiThemeProvider, FormControl, FormHelperText, Input, InputLabel, makeStyles, FormLabel, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        // "& .MuiFormLabel-root" : {
        //     fontSize : props => (props.isFieldLogin ? "0.875rem" : "1rem"),
        // },
        margin: props => (props.isFieldLogin ? "0 0 2rem 0" : null),
        width: '100%',

        '& .MuiInputBase-root' : {
            fontSize: "13px",
            height: "33px",
        },
    
        '& .MuiFormLabel-root' : {
            fontSize: "13px",
            lineHeight: "0.8",
        },
    
        '& .MuiOutlinedInput-root': {
            borderRadius : '3px'
        }
    },
}))

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1890ff',
            // light: '#1890ff',
            // dark: green[900],
            // contrastText: green[800]
        },
    },
    overrides: {
        MuiInputLabel: {
            root: {
                "&$focused": {
                    color: '#1890ff',
                },
            }
        },
        MuiOutlinedInput: {
            root: {
              "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
                border: "1px solid",
                borderColor: "#1890ff"
              },
            }
        },
        MuiInput: {
            input: {
                "&::placeholder": {
                    color: '#1890ff',
                },
            },
            underline: {
                "&&&&::after": {
                    borderBottom: `2px solid #1890ff`
                },
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
            disabled,
    } = props
    const { name, value } = field
    const { touched, errors } = form
    console.log(field)
    return (
        <MuiThemeProvider theme={theme}>
            <TextField
                className={classes.root}
                margin="dense"
                {...field}
                label={label ? label : null}
                variant="outlined"
                type={type}
                error={errors[name] && touched[name] ? true : false}
                placeholder={placeholder}
                name={name}
                id={name}
                disabled={disabled}
                />
        </MuiThemeProvider>
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

