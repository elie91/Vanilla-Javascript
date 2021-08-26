import React, {useEffect} from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectTheme} from "../../../redux/base/layout/layout.selector";
import {setTheme} from "../../../redux/base/layout/layout.actions";
import useStyles from './colors-settings.style';
import '@simonwep/pickr/dist/themes/monolith.min.css';
import Pickr from '@simonwep/pickr';
import {useTranslation} from "react-i18next";
import {Grid, Typography, FormControl, Button} from '@material-ui/core';

const ColorsSettings = ({theme, setTheme}) => {

    const classes = useStyles();

    const {t} = useTranslation();

    useEffect(() => {
        createColorPickerinstance('#primaryMain', 'primary', 'main', theme.palette.primary.main)
        createColorPickerinstance('#primaryLight', 'primary', 'light', theme.palette.primary.light)
        createColorPickerinstance('#textLight', 'text', 'light', theme.palette.text.light)
        createColorPickerinstance('#textDark', 'text', 'dark', theme.palette.text.dark);
    }, []);

    const createColorPickerinstance = (el, parent, name, defaultValue) => {
        const pickr = Pickr.create({
            el,
            theme: 'monolith',
            padding: 8,
            default: defaultValue,
            swatches: [
                '#B8C2CC',
                '#E3342F',
                '#F6993F',
                '#FFED4A',
                '#38C172',
                '#4DC0B5',
                '#3490DC',
                '#6574CD',
                '#9561E2',
                '#212121',
                '#f57c00',
                '#1e88e5',
                '#ffee58',
                '#F66D9B'
            ],
            components: {
                preview: true,
                opacity: true,
                hue: true,
                // Input / output Options
                interaction: {
                    hex: true,
                    rgba: true,
                    input: true,
                    save: true
                }
            }
        });
        pickr.on('save', (color, instance) => {
            return setTheme({
                ...theme,
                palette: {
                    ...theme.palette,
                    [parent]: {
                        ...theme.palette[parent],
                        [name]: color.toRGBA().toString()
                    }
                }
            });
        })
    }

    const reset = event => {
        event.preventDefault();
        setTheme({
            ...theme,
            type: 'light',
            palette: {
                primary: {
                    main: "#757575",
                    light: "#fffcfc"
                },
                text: {
                    main: "#FFF",
                    light: "#fffcfc",
                    dark: "rgba(0, 0, 0, 0.87)"
                },
            }

        });
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} className={classes.grid}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                    {t('settings.mainColors')}
                </Typography>

                <FormControl className={classes.form}>
                    <label className={classes.label}>{t('primary')}</label>
                    <input name='primaryMain' id='primaryMain' defaultValue={theme.palette.primary.main}/>
                </FormControl>

                <FormControl className={classes.form}>
                    <label className={classes.label}>{t('secondary')}</label>
                    <input name='primaryMain' id='primaryLight' defaultValue={theme.palette.primary.light}/>
                </FormControl>
            </Grid>

            <Grid item xs={12} className={classes.grid}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                    {t('settings.textIconColors')}
                </Typography>

                <FormControl className={classes.form}>
                    <label className={classes.label}>Light</label>
                    <input name='textLight' id='textLight' defaultValue={theme.palette.text.light}/>
                </FormControl>

                <FormControl className={classes.form}>
                    <label className={classes.label}>Dark</label>
                    <input name='textDark' id='textDark' defaultValue={theme.palette.text.dark}/>
                </FormControl>

            </Grid>

            <Button className={classes.mt} variant='contained' color='secondary' type='button' onClick={reset}>
                {t('settings.resetTheme')}
            </Button>
        </Grid>

    )
}

const mapStateToProps = createStructuredSelector({
    theme: selectTheme
});

const mapDispatchToProps = dispatch => ({
    setTheme: theme => dispatch(setTheme(theme)),
})


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ColorsSettings));