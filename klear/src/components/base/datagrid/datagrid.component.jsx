import React, {useState, useRef, useCallback, useEffect} from "react";
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {useTranslation} from "react-i18next";
import {Paper} from '@material-ui/core';
import {
    DataTypeProvider,
    SortingState,
    IntegratedSorting,
    FilteringState,
    IntegratedFiltering,
    SearchState,
    GroupingState,
    IntegratedGrouping,
    EditingState,
    PagingState,
    IntegratedPaging
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableFilterRow,
    GroupingPanel,
    TableColumnVisibility,
    ColumnChooser,
    Toolbar,
    SearchPanel,
    TableGroupRow,
    DragDropProvider,
    TableColumnReordering,
    ExportPanel,
    TableEditRow,
    TableEditColumn,
    PagingPanel
} from '@devexpress/dx-react-grid-material-ui';
import {GridExporter} from '@devexpress/dx-react-grid-export';
import saveAs from 'file-saver';
import useStyles from "./datagrid.style";
import {selectDatagridSettings} from "../../../redux/base/datagrid/datagrid.selectors";
import {deleteRowInStorage, addRowInStorage, editRowInStorage} from "../../../redux/base/datagrid/datagrid.actions";
import {DateTypeProvider, FilterIcon} from "../../../redux/base/datagrid/datagrid.utils";

const Datagrid = ({storageID, datagridData, setDatagridData, dateColumns, currencyColumns, defaultSorting, datagridSettings, addRowInStorage, editRowInStorage, deleteRowInStorage}) => {

    const classes = useStyles();

    const {t} = useTranslation();

    //Columns
    const defaultHiddenColumnNames = [""];
    const dateFilterOperations = ['month', 'contains', 'startsWith', 'endsWith'];
    const currencyFilterOperations = [
        'equal',
        'notEqual',
        'greaterThan',
        'greaterThanOrEqual',
        'lessThan',
        'lessThanOrEqual',
    ];
    const filteringColumnExtensions = [
        {
            columnName: 'date',
            predicate: (value, filter, row) => {
                if (!filter.value.length) return true;
                if (filter && filter.operation === 'month') {
                    const month = parseInt(value.split('-')[1], 10);
                    return month === parseInt(filter.value, 10);
                }
                return IntegratedFiltering.defaultPredicate(value, filter, row);
            },
        },
    ];
    const [grouping, setGrouping] = useState([]);


    //Export
    const exporterRef = useRef(null);
    const startExport = useCallback((options) => {
        exporterRef.current.exportGrid(options);
    }, [exporterRef]);
    const onSave = (workbook) => {
        workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'DataGrid.xlsx');
        });
    };

    //Editing
    const commitChanges = ({added, changed, deleted}) => {
        if (added) {
            addRowInStorage(storageID, added)
            setDatagridData({...datagridData, rows: datagridData.rows})
        }
        if (changed) {
            editRowInStorage(storageID, changed);
            setDatagridData({...datagridData, rows: datagridData.rows.map((row, index) => (changed[index] ? {...row, ...changed[index]} : row))});
        }
        if (deleted) {
            deleteRowInStorage(storageID, deleted)
            console.log(datagridData, deleted[0])
            setDatagridData({...datagridData, rows: datagridData.rows.filter((row, index) => index !== deleted[0])})
        }
    };


    return (
        <div className={classes.root}>
            <Paper>
                <Grid rows={datagridData.rows} columns={datagridData.columns}>
                    <DateTypeProvider
                        for={dateColumns}
                        availableFilterOperations={dateFilterOperations}
                    />

                    <DataTypeProvider
                        for={currencyColumns}
                        availableFilterOperations={currencyFilterOperations}
                    />

                    <SortingState
                        defaultSorting={[{defaultSorting}]}
                    />

                    <DragDropProvider/>

                    <GroupingState
                        grouping={grouping}
                        onGroupingChange={setGrouping}/>

                    {datagridSettings.isGroupable && <IntegratedGrouping/>}

                    <SearchState/>

                    <IntegratedSorting/>

                    <FilteringState
                        defaultFilters={[]}/>

                    <IntegratedFiltering
                        columnExtensions={filteringColumnExtensions}/>

                    <EditingState
                        onCommitChanges={commitChanges}
                    />

                    <PagingState
                        defaultCurrentPage={0}
                        defaultPageSize={datagridSettings.pageSize}
                    />

                    <IntegratedPaging/>

                    <Table
                        messages={{
                            noData: t('datagrid.table.noData')
                        }} />

                    {datagridSettings.isDraggable && <TableColumnReordering
                        defaultOrder={datagridData.columns.map(col => col.name)}
                    />}

                    <TableHeaderRow
                        showSortingControls
                        showGroupingControls/>

                    <PagingPanel
                        messages={{
                            showAll: t('datagrid.paging.showAll'),
                            rowsPerPage: t('datagrid.paging.rowsPerPage'),
                            info: t('datagrid.paging.info')
                        }}
                    />

                    <TableEditRow/>

                    <TableEditColumn
                        showAddCommand
                        showEditCommand
                        showDeleteCommand
                        messages={{
                            addCommand: t('datagrid.edit.addCommand'),
                            editCommand: t('datagrid.edit.editCommand'),
                            deleteCommand: t('datagrid.edit.deleteCommand'),
                            commitCommand: t('datagrid.edit.commitCommand'),
                            cancelCommand: t('datagrid.edit.cancelCommand')
                        }}
                    />

                    {datagridSettings.isFilterable && <TableFilterRow
                        showFilterSelector
                        iconComponent={FilterIcon}
                        messages={{
                            filterPlaceholder: t('datagrid.filter.filterPlaceholder'),
                            contains: t('datagrid.filter.contains'),
                            notContains: t('datagrid.filter.notContains'),
                            startsWith: t('datagrid.filter.startsWith'),
                            endsWith: t('datagrid.filter.endsWith'),
                            equal: t('datagrid.filter.equal'),
                            notEqual: t('datagrid.filter.notEqual'),
                            greaterThan: t('datagrid.filter.greaterThan'),
                            greaterThanOrEqual: t('datagrid.filter.greaterThanOrEqual'),
                            lessThan: t('datagrid.filter.lessThan'),
                            lessThanOrEqual: t('datagrid.filter.lessThanOrEqual'),
                            month: 'Month equals'
                        }}
                    />}

                    {datagridSettings.isGroupable && <TableGroupRow/>}

                    <TableColumnVisibility defaultHiddenColumnNames={defaultHiddenColumnNames}/>

                    <Toolbar/>

                    {datagridSettings.isSearchable && <SearchPanel/>}

                    {datagridSettings.showColumnChooser && <ColumnChooser/>}

                    {datagridSettings.isGroupable && <GroupingPanel showGroupingControls/>}

                    {datagridSettings.isExportable && <ExportPanel startExport={startExport}/>}

                </Grid>

                <GridExporter
                    ref={exporterRef}
                    rows={datagridData.rows}
                    columns={datagridData.columns}
                    grouping={grouping}
                    onSave={onSave}
                />
            </Paper>
        </div>
    )

}

const mapStateToProps = createStructuredSelector({
    datagridSettings: selectDatagridSettings
});

const mapDispatchToProps = dispatch => ({
    deleteRowInStorage: (storageID, row) => new Promise(resolve => resolve(dispatch(deleteRowInStorage(storageID, row)))),
    addRowInStorage: (storageID, row) => new Promise(resolve => resolve(dispatch(addRowInStorage(storageID, row)))),
    editRowInStorage: (storageID, row) => new Promise(resolve => resolve(dispatch(editRowInStorage(storageID, row))))
});

export default connect(mapStateToProps, mapDispatchToProps)(Datagrid);