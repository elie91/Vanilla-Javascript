import React from "react";
import {connect} from 'react-redux';
import useStyles from './global-settings.style';
import {createStructuredSelector} from "reselect";
import {selectIsDrawerOpenOnFocus, selectIsItemsOpenOnFocus} from "../../../redux/base/layout/layout.selector";
import {toggleDrawerOnFocus, toggleItemsOnFocus} from "../../../redux/base/layout/layout.actions";
import {useTranslation} from "react-i18next";
import {TableBody, TableCell, TableRow, TableHead, Table, Paper, TableContainer, Checkbox, Grid, Typography} from '@material-ui/core';

const GlobalSettings = ({drawerOnFocus, itemsOnFocus, toggleDrawerOnFocus, toggleItemsOnFocus}) => {

    const classes = useStyles();

    const {t} = useTranslation();

    const handleChange = () => toggleDrawerOnFocus();

    const handleItemsChange = () => toggleItemsOnFocus();

    return (
        <Grid container spacing={1}>
            <Typography variant="h5" gutterBottom className={classes.title}>
                {t('settings.general')}
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="settings table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.th}>Action</TableCell>
                            <TableCell className={classes.th} align="left">Description</TableCell>
                            <TableCell className={classes.th} align="right">
                                {t('settings.value')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow>
                            <TableCell className={classes.th} component="th" scope="row">
                                {t('settings.sidebarFocus')}
                            </TableCell>
                            <TableCell className={classes.th} align="left">
                                {t('settings.sidebarFocusDetail')}
                            </TableCell>
                            <TableCell className={classes.th} align="right">
                                <Checkbox
                                    checked={drawerOnFocus}
                                    onChange={handleChange}
                                    inputProps={{'aria-label': 'Etat'}}
                                    className={classes.checkbox}
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className={classes.th} component="th" scope="row">
                                {t('settings.itemsFocus')}
                            </TableCell>
                            <TableCell className={classes.th} align="left">
                                {t('settings.itemsFocusDetail')}
                            </TableCell>
                            <TableCell className={classes.th} align="right">
                                <Checkbox
                                    checked={itemsOnFocus}
                                    onChange={handleItemsChange}
                                    inputProps={{'aria-label': 'Etat'}}
                                    className={classes.checkbox}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

const mapStateToProps = createStructuredSelector({
    drawerOnFocus: selectIsDrawerOpenOnFocus,
    itemsOnFocus: selectIsItemsOpenOnFocus
});

const mapDispatchToProps = dispatch => ({
    toggleDrawerOnFocus: () => dispatch(toggleDrawerOnFocus()),
    toggleItemsOnFocus: () => dispatch(toggleItemsOnFocus())
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(GlobalSettings));