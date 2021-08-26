import React from "react";
import useStyles from "./discret-slider.style";
import {Slider, Typography} from '@material-ui/core';

const DiscretSlider = ({value, handleChange, label, min, max}) => {

    const classes = useStyles();

    function valuetext(value) {
        return `${value}px`;
    }

    return (
        <div className={classes.root}>
            <Typography id="discrete-slider" className={classes.title} gutterBottom>
                {label}
            </Typography>
            <Slider
                onChange={handleChange}
                defaultValue={value || false}
                value={value || false}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={2}
                className={classes.title}
                marks
                min={min}
                max={max}
            />
        </div>
    );
}

export default React.memo(DiscretSlider);