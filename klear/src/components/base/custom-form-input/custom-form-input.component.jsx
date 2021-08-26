import React from "react";
import useStyles from "./custom-form-input.style";
import {Input, FormControl} from '@material-ui/core';

const CustomFormInput = ({label, id, ...otherProps}) => {

    const classes = useStyles();

    return (
        <FormControl className={classes.form}>
            {label && <label className={classes.label} htmlFor={id}>{label}</label>}
            <Input id={id} className={classes.input} {...otherProps} />
        </FormControl>
    );
}

export default React.memo(CustomFormInput);