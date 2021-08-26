import React from "react";
import useStyles from "./simple-select.style";
import {InputLabel, FormControl, Select} from '@material-ui/core';

const SimpleSelect = ({value, label, children, ...props}) => {

    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label" className={classes.label}>{label}</InputLabel>
            <Select
                className={classes.select}
                value={value}
                {...props}
            >
                {children}
            </Select>
        </FormControl>
    )
};

export default React.memo(SimpleSelect);