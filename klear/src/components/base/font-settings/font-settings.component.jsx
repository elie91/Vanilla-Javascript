import React from "react";
import { createStructuredSelector } from "reselect";
import { selectTheme } from "../../../redux/base/layout/layout.selector";
import { setTheme } from "../../../redux/base/layout/layout.actions";
import { connect } from "react-redux";
import DiscretSlider from "../discrete-slider/discret-slider.component";
import useStyles from "./font-settings.style";
import { useTranslation } from "react-i18next";
import {Grid, Typography} from '@material-ui/core';

const FontSettings = ({ theme, setTheme }) => {

    const classes = useStyles();
    const { t } = useTranslation();

    const handleChange = (event, value, name) => {
        setTheme({
            ...theme,
            typography: {
                ...theme.typography,
                [name]: value
            }
        })
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} className={classes.space}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                    {t('settings.fontSize')}
                </Typography>
                <DiscretSlider
                    value={theme.typography.fontSize}
                    handleChange={(event, value) => handleChange(event, value, 'fontSize')}
                    label={t('settings.fontSizeLabel')}
                    min={6}
                    max={40} />
            </Grid>

            <Grid item xs={12} className={classes.space}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                    {t('settings.iconSize')}
                </Typography>
                <DiscretSlider
                    value={theme.typography.iconSize}
                    handleChange={(event, value) => handleChange(event, value, 'iconSize')}
                    label={t('settings.iconSizeLabel')}
                    min={20}
                    max={50} />
            </Grid>

        </Grid>
    )
};

const mapStateToProps = createStructuredSelector({
    theme: selectTheme
});

const mapDispatchToProps = dispatch => ({
    setTheme: theme => dispatch(setTheme(theme)),
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(FontSettings));