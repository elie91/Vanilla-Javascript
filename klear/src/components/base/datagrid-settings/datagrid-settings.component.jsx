import React from "react";
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Checkbox} from "@material-ui/core";
import useStyles from "./datagrid-settings.style";
import {useTranslation} from "react-i18next";
import {selectDatagridSettings} from "../../../redux/base/datagrid/datagrid.selectors";
import CustomFormInput from "../custom-form-input/custom-form-input.component";
import {
    setNbRowsPerPage,
    toggleIsFilterable,
    toggleIsDraggable,
    toggleIsExportable,
    toggleIsSelectable,
    showColumnChooser,
    toggleIsSearchable,
    toggleIsGroupable
} from "../../../redux/base/datagrid/datagrid.actions";

const DatagridSettings = ({datagridSettings, setNbRowsPerPage, toggleIsFilterable, toggleIsGroupable, toggleIsSearchable, toggleIsExportable, toggleIsSelectable, toggleIsDraggable, showColumnChooser}) => {


    const {t} = useTranslation();
    const classes = useStyles();

    const createRow = (text1, text2, value, handle, isCheckbox = true) => (
        <TableRow>
            <TableCell className={classes.th} component="th" scope="row">
                {text1}
            </TableCell>
            <TableCell className={classes.th} align="left">
                {text2}
            </TableCell>
            <TableCell className={classes.th} align="left">
                {isCheckbox ?
                    <Checkbox
                        checked={value}
                        onChange={handle}
                        inputProps={{'aria-label': 'Etat'}}
                        className={classes.checkbox}
                    />
                    :
                    <CustomFormInput id='page-size'
                                     type='number'
                                     value={value}
                                     onChange={handle}/>
                }
            </TableCell>
        </TableRow>
    )

    return (
        <Grid container spacing={1}>
            <Typography variant="h5" gutterBottom className={classes.title}>
                {t('settings.datagridManagement')}
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="settings table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.th}>
                                Action
                            </TableCell>
                            <TableCell className={classes.th} align="left">
                                Description
                            </TableCell>
                            <TableCell className={classes.th} align="left">
                                {t('settings.value')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            createRow(
                                t('datagrid.settings.pageSize'),
                                t('datagrid.settings.pageSizeDetail'),
                                datagridSettings.pageSize,
                                e => setNbRowsPerPage(parseInt(e.target.value, 10)),
                                false
                            )
                        }

                        {
                            createRow(
                                t('datagrid.settings.filtering'),
                                t('datagrid.settings.filteringDetail'),
                                datagridSettings.isFilterable,
                                toggleIsFilterable,
                                true
                            )
                        }

                        {
                            createRow(
                                t('datagrid.settings.columnChooser'),
                                t('datagrid.settings.columnChooserDetail'),
                                datagridSettings.showColumnChooser,
                                showColumnChooser,
                                true
                            )
                        }

                        {
                            createRow(
                                t('datagrid.settings.group'),
                                t('datagrid.settings.groupDetail'),
                                datagridSettings.isGroupable,
                                toggleIsGroupable,
                                true
                            )
                        }


                        {
                            createRow(
                                t('datagrid.settings.searchable'),
                                t('datagrid.settings.searchableDetail'),
                                datagridSettings.isSearchable,
                                toggleIsSearchable,
                                true
                            )
                        }

                        {
                            createRow(
                                t('datagrid.settings.draggable'),
                                t('datagrid.settings.draggableDetail'),
                                datagridSettings.isDraggable,
                                toggleIsDraggable,
                                true
                            )
                        }
                        {
                            createRow(
                                t('datagrid.settings.exportable'),
                                t('datagrid.settings.exportableDetail'),
                                datagridSettings.isExportable,
                                toggleIsExportable,
                                true
                            )
                        }

                        {
                            createRow(
                                t('datagrid.settings.selectable'),
                                t('datagrid.settings.seletableDetail'),
                                datagridSettings.isSelectable,
                                toggleIsSelectable,
                                true
                            )
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

const mapStateToProps = createStructuredSelector({
    datagridSettings: selectDatagridSettings
})

const mapDispatchToProps = dispatch => ({
    setNbRowsPerPage: nb => dispatch(setNbRowsPerPage(nb)),
    toggleIsFilterable: () => dispatch(toggleIsFilterable()),
    toggleIsSearchable: () => dispatch(toggleIsSearchable()),
    toggleIsGroupable: () => dispatch(toggleIsGroupable()),
    toggleIsExportable: () => dispatch(toggleIsExportable()),
    toggleIsDraggable: () => dispatch(toggleIsDraggable()),
    toggleIsSelectable: () => dispatch(toggleIsSelectable()),
    showColumnChooser: () => dispatch(showColumnChooser())
});

export default connect(mapStateToProps, mapDispatchToProps)(DatagridSettings)